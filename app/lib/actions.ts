'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export type State = {
  errors?: {
    name?: string[];
    price?: string[];
    wbUrl?: string[];
    ozonUrl?: string[];
    discount?: string[];
    description?: string[];
    images?: string[];
    // можно добавить ошибки для остальных полей
  };
  message: string;
};

// Определяем схему валидации для текстовых полей продукта
const ProductSchema = z.object({
  name: z.string().min(1, { message: 'Название обязательно' }),
  description: z.string().optional(),
  wbUrl: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Некорректный URL',
    }),
  ozonUrl: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Некорректный URL',
    }),
  price: z.coerce.number().gt(0, { message: 'Цена должна быть больше 0' }),
  discount: z.coerce.number().optional(),
  // Поле images теперь не обрабатывается через zod – файлы будут обрабатываться отдельно.
});

// Для создания продукта все поля обязательны (за исключением описания, discount)
const CreateProduct = ProductSchema;

// Для обновления продукта делаем все поля опциональными
const UpdateProduct = ProductSchema.partial();

/**
 * Функция создания продукта.
 * Валидирует текстовые поля, сохраняет загруженные файлы изображений в папку public/uploads,
 * формирует ссылки на файлы и создаёт продукт с вложенными изображениями.
 */
export async function createProduct(prevState: State, formData: FormData) {
  // Валидируем текстовые поля
  const parsed = CreateProduct.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    wbUrl: formData.get('wbUrl'),
    ozonUrl: formData.get('ozonUrl'),
    price: formData.get('price'),
    discount: formData.get('discount'),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Ошибка валидации. Продукт не создан.',
    };
  }

  const { name, description, wbUrl, ozonUrl, price, discount } = parsed.data;

  // Обработка файлов изображений
  let imagesArray: { url: string }[] = [];
  // Получаем все файлы из поля 'images'
  const imageFiles = formData.getAll('images') as File[];

  // Определяем директорию для загрузок (public/uploads)
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error('Ошибка при создании директории для загрузок:', error);
  }

  // Проходим по всем загруженным файлам
  for (const file of imageFiles) {
    // Если файл существует и имеет тип File (при условии, что на клиенте загружены файлы)
    if (file instanceof File) {
      // Определяем расширение файла (например, 'png' или 'jpeg')
      const mimeParts = file.type.split('/');
      const extension = mimeParts[1] || 'png';
      // Генерируем уникальное имя файла
      const fileName = `${uuidv4()}.${extension}`;
      const filePath = path.join(uploadDir, fileName);

      try {
        // Читаем содержимое файла в виде ArrayBuffer и преобразуем его в Buffer
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        // Формируем ссылку для доступа к файлу (например, /uploads/имя_файла)
        imagesArray.push({ url: `/uploads/${fileName}` });
      } catch (error) {
        console.error('Ошибка сохранения файла:', error);
      }
    }
  }

  // Создаём продукт с вложенными изображениями (если они были загружены)
  try {
    await prisma.product.create({
      data: {
        name,
        description,
        wbUrl,
        ozonUrl,
        price,
        discount,
        images: imagesArray.length > 0 ? { create: imagesArray } : undefined,
      },
    });
  } catch (error) {
    console.error('Ошибка создания продукта:', error);
    return {
      message: 'Ошибка БД: не удалось создать продукт.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

/**
 * Функция обновления продукта.
 * Валидирует входные данные и обновляет поля продукта.
 * Если передано поле "images" – старые изображения удаляются и создаются новые (аналогичным образом, как в createProduct).
 */
export async function updateProduct(id: number, formData: FormData) {
  const parsed = UpdateProduct.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    wbUrl: formData.get('wbUrl'),
    ozonUrl: formData.get('ozonUrl'),
    price: formData.get('price'),
    discount: formData.get('discount'),
  });

  if (!parsed.success) {
    console.error(parsed.error);
    return;
  }

  const { name, description, wbUrl, ozonUrl, price, discount } = parsed.data;

  let updateData: Record<string, any> = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (wbUrl !== undefined) updateData.wbUrl = wbUrl;
  if (ozonUrl !== undefined) updateData.ozonUrl = ozonUrl;
  if (price !== undefined) updateData.price = price;
  if (discount !== undefined) updateData.discount = discount;

  // Если переданы новые изображения – обрабатываем их так же, как в createProduct
  if (formData.has('images')) {
    let imagesArray: { url: string }[] = [];
    const imageFiles = formData.getAll('images') as File[];

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Ошибка при создании директории для загрузок:', error);
    }

    for (const file of imageFiles) {
      if (file instanceof File) {
        const mimeParts = file.type.split('/');
        const extension = mimeParts[1] || 'png';
        const fileName = `${uuidv4()}.${extension}`;
        const filePath = path.join(uploadDir, fileName);

        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          await fs.writeFile(filePath, buffer);
          imagesArray.push({ url: `/uploads/${fileName}` });
        } catch (error) {
          console.error('Ошибка сохранения файла:', error);
        }
      }
    }

    try {
      await prisma.$transaction([
        prisma.image.deleteMany({
          where: { productId: id },
        }),
        prisma.product.update({
          where: { id },
          data: {
            ...updateData,
            images:
              imagesArray.length > 0 ? { create: imagesArray } : undefined,
          },
        }),
      ]);
    } catch (error) {
      console.error('Ошибка обновления продукта:', error);
    }
  } else {
    try {
      await prisma.product.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      console.error('Ошибка обновления продукта:', error);
    }
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

/**
 * Функция удаления продукта.
 * При удалении продукта сначала удаляются связанные изображения, затем сам продукт.
 */
export async function deleteProduct(id: number) {
  try {
    await prisma.$transaction([
      prisma.image.deleteMany({
        where: { productId: id },
      }),
      prisma.product.delete({
        where: { id },
      }),
    ]);
  } catch (error) {
    console.error('Ошибка удаления продукта:', error);
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

// Отправка email
export async function sendEmail(id: number, formData: FormData) {
  // ...
}
