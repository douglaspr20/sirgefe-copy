'use client';
import { ShopifyScopesBanner } from '_components/ShopifyScopesBanner.client';
import { UserDetails } from '@interfaces/userDetails';
import { AuthLayout } from '_layout/authLayout.client';
import { BaseLayout } from '_layout/baseLayout.client';
import OnboardingLayout from '_layout/onboardingLayout.client';
import { SidebarLayout } from '_layout/SideBarLayout.client';
// import ErrorMode from '@pages/ErrorMode';
import { SnackbarProvider } from '_providers/snackBarProvider';
import * as Sentry from '@sentry/nextjs';
import { Amplify } from 'aws-amplify';
import awsConfig from 'graphql/aws-config';
import { handelRightClick } from 'modules/handleRightClick';
import { Poppins } from 'next/font/google';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import NextNProgress from 'nextjs-progressbar';
import posthog from 'posthog-js';
import React, { useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { IntercomProvider } from 'react-use-intercom';
import { IntercomChat } from '_IntercomChat';
import { AsyncDataFetchProvider } from '_providers/asyncDatafetchProvider';
import { BackdropLoaderProvider } from '_providers/backdropLoaderProvider';
import { BusinessConnectionsProvider } from '_providers/businessConnectionsProvider';
import { BusinessProfileProvider } from '_providers/businessProfileProvider';
import { LayoutProvider } from '_providers/layoutProvider';
import { PerformanceProvider } from '_providers/performanceProvider';
import { QuickSetupProvider } from '_providers/quickSetupProvider';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

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

export const AppContextProviders = ({
  children,
  userDetails,
  dynamicPathname,
}: {
  children: React.ReactNode;
  userDetails: UserDetails;
  dynamicPathname: string;
}) => {
  if (
    typeof window !== 'undefined' &&
    window?.google &&
    window.google?.accounts === undefined
  ) {
    window.google.accounts = {};
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track each page view in facebook
  const track = async () => {
    const { default: ReactPixel } = await import('react-facebook-pixel');

    if (awsConfig.react_pixel_init) {
      ReactPixel.init(awsConfig.react_pixel_init);
    }

    ReactPixel.pageView();
  };

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

  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  type CookieNames = 'user' | 'scid' | 'sirgeAdminOpen' | 'scr';

  const [cookies, _setCookie, removeCookie] = useCookies<CookieNames>(['user']);

  useEffect(() => {
    const platformMode = userDetails?.platformMode;

    if (platformMode?.maintenance_mode) {
      if (!cookies.sirgeAdminOpen) {
        window.open(process.env.NEXT_PUBLIC_ACCOUNTS_URL, '_self');
      } else {
        setInitialLoad(false);
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
      setInitialLoad(false);
    }
  }, [cookies.sirgeAdminOpen, removeCookie]);

  useEffect(() => {
    const use = async () => {
      (await import('tw-elements' as any)).default;
    };
    use();
  }, []);

  return (
    <div className={`${poppins.className}`}>
      <NextNProgress options={{ showSpinner: false }} color={'#32C4D4'} />
      <Sentry.ErrorBoundary fallback={<div />}>
        <CookiesProvider>
          <BusinessProfileProvider userDetails={userDetails}>
            <BusinessConnectionsProvider
              connectionDetails={userDetails.businessConnections}
            >
              <BackdropLoaderProvider>
                <PerformanceProvider>
                  <SnackbarProvider>
                    <QuickSetupProvider>
                      <AsyncDataFetchProvider>
                        <IntercomProvider
                          appId={process.env.NEXT_PUBLIC_INTERCOM_ID as string}
                          apiBase="https://api-iam.intercom.io"
                        >
                          <IntercomChat />
                          <LayoutProvider>
                            {!userDetails || !userDetails.userProfileData ? (
                              <AuthLayout>
                                {children}
                                <IntercomChat />
                              </AuthLayout>
                            ) : // ) : userDetails &&
                            //   dynamicPathname?.includes(
                            //     '[businessVanityName]',
                            //   ) ? (
                            //   <SidebarLayout>
                            //     {userDetails?.userProfileData
                            //       ?.shopify_store_url && (
                            //       <ShopifyScopesBanner
                            //         authenticated={
                            //           userDetails && userDetails.userProfileData
                            //             ? true
                            //             : false
                            //         }
                            //         userDetails={userDetails}
                            //       />
                            //     )}
                            //     {children}
                            //   </SidebarLayout>
                            dynamicPathname?.includes('quick-setup') ? (
                              <OnboardingLayout>
                                {children}
                                <IntercomChat />
                              </OnboardingLayout>
                            ) : (
                              <BaseLayout
                                styleClass={{ zIndex: 1 }}
                                cssClass="flex flex-col"
                              >
                                {children}
                                <IntercomChat />
                              </BaseLayout>
                            )}
                          </LayoutProvider>
                        </IntercomProvider>
                      </AsyncDataFetchProvider>
                    </QuickSetupProvider>
                  </SnackbarProvider>
                </PerformanceProvider>
              </BackdropLoaderProvider>
            </BusinessConnectionsProvider>
          </BusinessProfileProvider>
        </CookiesProvider>
      </Sentry.ErrorBoundary>
    </div>
  );
};
