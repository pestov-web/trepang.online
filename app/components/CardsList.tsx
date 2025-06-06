import { Button } from '@/app/ui/button';
import { fetchGoods } from '@/app/lib/data';
import GoodsSlider from './GoodsSlider';
import Divider from './Divider';
import Badge from './Badge';
import Link from 'next/link';

async function CardsList() {
  const goods = await fetchGoods();
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-4">
      {Array.isArray(goods)
        ? goods.map((good) => (
            <li
              key={good.id}
              className="flex flex-col gap-2 rounded-2xl overflow-hidden shadow-xl bg-white transition-all hover:shadow-2xl pb-2"
            >
              <div className="card w-full h-full">
                <GoodsSlider images={good.images} />
                <div className="flex justify-between p-2 flex-col gap-2">
                  <div className="flex justify-between gap-2 items-center w-full">
                    <div className="flex justify-self-start justify-center items-center gap-2 px-2">
                      {' '}
                      <span className="text-2xl">
                        {Math.trunc(
                          good.price - (good.price / 100) * (good.discount ?? 0)
                        ) + ' ₽'}
                      </span>
                      {(good.discount ?? 0) > 0 && (
                        <span className="line-through">
                          {good.price + ' ₽'}
                        </span>
                      )}
                    </div>
                    {good.discount ? <Badge>{good.discount}%</Badge> : null}
                  </div>
                  <h2 className="px-2">{good.name}</h2>
                </div>
                <Divider />
                <div className="flex items-center px-2 mt-1">
                  <Button
                    className="transition-all w-full bg-green-500 hover:bg-green-700 text-white rounded-md h-[36px] px-2  m-[6px]"
                    aria-label="Заказать на сайте"
                  >
                    Заказать на сайте
                  </Button>
                  {good.wbUrl && (
                    <Link
                      href={good.wbUrl}
                      passHref
                      className="flex justify-center items-center min-w-[36px] h-[36px] m-[6px] text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 font-bold "
                      aria-label="Купить на Wildberries"
                      target="_blank"
                    >
                      wb
                    </Link>
                  )}
                  {good.ozonUrl && (
                    <Link
                      href={good.ozonUrl}
                      passHref
                      className="transition-all"
                      aria-label="Купить на ozon"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        className="fill-blue-600 hover:fill-blue-700"
                      >
                        <path d="M13.5,6h21c4.142,0,7.5,3.358,7.5,7.5v21c0,4.142-3.358,7.5-7.5,7.5h-21C9.358,42,6,38.642,6,34.5	v-21C6,9.358,9.358,6,13.5,6z"></path>
                        <path
                          fill="#fff"
                          d="M21.499,26.087h-2.573l3.285-4.346c0.072-0.095,0.052-0.235-0.044-0.306 c-0.036-0.028-0.084-0.044-0.131-0.044h-4.752c-0.418,0-0.759,0.342-0.759,0.759s0.342,0.759,0.759,0.759h2.135l-3.296,4.35 c-0.076,0.095-0.056,0.231,0.04,0.306c0.04,0.032,0.087,0.048,0.135,0.044h5.197c0.418-0.02,0.74-0.378,0.72-0.799 c-0.02-0.39-0.33-0.7-0.72-0.72v-0.004H21.499z M38.104,21.391c-0.418,0-0.759,0.342-0.759,0.759v2.549l-4.104-3.257 c-0.091-0.076-0.231-0.064-0.306,0.032c-0.032,0.04-0.048,0.087-0.048,0.139v5.237c0,0.418,0.342,0.759,0.759,0.759 s0.759-0.338,0.759-0.759v-2.549l4.104,3.261c0.095,0.076,0.235,0.06,0.31-0.036c0.032-0.04,0.048-0.087,0.048-0.135V22.15 C38.864,21.729,38.526,21.391,38.104,21.391 M27.245,26.23c-1.738,0-3.034-0.915-3.034-1.734c0-0.819,1.3-1.734,3.034-1.734 c1.738,0,3.034,0.915,3.034,1.734C30.279,25.315,28.986,26.23,27.245,26.23 M27.245,21.243c-2.513,0-4.553,1.455-4.553,3.253 s2.04,3.253,4.553,3.253s4.553-1.455,4.553-3.253S29.758,21.243,27.245,21.243 M12.297,26.234c-0.958,0-1.738-0.775-1.738-1.734 s0.775-1.738,1.734-1.738s1.738,0.775,1.738,1.734V24.5C14.031,25.455,13.256,26.23,12.297,26.234 M12.297,21.243 c-1.797,0-3.253,1.455-3.257,3.253c0,1.797,1.455,3.253,3.253,3.257c1.797,0,3.253-1.455,3.257-3.253v-0.004 C15.546,22.699,14.091,21.243,12.297,21.243"
                        ></path>
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
}

export default CardsList;
