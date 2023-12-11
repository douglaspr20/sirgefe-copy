import { UserDetails, UserDetailsPrisma } from '@interfaces/userDetails';
import { NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import Router from 'next/router';

export const verifyAuth = async (
  ctx: NextPageContext,
  pageProps: AppInitialProps<any>,
  userDetails?: UserDetailsPrisma,
) => {
  const currentPathname = ctx.pathname;

  const isAuthenticated = !!userDetails?.userProfileData;

  const protectedRoutes: string[] = Object.values(PROTECTED_PAGES);
  const isProtectedRoute = protectedRoutes.includes(ctx.pathname);

  const bussiness = userDetails?.userProfileData?.businesses || [];

  const defaultBusiness =
    userDetails?.businessListData?.find(
      (item) => item?.id === bussiness[0].business.id,
    ) ?? userDetails?.businessListData?.[0];

  const homePageUrl = `/${defaultBusiness?.vanity_name}/home`;

  let redirectUrl: string | undefined;

  if (isProtectedRoute && isAuthenticated) {
    // if (
    //   // TODO: need to add status in UserPrisma
    //   // userDetails?.userProfileData?.status === 'verification_required' &&
    //   userDetails?.userProfileData?.user_type === 'verification_required' &&
    //   currentPathname !== '/login-verification'
    // ) {
    //   if (currentPathname !== '/login-verification') {
    //     redirectUrl = 'login-verification';
    //   }
    // }
    // TODO: need to add account_state in UserPrisma
    // if (
    //   userDetails?.userProfileData?.account_state === 'canceled' ||
    //   userDetails?.userProfileData?.account_state === 'frozen' ||
    //   userDetails?.accountStatusData === false
    // ) {
    //   console.log('hello there!');
    //   if (currentPathname !== '/inactive-subscription') {
    //     redirectUrl = '/inactive-subscription';
    //   }
    // }
  }

  // if (
  //   isAuthenticated &&
  //   // !userDetails?.businessProfileData?.profile &&
  //   currentPathname.includes('/[businessVanityName]/')
  // ) {
  //   if (ctx.res) {
  //     ctx?.res?.writeHead(302, {
  //       Location: '/selector',
  //     });
  //     ctx.res.end();
  //   } else {
  //     Router.push('/selector');
  //   }
  // }

  if (!isAuthenticated && isProtectedRoute) redirectUrl = '/login';

  if (redirectUrl) redirect(redirectUrl, ctx);

  if (
    !redirectUrl &&
    (currentPathname === '/' ||
      currentPathname === '/selector' ||
      currentPathname === PROTECTED_PAGES.ANALYTICS)
  ) {
    redirect(homePageUrl, ctx);
  }

  return {
    pageProps: { ...pageProps, userDetails },
  };
};

enum PROTECTED_PAGES {
  QUICK_SETUP = '/quick-setup',
  BOOK_ONBOARDING = '/book-onboarding',
  ASYNC_FETCH = '/async-fetch', // TODO: remove this async fetch POC page
  LOGIN_VERIFICATION = '/login-verification',
  HOME_PAGE = '/',
  SETTINGS = '/settings/',
  COACHING_CALL = '/settings/coaching-call',
  BUSINESSES = '/settings/businesses/',
  BUSINESS_NAME = '/settings/businesses/[businessName]',
  WEEKLY_GROUP_CALL = '/settings/weekly-group-call',
  SELECT_BUSINESS = '/settings/s/select-business',
  PROFILE = '/settings/profile',
  USERS = '/settings/users/',
  USER_ID = '/settings/users/[id]',
  TIMEZONE_CURRENCY = '/settings/timezone-currency/',
  INTEGRATIONS = '/settings/integrations',
  BILLING = '/settings/billing/',
  BILLING_PLANS = '/settings/billing/plans',
  INACTIVE_SUBSCRIPTION = '/inactive-subscription/',
  INACTIVE_SUBSCRIPTION_PLANS = '/inactive-subscription/plans',
  INACTIVE_SUBSCRIPTION_INVOICES = '/inactive-subscription/invoices',
  TRACKING = '/[businessVanityName]/settings/tracking',
  CONNECTIONS = '/[businessVanityName]/settings/connections',
  BUSINESS_PROFILE = '/[businessVanityName]/settings/profile',
  Home = '/[businessVanityName]/home',
  ANALYTICS = '/[businessVanityName]/analytics',
  VISITORS = '/[businessVanityName]/visitors',
  SOURCES = '/[businessVanityName]/sources',
  POST_TRACK = '/[businessVanityName]/post-track',
  PERFORMANCE_ADS = '/[businessVanityName]/performance/ads',
  PERFORMANCE_CAMPAIGNS = '/[businessVanityName]/performance/campaigns',
  PERFORMANCE_AD_SETS = '/[businessVanityName]/performance/ad-sets',
  PERFORMANCE = '/performance',
  BUSINESS_SELECTOR = '/selector',
  VISITORS_VISITOR_ID = '/[businessVanityName]/visitors/[visitorId]/profile',
  BUSINESS_SETTINGS_PROFILE = '/[businessVanityName]/settings/profile',
  BUSINESS_SETTINGS_CONNECTIONS = '/[businessVanityName]/settings/connections',
  BUSINESS_SETTINGS_MYSTORE = '/[businessVanityName]/settings/my-store',
  BUSINESS_SETTINGS_USERS = '/[businessVanityName]/settings/users',
  BUSINESS_SETTINGS_BILLING = '/[businessVanityName]/settings/billing',
  CUSTOMER_JOURNEY = '/[businessVanityName]/customer-journey',
  CUSTOMER_JOURNEY_VISITOR_ID = '/[businessVanityName]/customer-journey/[visitorId]/profile',
}

const redirect = (url: string, ctx: NextPageContext) => {
  const currentUrl = ctx.req
    ? (ctx.req.url as string)
    : window.location.pathname;

  url = `${url}/?redirect=${encodeURIComponent(currentUrl)}`;

  if (ctx.res) {
    /**
     * Server-Side redirect using res.writeHead
     */
    ctx?.res?.writeHead(302, {
      Location: url,
    });
    ctx.res.end();
  } else {
    /**
     * Client side redirect
     */
    Router.push(url);
  }
};
