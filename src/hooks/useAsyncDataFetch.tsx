'use client';
import { useAsyncDataFetchContext } from '@providers/asyncDatafetchProvider';
import { useEffect } from 'react';

const useAsyncDataFetch = () => {
  const { fetchComplete, addListener, removeListener, setLoading } =
    useAsyncDataFetchContext();

  useEffect(() => {
    addListener && addListener();

    return () => removeListener && removeListener();
  }, []);

  return { fetchComplete, setLoading };
};

export default useAsyncDataFetch;
