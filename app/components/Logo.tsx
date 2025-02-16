import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../public/images/logo.png';

function Logo() {
  return (
    <Link href={'/'}>
      {' '}
      <Image
        src={logoImg}
        alt="Логотип Доктор Панг"
        width={320}
        height={320}
        sizes="150px sm:150px md:250px lg:320px"
      />
    </Link>
  );
}

export default Logo;
