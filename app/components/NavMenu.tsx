import Link from 'next/link';
import { useNavList } from '../utils/placeholder-data';

function NavMenu() {
  const navList = useNavList();
  return (
    <nav>
      <ul className="flex gap-5 list-none h-7 text-sm lg:text-base">
        {navList.map((item) => (
          <li key={item.name} className="relative flex items-center h-full">
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
