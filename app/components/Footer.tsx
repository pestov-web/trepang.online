import Link from 'next/link';

function Footer() {
  return (
    <footer className="mt-5">
      <div className="h-full p-7 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between border shadow-xl xl:rounded-t-xl bg-white">
        <div className="flex flex-col gap-2">
          <p>
            Биологически активная добавка к пище Ферментативный гидролизат
            трепанга.
          </p>

          <p>ИП Вороной С.В. Все права защищены.</p>
          <p>Номер СГР KZ.16.01.98.003.R.000098.03.23 от 14 марта 2023 года</p>
          <Link
            className="underline"
            href="/policy"
            passHref
            aria-label="Политика обработки персональных данных"
          >
            Политика обработки персональных данных
          </Link>
        </div>
        <div className="flex flex-col justify-around items-end"></div>
      </div>
    </footer>
  );
}

export default Footer;
