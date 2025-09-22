import type { AriaAttributes } from 'react';

interface MenuIconItemProps extends AriaAttributes {
  href: string;
  children: React.ReactNode;
}

export default function MenuIconItem({
  href,
  children,
  ...ariaProps
}: MenuIconItemProps) {
  return (
    <a
      href={href}
      {...ariaProps}
      className="transition ease-in delay-150 hover:text-accent"
    >
      {children}
    </a>
  );
}
