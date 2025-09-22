import type { ReactNode } from 'react';

export default function Title({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}
