import Link from 'next/link';
import type { AriaAttributes, ReactNode } from 'react';

interface MenuItemProps extends AriaAttributes {
  href: string;
  home?: boolean;
  active?: boolean;
  children: ReactNode;
}

export default function MenuItem({
  href,
  home = false,
  active = false,
  children,
  ...ariaProps
}: MenuItemProps) {
  return (
    <Link
      href={href}
      {...ariaProps}
      className={
        home
          ? 'flex rounded-l-md justify-center items-center bg-accent transition ease-in delay-150 hover:bg-accent-light w-16'
          : `px-3 flex justify-center items-center transition ease-in delay-150 hover:text-accent-light ${
              active ? 'text-accent' : ''
            }`
      }
    >
      {children}
    </Link>
  );
}
