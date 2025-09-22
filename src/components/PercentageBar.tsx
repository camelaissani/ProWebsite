'use client';

import { useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

export default function PercentageBar({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  const isMounted = useIsMounted();

  // create a small delay to play the animation
  const [width, setWidth] = useState('w-0');
  useEffect(() => {
    const handle = setTimeout(() => {
      isMounted() && setWidth(className);
    }, 250);

    return () => clearTimeout(handle);
  }, [className, isMounted]);

  return (
    <>
      <h4 className="font-medium text-xs">{title}</h4>
      <div className="mt-3 mb-5 h-1.5 w-full rounded bg-gray-200">
        <div
          className={`rounded bg-accent h-full transition-[width] ease-out duration-500 ${width}`}
        ></div>
      </div>
    </>
  );
}
