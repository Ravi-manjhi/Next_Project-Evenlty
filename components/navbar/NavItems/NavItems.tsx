'use client';

import { headerLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className='md:flex-between flex w-full flex-col item-start gap-5 md:flex-row'>
      {headerLinks.map((el) => (
        <li
          key={el.label}
          className={`${
            pathname === el.path && 'text-primary-500'
          } flex-center p-medium-16 whitespace-nowrap`}
        >
          <Link href={el.path}>{el.label}</Link>
        </li>
      ))}
    </ul>
  );
};
