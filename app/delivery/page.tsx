import Image from 'next/image';
import Divider from '@/app/components/Divider';
import shipingPic from '../../public/images/shipping.png';

function DeliveryPage() {
  return (
    <main>
      <section className="px-5 pt-3 pb-5 flex flex-col gap-4">
        <h1 className="text-2xl">
          Мы доставляем по всей территории России и СНГ
        </h1>
        <Divider />
        <h2>НА СЕГОДНЯШНИЙ ДЕНЬ ВЫ МОЖЕТЕ ВЫБРАТЬ ОДИН ИЗ ВИДОВ ДОСТАВКИ:</h2>
        <ul className="flex flex-col pl-4 gap-2 list-disc">
          <li>
            По 100% предоплате отправка по России через Почту России, EMS
            согласно тарифам перевозчика.
          </li>
          <li>
            Отправка за границу осуществляется через курьерскую службу EMS
            согласно тарифам перевозчика. Оплата 100% предоплата.
          </li>
          <li>
            Самовывоз во Владивостоке: предварительно звоните по телефону: +7
            (902) 055-55-52
          </li>
        </ul>
        <span className="font-bold">
          Трепанг в регионы отпускается только после 100% оплаты!
        </span>
        <p>
          При отправке по России и за границу просьба учитывать дополнительный
          сбор — Индивидуальная упаковка — 155 рублей. Продукт упаковывается в
          пищевую пленку, оборачивается пупырчатую пленку и запечатывается в
          картонную коробку.
        </p>
        <span>Оплата: наличным и безналичным путем.</span>

        <Image src={shipingPic} alt="Карта доставки" />
      </section>
    </main>
  );
}

export default DeliveryPage;
