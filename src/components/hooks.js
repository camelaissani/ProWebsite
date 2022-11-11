import { useEffect, useRef } from 'react';

export function useComponentMounted() {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  return mountedRef;
}
