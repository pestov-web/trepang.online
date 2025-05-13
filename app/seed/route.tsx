// DELETE this file after seeding the database

import prisma from '@/app/lib/prisma';
import { users, goodsList } from '@/app/lib/placeholder-data';
import bcrypt from 'bcrypt';

async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      if (!user.password || !user.email || !user.name) {
        throw new Error(`Data is missing for user: ${user.email}`);
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: hashedPassword,
        },
      });
    })
  );

  return insertedUsers;
}

async function seedGoods() {
  const insertedGoods = await Promise.all(
    goodsList.map((good) =>
      prisma.product.create({
        data: {
          name: good.name,
          description: good.description,
          wbUrl: good.wbUrl,
          ozonUrl: good.ozonUrl,
          price: good.price,
          discount: good.discount,
          images: {
            create: good.images.map((url: string) => ({ url })),
          },
        },
      })
    )
  );

  return insertedGoods;
}

export async function GET() {
  try {
    await seedUsers();
    await seedGoods();

    return new Response(
      JSON.stringify({ message: 'Database seeded successfully' }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
