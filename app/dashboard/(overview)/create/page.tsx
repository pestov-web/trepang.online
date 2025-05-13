import Form from '@/app/ui/goods/create-form';
import Breadcrumbs from '@/app/ui/goods/breadcrumbs';
import { fetchGoods } from '@/app/lib/data';

export default async function Page() {
  const goods = await fetchGoods();

  return (
    <section className="col-span-5 flex flex-col mt-5 overflow-hidden p-4   ">
      {' '}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Список товаров', href: '/dashboard' },
          {
            label: 'Добавить товар',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <Form />
    </section>
  );
}
