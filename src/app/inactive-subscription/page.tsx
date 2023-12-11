import React from 'react';
import { Metadata } from 'next';
import { withAuth } from '_auth/withAuth.server';
import InactiveSubscriptionApp from '@components/inactive-subscription/app/InactiveSubscriptionApp';

const InactiveSubscriptionPage = async () => {
  return <InactiveSubscriptionApp />;
};

export const metadata: Metadata = {
  title: 'Sirge | Pick a plan',
};

export default withAuth(InactiveSubscriptionPage);
