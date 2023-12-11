import React from 'react';
import { Metadata } from 'next';
import { withAuth } from '_auth/withAuth.server';

import QuickSetup from '_components/quick-setup/app/QuickSetup';

const Page = async () => {
  return <QuickSetup />;
};

export const metadata: Metadata = {
  title: 'Sirge | Quick Setup',
};

export default withAuth(Page);
