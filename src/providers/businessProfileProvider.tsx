'use client';
import {
  BusinessesResponse,
  BusinessProfile,
  BusinessProfileInfo,
} from '@interfaces/business';
import { User, Business } from '@sirge-io/sirge-types';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import userflow from 'userflow.js';
import BoltLoader from '@components/loader/BoltLoader';
import { FacebookAdAccount } from '@interfaces/facebook';
import { useRouter } from 'next/navigation';
import { UserSession } from '@interfaces/sessions';
import { UserDetails } from 'interfaces/userDetails';
import { API, graphqlOperation } from 'aws-amplify';
import { getBusinessesByUserId } from 'graphql/queries';
import posthog from 'posthog-js';

// [NOTE] Can user profile stuff be removed?

type BusinessProfileContextType = {
  businessProfile: BusinessProfile;
  setBusinessProfile: Dispatch<SetStateAction<BusinessProfile>>;
  selectedBusiness: Business | null;
  businessCount: number | null;
  businessActiveCount: number | null;
  accountStatus: boolean;
  setSelectedBusiness: Dispatch<SetStateAction<Business | null>>;
  businessList: Business[];
  setBusinessList: Dispatch<SetStateAction<Business[]>>;
  updateProfileInApp: (data: Partial<BusinessProfileInfo>) => void;
  updateUserProfileInApp: (data: Partial<User>) => void;
  userProfile: User | null;
  userSessions: UserSession[];
  setSelectedFacebookAdAccount: Dispatch<
    SetStateAction<Partial<FacebookAdAccount> | null>
  >;
  selectedFacebookAdAccount: Partial<FacebookAdAccount> | null;
  userRole: number;
  reloadBusinessList: () => Promise<void>;
  updateBusinessAdAccount: (
    businessId: string,
    adData: Partial<Business>,
  ) => Promise<void>;
};

export const BusinessProfileContext = createContext(
  {} as BusinessProfileContextType,
);

export const useBusinessProfileContext = () =>
  useContext(BusinessProfileContext);

//  this provider is going to obselete in future that's why we changed the type of userDetails as any
type BusinessProfileProviderProps = {
  children: ReactNode;
  userDetails: any;
};

export const BusinessProfileProvider = ({
  children,
  userDetails,
}: BusinessProfileProviderProps) => {
  const router = useRouter();

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(
    userDetails.businessProfileData,
  );
  const [selectedFacebookAdAccount, setSelectedFacebookAdAccount] =
    useState<Partial<FacebookAdAccount> | null>(null);

  const [businessList, setBusinessList] = useState<Business[]>(
    userDetails.businessListData,
  );

  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );
  const [businessCount, setBusinessCount] = useState<number | null>(
    userDetails.businessCountData,
  );
  const [businessActiveCount, setBusinessActiveCount] = useState<number | null>(
    userDetails.businessActiveCountData,
  );

  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [userProfile, setUserProfile] = useState(userDetails.userProfileData);

  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = async () => {
    setUserProfile(userDetails.userProfileData);
    setBusinessList(userDetails.businessListData);
    setBusinessCount(userDetails.businessCountData);
    setBusinessActiveCount(userDetails.businessActiveCountData);
  };

  const updateProfileInApp = (data: Partial<BusinessProfileInfo>) => {
    const newBusinessProfile = businessProfile;
    newBusinessProfile.profile = { ...newBusinessProfile?.profile, ...data };
    setBusinessProfile(newBusinessProfile);
  };

  useEffect(() => {
    const defaultBusiness =
      userDetails?.businessListData.find(
        (item: any) =>
          item.business_id === userDetails.userProfileData?.default_business_id,
      ) ?? userDetails?.businessListData?.[0];

    if (
      userDetails?.businessListData.length > 0 &&
      (selectedBusiness === null ||
        defaultBusiness?.business_id !== selectedBusiness.business_id)
    ) {
      if (userDetails.userProfileData?.default_business_id) {
        setSelectedBusiness(defaultBusiness);
      } else {
        setSelectedBusiness(userDetails?.businessListData[0]);
      }
    }
  }, [userDetails]);

  const updateUserProfileInApp = (data: Partial<User>) => {
    setUserProfile({ ...(userProfile as User), ...data });
  };

  React.useEffect(() => {
    setIsLoading(false);
    const userProfile = userDetails?.userProfileData;

    if (userProfile) {
      if (process.env.NEXT_PUBLIC_RELEASE_STAGE === 'production') {
        userflow.init('ct_fxwhc47gjbfo3mtivxvxcnkg4a'); // TODO: Should be moved to .env
        userflow.identify(userProfile.email, {
          name: `${userProfile.first_name} ${userProfile.last_name}`,
          email: userProfile.email,
          signed_up_at: userProfile.created_at,
        });
      } else {
        userflow.init('ct_n32okr5hyfbl3i4kge35u344lu'); // TODO: Should be moved to .env
        userflow.identify(userProfile.email, {
          name: `${userProfile.first_name} ${userProfile.last_name}`,
          email: userProfile.email,
          signed_up_at: userProfile.created_at,
        });
      }
    }
    getUserInfo();
  }, [userDetails]);

  React.useEffect(() => {
    setBusinessProfile(userDetails?.businessProfileData);
  }, [userDetails?.businessProfileData]);

  React.useEffect(() => {
    if (userDetails?.userProfileData?.email) {
      process.env.NODE_ENV === 'production' &&
        posthog.identify(userDetails?.userProfileData?.email);
    }
  }, [userDetails?.userProfileData?.email]);

  if (isLoading) {
    return <BoltLoader type="overlay" />;
  }

  const reloadBusinessList = async () => {
    const businessesResponse: any = await API.graphql<BusinessesResponse>(
      graphqlOperation(getBusinessesByUserId),
    );

    const userBusinesses: BusinessesResponse =
      businessesResponse?.data?.getBusinessesByUserId?.data;

    setBusinessList(userBusinesses.business_list as Business[]);
    setBusinessCount(userBusinesses.business_count);
    setBusinessActiveCount(userBusinesses.business_active_count);
  };

  /**
   * update business and businessList after connect or disconnect ad
   */
  const updateBusinessAdAccount = async (
    businessId: string,
    adData: Partial<Business>,
  ) => {
    setBusinessList((prev) => {
      const list = prev.map((business) => {
        if (business.business_id === businessId) {
          return {
            ...business,
            ...adData,
          };
        }

        return business;
      });

      return list;
    });

    setSelectedBusiness((prev) => ({
      ...prev,
      ...(adData as Business),
    }));
  };

  return (
    <BusinessProfileContext.Provider
      value={{
        businessProfile,
        setBusinessProfile,
        selectedBusiness,
        setSelectedBusiness,
        businessCount,
        businessActiveCount,
        accountStatus: userDetails.accountStatusData,
        businessList,
        setBusinessList,
        reloadBusinessList,
        updateProfileInApp,
        userProfile,
        userSessions,
        selectedFacebookAdAccount,
        setSelectedFacebookAdAccount,
        userRole: userDetails.businessProfileData.userRole,
        updateUserProfileInApp,
        updateBusinessAdAccount,
      }}
    >
      {children}
    </BusinessProfileContext.Provider>
  );
};
