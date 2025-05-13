'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createProduct, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function ProductForm() {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createProduct, initialState);

  return (
    <form
      action={formAction}
      // encType="multipart/form-data"
      className="space-y-6"
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Название товара */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Название товара
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Введите название товара"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Описание товара */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Описание товара
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Введите описание товара"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="description-error"
          ></textarea>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* WB URL */}
        <div className="mb-4">
          <label
            htmlFor="wbUrl"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            WB URL
          </label>
          <input
            id="wbUrl"
            name="wbUrl"
            type="text"
            placeholder="Введите URL WB"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="wbUrl-error"
          />
          <div id="wbUrl-error" aria-live="polite" aria-atomic="true">
            {state.errors?.wbUrl &&
              state.errors.wbUrl.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Ozon URL */}
        <div className="mb-4">
          <label
            htmlFor="ozonUrl"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Ozon URL
          </label>
          <input
            id="ozonUrl"
            name="ozonUrl"
            type="text"
            placeholder="Введите URL Ozon"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="ozonUrl-error"
          />
          <div id="ozonUrl-error" aria-live="polite" aria-atomic="true">
            {state.errors?.ozonUrl &&
              state.errors.ozonUrl.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Цена */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Цена
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            placeholder="Введите цену"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="price-error"
          />
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Скидка */}
        <div className="mb-4">
          <label
            htmlFor="discount"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Скидка (в %)
          </label>
          <input
            id="discount"
            name="discount"
            type="number"
            placeholder="Введите скидку"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="discount-error"
          />
          <div id="discount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.discount &&
              state.errors.discount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Загрузка изображений */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Загрузить изображения
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
              file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Добавить товар</Button>
      </div>
    </form>
  );
}
