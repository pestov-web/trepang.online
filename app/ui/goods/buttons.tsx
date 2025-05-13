import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteProduct } from '@/app/lib/actions';

export function CreateProductButton() {
  return (
    <Link
      href="/dashboard/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Добавить товар</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProductButton({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="flex justify-center gap-5 w-full rounded-md border p-2  bg-yellow-500 hover:bg-yellow-300"
    >
      <span className="text-xl">Изменить</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProductButton({ id }: { id: number }) {
  const deleteInvoiceWithId = deleteProduct.bind(null, id);

  return (
    <form action={deleteInvoiceWithId} className="w-full">
      <button
        type="submit"
        className="flex justify-center items-center w-full gap-5 rounded-md border p-2 bg-red-500 hover:bg-red-300"
      >
        <span className="text-xl">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function orederButton(name: string, formData: FormData) {}
