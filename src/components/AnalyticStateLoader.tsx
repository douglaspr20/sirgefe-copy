import React, { useEffect, useState } from 'react';
import AsyncDataFetchLoader from './AsyncDataFetchLoader';

const AnalyticStateLoader = ({ load }: any) => {
  const [loading, setLoading] = useState(load);

  useEffect(() => {
    setLoading(load);
  }, [load]);

  return (
    loading && (
      <AsyncDataFetchLoader loading={loading} displayLoader={loading} />
    )
  );
};

export default AnalyticStateLoader;
