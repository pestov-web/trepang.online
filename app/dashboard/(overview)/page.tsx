import { lusitana } from '@/app/ui/fonts';
import { fetchGoods } from '@/app/lib/data';
import Divider from '@/app/components/Divider';
import Badge from '@/app/components/Badge';
import Image from 'next/image';
import {
  DeleteProductButton,
  UpdateProductButton,
  CreateProductButton,
} from '@/app/ui/goods/buttons';

async function Dashboard() {
  const goods = await fetchGoods();
  return (
    <section className="col-span-5 flex flex-col mt-5 overflow-hidden p-4   ">
      <div className="flex justify-between items-center h-16">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>Товары</h1>
        <CreateProductButton />
      </div>

      <Divider />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-4">
        {goods.map((good) => (
          <li
            key={good.id}
            className="flex flex-col gap-2 rounded-2xl overflow-hidden shadow-2xl border bg-white transition-all hover:shadow-2xl pb-2"
          >
            <Image
              src={good.images[0].url}
              alt={good.name}
              width={240}
              height={320}
            />
            <div className="card w-full h-full">
              <div className="flex justify-between p-2 flex-col gap-2">
                <div className="flex justify-between gap-2 items-center w-full">
                  <div className="flex flex-col h-12 justify-self-start justify-center items-center gap-2 px-2">
                    {' '}
                    <span className="text-2xl">
                      {Math.trunc(
                        good.price - (good.price / 100) * (good.discount ?? 0)
                      ) + ' ₽'}
                    </span>
                    {(good.discount ?? 0) > 0 && (
                      <span className="line-through">{good.price + ' ₽'}</span>
                    )}
                  </div>
                  {good.discount ? <Badge>{good.discount}%</Badge> : null}
                </div>
                <h2 className="px-2">{good.name}</h2>
              </div>
              <Divider />
              <div className="flex flex-col gap-3 items-center px-2 mt-1">
                <UpdateProductButton id={good.id} />
                <Divider />
                <DeleteProductButton id={good.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Dashboard;
