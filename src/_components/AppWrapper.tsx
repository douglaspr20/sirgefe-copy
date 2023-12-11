'use client';

import React, { FC, useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import posthog from 'posthog-js';
import awsConfig from 'graphql/aws-config';
import { usePathname, useSearchParams } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import { handelRightClick } from 'modules/handleRightClick';
import { useCookies } from 'react-cookie';
// import ErrorMode from '@pages/ErrorMode';
import { IntercomChat } from '_IntercomChat';
import { SidebarLayout } from '_layout/SideBarLayout.client';
import { ShopifyScopesBanner } from './ShopifyScopesBanner.client';
import OnboardingLayout from '_layout/onboardingLayout.client';
import { BaseLayout } from '_layout/baseLayout.client';
import { UserDetails, UserDetailsPrisma } from '@interfaces/userDetails';
import SegmentLayout from '_layout/SegmentLayout.client';
import { useBoundStore } from '@store/index';

declare global {
  interface Window {
    google: {
      accounts: any;
    };
  }
}

Amplify.configure({
  ...awsConfig,
  ssr: true,
});

if (
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_POSTHOG_ENV === 'production' &&
  awsConfig.posthog_init
) {
  // This ensures that as long as we are client-side, posthog is always ready
  // NOTE: If set as an environment variable be sure to prefix with `NEXT_PUBLIC_`
  // For more info see https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser

  posthog.init(awsConfig.posthog_init, {
    api_host: awsConfig.posthog_url,
  });
}

interface Props {
  children: React.ReactNode;
  userDetails: UserDetailsPrisma;
}

const AppWrapper: FC<Props> = ({ children, userDetails }) => {
  if (
    typeof window !== 'undefined' &&
    window?.google &&
    window.google?.accounts === undefined
  ) {
    window.google.accounts = {};
  }

  if (
    typeof window !== 'undefined' &&
    window?.google &&
    window.google?.accounts === undefined
  ) {
    window.google.accounts = {};
  }
  const { selectedBusiness } = useBoundStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isClient, setIsClient] = useState(false);

  // Track each page view in facebook
  const track = async () => {
    const { default: ReactPixel } = await import('react-facebook-pixel');

    if (awsConfig.react_pixel_init) {
      ReactPixel.init(awsConfig.react_pixel_init);
    }

    ReactPixel.pageView();
  };

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    // Track page views
    const handleRouteChange = () =>
      process.env.NODE_ENV === 'production' && posthog.capture('$pageview');

    handleRouteChange();
  }, [pathname, searchParams]);

  //this handles the scenario if the user closes the browser or the tab for PostHog
  const handleTabClose = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    //swallowing this error because it only happens in certain condition's like dev.
    try {
      posthog?.reset();
    } catch (error) {
      console.log('error trying to reset posthog');
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  useEffect(() => {
    track();
  }, [pathname]);

  useEffect(() => document.addEventListener('contextmenu', handelRightClick));

  type CookieNames = 'user' | 'scid' | 'sirgeAdminOpen' | 'scr';

  const [cookies, _setCookie, removeCookie] = useCookies<CookieNames>(['user']);

  useEffect(() => {
    const platformMode = userDetails.platformMode;
    if (platformMode?.maintenance_mode) {
      if (!cookies.sirgeAdminOpen) {
        window.open(process.env.NEXT_PUBLIC_ACCOUNTS_URL, '_self');
      }
    } else if (platformMode?.closed_mode) {
      window.open(process.env.NEXT_PUBLIC_ACCOUNTS_URL, '_self');
    } else {
      if (cookies.sirgeAdminOpen) {
        removeCookie('sirgeAdminOpen', { path: '/' });
        removeCookie('sirgeAdminOpen', {
          domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
          path: '/',
        });
      }
    }
  }, [cookies.sirgeAdminOpen, removeCookie, userDetails]);

  useEffect(() => {
    const use = async () => {
      (await import('tw-elements' as any)).default;
    };
    use();
  }, []);

  return (
    <>
      {isClient && (
        <Sentry.ErrorBoundary fallback={<div />}>
          <IntercomChat />
          {userDetails &&
          pathname?.includes(`${selectedBusiness?.vanity_name}`) &&
          !pathname?.includes('segment') ? (
            <SidebarLayout>
              {/* {selectedBusiness?.store?.store_url && (
                <ShopifyScopesBanner
                  authenticated={
                    userDetails && userDetails.userProfileData ? true : false
                  }
                  shopify_store_url={selectedBusiness?.store?.store_url}
                />
              )} */}
              {children}
            </SidebarLayout>
          ) : pathname?.includes('segment') ? (
            <SegmentLayout>{children}</SegmentLayout>
          ) : pathname?.includes('quick-setup') ? (
            <OnboardingLayout>
              {children}
              <IntercomChat />
            </OnboardingLayout>
          ) : (
            <BaseLayout styleClass={{ zIndex: 1 }} cssClass="flex flex-col">
              {children}
              <IntercomChat />
            </BaseLayout>
          )}
        </Sentry.ErrorBoundary>
      )}
    </>
  );
};

export default AppWrapper;
