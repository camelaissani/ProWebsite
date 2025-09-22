import { cn } from '@/utils';

export default function Pane({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('bg-white rounded-md border-card border', className)}>
      {children}
    </div>
  );
}
