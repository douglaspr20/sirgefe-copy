import React from 'react';
import { withAuth } from '_auth/withAuth.server';
import PerformanceApp from '@components/performance/PerformanceApp';
import { Metadata } from 'next';
const Page = () => {
  return (
    <div className={'p-4'}>
      <PerformanceApp />
    </div>
  );
};

export const metadata: Metadata = {
  title: 'Sirge | Performance',
};

export default withAuth(Page);
