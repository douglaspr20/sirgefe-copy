'use client';
import { useEffect, useRef } from 'react';
const useUpdateEffect = (
  effectCallback: () => void,
  deps: any[] = [],
): void => {
  const isFirstMount = useRef(false);
  useEffect(() => {
    return () => {
      isFirstMount.current = false;
    };
  }, []);
  useEffect(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true;
    } else {
      return effectCallback();
    }
  }, deps);
};
export default useUpdateEffect;
