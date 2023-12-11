import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getShopifyScopesStatus } from '@graphql/queries';
import Image from 'next/image';
import Link from 'next/link';
import { UserDetails } from '@interfaces/userDetails';
import { useRouter } from 'next/router';
import { useLayoutContext } from '@providers/layoutProvider';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';

type ShopifyScopesProps = {
  userDetails: UserDetails;
  authenticated: boolean;
};

export const ShopifyScopesBanner = ({
  userDetails,
  authenticated,
}: ShopifyScopesProps) => {
  const router = useRouter();
  const { isSidebarOpen } = useLayoutContext();
  const { selectedBusiness } = useBusinessProfileContext();

  const [scopesValid, setScopesValid] = useState<boolean>(true);

  const getScopesStatus = async () => {
    const response: any = await API.graphql(
      graphqlOperation(getShopifyScopesStatus),
    );
    const scopesStatus = response?.data?.getShopifyScopesStatus?.data;
    setScopesValid(scopesStatus);
  };

  useEffect(() => {
    if (authenticated) {
      getScopesStatus();
    }
  }, [authenticated]);

  return (
    <>
      {!scopesValid &&
        authenticated &&
        !router.pathname.includes('inactive-subscription') && (
          <div
            className={`${
              !isSidebarOpen || router.pathname.includes('home')
                ? 'mr-0'
                : 'mr-24'
            }`}
          >
            <div
              className={`mx-4 flex flex-row border border-primaryColor text-red-700 px-4 py-3 rounded relative h-14 bg-primaryExtraLightColor justify-center mb-5 mt-3`}
              role="alert"
            >
              <div className="flex flex-row items-center ">
                <strong className="font-semibold text-primaryColor">
                  To Get Our Latest Features And Updates, Please Update Your
                  Permissions.
                </strong>
                <div className="ml-6 flex items-center gap-1">
                  <Image
                    alt="croc-vertical-icon"
                    src="/images/croc-vertical-icon.svg"
                    width={16}
                    height={15}
                  />
                  <Link
                    href={`https://${userDetails?.userProfileData?.shopify_store_url}/admin/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID}&scope=${process.env.NEXT_PUBLIC_SHOPIFY_API_SCOPES}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/${selectedBusiness?.vanity_name}/home`}
                    className="block sm:inline text-primaryColor font-medium"
                  >
                    Update
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
