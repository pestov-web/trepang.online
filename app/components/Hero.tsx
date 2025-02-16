import Image from 'next/image';
import Link from 'next/link';

import heroPic from '../../public/images/hero/hero1.webp';
import heroPicSm from '../../public/images/hero/hero_sm.webp';

function Hero() {
  return (
    <section className="flex max-w-7xl max-h-80 w-full h-full">
      {' '}
      <div className="relative">
        <Image
          src={heroPic}
          alt="баннер продцкции"
          className="hidden sm:block w-full h-full max-h-80 max-w-7xl"
        />
        <Image
          src={heroPicSm}
          alt="баннер продцкции"
          className="sm:hidden w-full h-full max-w-7xl object-cover"
        />
        <Link
          href="https://www.wildberries.ru/brands/311125909-doktor-pang"
          target="_blank"
          className="absolute text-white text-xs sm:text-base rounded-lg p-2 sm:p-4 bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all hover:scale-105"
        >
          Мы на Wildberries
        </Link>
      </div>
    </section>
  );
}

export default Hero;
