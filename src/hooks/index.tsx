'use client';

import axios from 'axios';
import { useEffect } from 'react';

export function useVisitTracker() {
  useEffect(() => {
    const tracking = async () => {
      try {
        await axios.put(
          process.env.NEXT_PUBLIC_VISIT_TRACKER_ENDPOINT as string,
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (process.env.NEXT_PUBLIC_VISIT_TRACKER_ENDPOINT) {
      tracking();
    }
  }, []);

  return null;
}
