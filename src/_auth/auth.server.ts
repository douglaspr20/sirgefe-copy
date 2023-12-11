import { redirect } from 'next/navigation';
import { UserDetails } from '@interfaces/userDetails';
import { cookies } from 'next/headers';

export const verifyAuth = async (userDetails?: UserDetails) => {
  const currentPathname = cookies().get('currentPathname')?.value as string;

  const isAuthenticated = !!userDetails?.userProfileData;

  const protectedRoutes: string[] = Object.values(PROTECTED_PAGES);
  const isProtectedRoute = protectedRoutes.includes(currentPathname);

  let redirectUrl: string | undefined;

  if (isProtectedRoute && isAuthenticated) {
    if (
      userDetails?.userProfileData?.status === 'verification_required' &&
      currentPathname !== '/login-verification'
    ) {
      if (currentPathname !== '/login-verification') {
        redirectUrl = 'login-verification';
      }
    }

    if (
      userDetails?.userProfileData?.account_state === 'canceled' ||
      userDetails?.userProfileData?.account_state === 'frozen' ||
      userDetails?.accountStatusData === false
    ) {
      if (currentPathname !== '/inactive-subscription') {
        redirectUrl = '/inactive-subscription';
      }
    }
  }

  // if (
  //   isAuthenticated &&
  //   // !userDetails?.businessProfileData?.profile &&
  //   currentPathname.includes('/[businessVanityName]/')
  // ) {
  //   redirect('/selector');
  // }

  if (!isAuthenticated && isProtectedRoute) redirectUrl = '/login';

  if (redirectUrl) redirect(redirectUrl);

  return {
    pageProps: { userDetails },
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
  AUDIENCES = '/[businessVanityName]/audiences',
  AUDIENCES_SEGMENT = '/[businessVanityName]/audiences/segment',
  AUDIENCES_DYNAMIC_QUERY = '/[businessVanityName]/audiences/dynamicQuery',
}
