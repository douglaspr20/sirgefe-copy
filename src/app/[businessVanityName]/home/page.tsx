import React from 'react';
import { withAuth } from '_auth/withAuth.server';
import AnalyticsApp from '_components/home/AnalyticsApp';
import { Metadata } from 'next';

const Page = () => {
  return (
    <div className={'p-4'}>
      <AnalyticsApp />
    </div>
  );
};

export const metadata: Metadata = {
  title: `Sirge | Home`,
};

export default withAuth(Page);
