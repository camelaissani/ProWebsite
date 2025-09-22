import Link from 'next/link';
import { cn } from '@/utils';

export default function Card({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return href ? (
    <Link
      href={href}
      className={cn(
        'rounded-md border border-cursor-pointer hover:shadow-card transition duration-300 hover:ease-in hover:scale-105',
        'border-card',
        className,
      )}
    >
      {children}
    </Link>
  ) : (
    <div className={cn('rounded-md border border-card', className)}>
      {children}
    </div>
  );
}
