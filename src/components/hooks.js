import { useEffect, useRef } from 'react';

import axios from 'axios';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { VISIT_TRACKER_ENDPOINT },
} = getConfig();

export function useVisitTracker() {
  useEffect(() => {
    const tracking = async () => {
      try {
        await axios.put(VISIT_TRACKER_ENDPOINT);
      } catch (error) {
        console.error(error);
      }
    };

    if (VISIT_TRACKER_ENDPOINT) {
      tracking();
    }
  }, []);

  return null;
}

export function useComponentMounted() {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  return mountedRef;
}
