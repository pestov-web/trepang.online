import Link from 'next/link';
import { navMenu } from '@/app/lib/placeholder-data';

function NavMenu() {
  return (
    <nav>
      <ul className="flex gap-5 list-none h-7 text-sm lg:text-base">
        {navMenu.map((item) => (
          <li key={item.id} className="relative flex items-center h-full">
            <Link href={item.link} className="nav__link">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMenu;
