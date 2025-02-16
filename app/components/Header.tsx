import Link from 'next/link';
import Logo from './Logo';
import NavMenu from './NavMenu';
import { Icon } from '@iconify/react';
import { Button } from '@headlessui/react';

function Header() {
  return (
    <header className="flex items-center justify-center">
      <div className="flex max-w-screen-xl w-full h-14 md:h-20 lg:h-28 items-center justify-between shadow-xl xl:rounded-b-xl bg-white px-5">
        <Logo />
        <NavMenu />
        <div className="flex items-center gap-4">
          <Link
            href="https://api.whatsapp.com/send/?phone=79020555552&text&type=phone_number&app_absent=0"
            className="flex items-center gap-3 justify-center cursor-pointer transition-all hover:scale-105"
            target="_blank"
          >
            <Icon
              icon="logos:whatsapp-icon"
              color="black"
              className="text-3xl"
            />
            <span className="text-xl font-bold hidden lg:block">
              +7 902 055 55 52
            </span>
          </Link>

          <Button className="hidden md:block">Заказать звонок</Button>
          <Button className="md:hidden">
            <Icon
              icon="material-symbols:menu-rounded"
              color="black"
              className="text-3xl"
            />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
