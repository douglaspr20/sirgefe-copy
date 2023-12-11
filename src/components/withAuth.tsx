import React from 'react';
import { useRouter } from 'next/router';
import { NextComponentType } from 'next';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';

export const withAuth =
  // eslint-disable-next-line react/display-name
  (Component: NextComponentType<any, any, any>) => (props: any) => {
    const router = useRouter();

    const { businessProfile, userProfile } = useBusinessProfileContext();

    const isLoading = businessProfile.isLoading;
    if (!userProfile && !isLoading) {
      router.push('/login');
    }

    const InactiveSubscriptionRoutes = [
      '/inactive-subscription',
      '/inactive-subscription/invoices',
      '/inactive-subscription/plans',
    ];

    if (
      userProfile?.account_state === 'canceled' ||
      userProfile?.account_state === 'frozen'
    ) {
      if (!InactiveSubscriptionRoutes.includes(router.pathname)) {
        router.push(InactiveSubscriptionRoutes[0]);
      } else {
        return <Component {...props} />;
      }
    }

    if (
      userProfile?.status === 'verification_required' &&
      router.pathname !== '/login-verification'
    ) {
      if (router.pathname !== '/login-verification') {
        router.push('login-verification');
      } else {
        return <Component {...props} />;
      }
    }

    if (
      (userProfile?.timezone === null || userProfile?.currency === null) &&
      router.pathname !== '/settings/timezone-currency'
    ) {
      if (router.pathname !== '/settings/timezone-currency') {
        router.push('/settings/timezone-currency');
      } else {
        return <Component {...props} />;
      }
    }

    return <Component {...props} />;
  };
