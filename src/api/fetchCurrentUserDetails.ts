import * as Sentry from '@sentry/nextjs';
import { BusinessProfile } from '@interfaces/business';
import { BusinessConnections } from '@sirge-io/sirge-types';
import { graphqlOperation } from 'aws-amplify';
import {
  getCurrentUserBusinessDetailsNew,
  getPlatformMode,
  getUserNew,
} from 'graphql/queries';
import { posthog } from 'posthog-js';
import Cookies from 'js-cookie';
import {
  BusinessPrisma,
  CurrentUserBusinessDetailsPrisma,
  UserPrisma,
} from '../API';

const fetchCurrentUserDetails = async (
  { API }: any,
  businessVanityName?: string,
  serverSideCookie?: string,
) => {
  let platformMode: any,
    userProfileData: UserPrisma | null = null,
    accountStatusData = false,
    businessListData: Array<BusinessPrisma | null | undefined> = [],
    businessCountData: number | null | undefined = null,
    businessActiveCountData: number | null | undefined = null,
    businessProfileData: BusinessProfile = {
      isLoading: false,
      userRole: 0,
      trackerStatus: false,
      profilePrisma: null,
    };
  const businessConnections: BusinessConnections = {
    facebook_ad_account_id: null,
    facebook_ad_account_name: null,
    shopify_store: null,
    tik_tok_ad_account_id: null,
    tik_tok_ad_account_name: null,
    shopify_script_tag_id: null,
    script_installed: false,
  };
  const selectedBusinessData: number | null = null;

  try {
    let post_hog_user_id = null;
    if (process.env.NEXT_PUBLIC_POSTHOG_ENV === 'production') {
      /**
       * If cookie is present
       */
      if (serverSideCookie) {
        serverSideCookie?.split(';').forEach((cookieItem) => {
          const [key, value] = cookieItem.split('=');

          if (key.trim() === 'post_hog_user_id') {
            post_hog_user_id = value;
          }
        });
      } else {
        try {
          post_hog_user_id = posthog.get_distinct_id();
          Cookies.set('post_hog_user_id', post_hog_user_id);
        } catch (error) {
          Sentry.captureException(error);
        }
      }
    }

    const [
      platformModeResponse,
      userDataResponse,
      currentUserBusinessResponse,
    ] = await Promise.all([
      API.graphql({
        ...graphqlOperation(getPlatformMode),
        authMode: 'API_KEY',
      }),
      API.graphql(
        graphqlOperation(getUserNew, {
          getUserInput: {
            post_hog_user_id: post_hog_user_id,
          },
        }),
      ),
      API.graphql(
        graphqlOperation(getCurrentUserBusinessDetailsNew, {
          getCurrentUserBusinessDetailsInput: {
            vanity_name: businessVanityName,
          },
        }),
      ),
    ]);

    platformMode = platformModeResponse?.data?.getPlatformMode;
    const userData = userDataResponse?.data?.getUserNew?.data as UserPrisma;
    if (userData?.businesses && userData?.businesses?.length > 0) {
      const userBusiness = userData.businesses[0].business;
      const latestSubscription = userBusiness.subscriptions.pop();
      if (userBusiness?.status === 'verification_required') {
        accountStatusData = false;
      } else if (!userData.timezone || !userData.currency) {
        accountStatusData = true;
      } else if (
        latestSubscription?.status !== 'active' &&
        latestSubscription?.status !== 'trailing'
      ) {
        accountStatusData = false;
      } else {
        accountStatusData = true;
      }
    }

    userProfileData = userData;

    //TODO later change this
    const roleid = 2;
    //
    // if (userData?.manager_id) {
    //   roleid = 2;
    // } else {
    //   roleid = 1;
    // }

    const businessDetails = currentUserBusinessResponse.data
      .getCurrentUserBusinessDetailsNew
      .data as CurrentUserBusinessDetailsPrisma;

    const businesses = businessDetails?.businesses;

    businessListData = businesses?.business_list?.map((b) => b?.business) ?? [];
    businessCountData = businesses?.business_count;
    businessActiveCountData = businesses?.business_active_count;

    const business = businessDetails.business;
    const tracketStatus = businessDetails.status?.active || false;
    if (business?.status === 'deactivated') {
      Sentry.captureException(new Error(JSON.stringify(business)));
    }

    businessProfileData = {
      isLoading: false,
      profile: business as any,
      profilePrisma: business,
      userRole: roleid,
      trackerStatus: tracketStatus,
    };
  } catch (error) {
    Sentry.captureException(error);
    businessProfileData = {
      isLoading: false,
      userRole: 0,
      trackerStatus: false,
      profilePrisma: null,
    };
  }

  return {
    platformMode,
    userProfileData,
    accountStatusData,
    businessListData,
    businessCountData,
    businessActiveCountData,
    selectedBusinessData,
    businessProfileData,
    businessConnections,
  };
};

export default fetchCurrentUserDetails;
