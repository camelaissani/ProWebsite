import { useCallback } from 'react';

export default function Card({ href, className, children }) {
  const onClick = useCallback(() => {
    if (href) {
      window.location.href = href;
    }
  }, [href]);

  return (
    <div
      className={`bg-white rounded-md border-[#ebebeb] border ${
        href
          ? 'cursor-pointer hover:shadow-card transition duration-300 hover:ease-in hover:scale-105'
          : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
