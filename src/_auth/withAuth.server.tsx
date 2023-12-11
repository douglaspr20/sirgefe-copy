import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { UserDetailsPrisma } from '@interfaces/userDetails';
import { getDynamicParamPathname } from '_utils/getDynamicParamPathname.server';
import { fetchUserDetails } from './fetchUserDetails.server';
import CreateStoreClientSide from '@store/initializer/StoreInitializer';
import { getVanityNameFromCookie } from 'app/action';

type WithAuthProps = {
  params: { [key: string]: string };
};

export const withAuth =
  // eslint-disable-next-line react/display-name
  (Component: any) => async (props: WithAuthProps) => {
    const { params } = props;

    const vanityName = await getVanityNameFromCookie();

    const { businessVanityName } = params;

    const userDetails = await fetchUserDetails(
      vanityName || businessVanityName,
    );

    const pathname = headers().get('x-pathname') || '';

    const currentPathname = getDynamicParamPathname(pathname, params);

    const isAuthenticated = !!userDetails?.userProfileData;

    let redirectUrl: string | undefined;
    const userBusiness = userDetails?.userProfileData?.businesses
      ? userDetails?.userProfileData?.businesses[0]?.business
      : null;

    if (isAuthenticated) {
      if (
        userBusiness?.status === 'verification_required' &&
        currentPathname !== '/login-verification'
      ) {
        if (currentPathname !== '/login-verification') {
          redirectUrl = 'login-verification';
        }
      }

      if (
        userBusiness?.status === 'canceled' ||
        userBusiness?.status === 'frozen' ||
        userDetails?.accountStatusData === false
      ) {
        if (currentPathname !== '/inactive-subscription') {
          redirectUrl = '/inactive-subscription';
        }
      }
    }

    // if (
    //   isAuthenticated &&
    //   !userDetails?.businessProfileData?.profilePrisma &&
    //   currentPathname.includes('/[businessVanityName]/')
    // ) {
    //   redirectUrl = '/selector';
    // }

    if (!isAuthenticated) redirectUrl = '/login';

    if (redirectUrl) redirect(redirectUrl);

    return (
      <>
        <CreateStoreClientSide user={userDetails as UserDetailsPrisma} />
        <Component {...props} />
      </>
    );
  };
