import React, { useEffect, useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/router';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { API, graphqlOperation } from 'aws-amplify';
import { authenticateTikTok, disconnectTikTok } from 'graphql/mutations';
import Spinner from '@components/Spinner';
import TailwindModal from '@components/modals/TailwindModal';
import DisconnectIntegration from '@components/modals/tailwindTypes/DisconnectIntegration';
import FailedIntegration from '@components/modals/tailwindTypes/FailedIntegration';

const TikTokIntegration = () => {
  const { selectedBusiness, updateBusinessAdAccount } =
    useBusinessProfileContext();
  const disconnectModalRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const tikTokIntegrationStatus = !!selectedBusiness?.tik_tok_access_token;

  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isTikTokIntegrationCalled =
      localStorage.getItem('is_tik_tok_integration_called') === 'true';
    const query = new URLSearchParams(window.location.search);

    const auth_code = query.get('auth_code');

    if (auth_code && !isTikTokIntegrationCalled) {
      localStorage.setItem('is_tik_tok_integration_called', 'true');
      connectTikTok(auth_code);
    } else if (tikTokIntegrationStatus) {
      fetchDisplayName(selectedBusiness.tik_tok_access_token as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const fetchDisplayName = async (accessToken: string) => {
    try {
      const userProfileResponse = await fetch(
        `https://business-api.tiktok.com/open_api/v1.3/user/info/`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Token': accessToken,
          },
        },
      );

      const userProfile = await userProfileResponse.json();
      setDisplayName(userProfile?.data?.display_name ?? '');
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  };

  const connectTikTok = async (auth_code: string) => {
    try {
      setLoading(true);

      const response: any = await API.graphql(
        graphqlOperation(authenticateTikTok, {
          authenticateTikTokInput: {
            auth_code,
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      const accessToken = response.data.authenticateTikTok?.data;

      if (selectedBusiness) {
        updateBusinessAdAccount(selectedBusiness.business_id, {
          ...selectedBusiness,
          tik_tok_access_token: accessToken,
        });
      }
    } catch (error) {
      disconnectModalRef?.current?.click();
      console.log(error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectTikTokIntegration = async () => {
    try {
      await API.graphql(graphqlOperation(disconnectTikTok));

      if (selectedBusiness) {
        updateBusinessAdAccount(selectedBusiness.business_id, {
          ...selectedBusiness,
          tik_tok_access_token: null,
        });
      }
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  };

  const tiktokConnectInit = () => {
    let url = '';

    url = `https://ads.tiktok.com/marketing_api/auth?app_id=${process.env.NEXT_PUBLIC_TIK_TOK_APP_ID}&state=${process.env.NEXT_PUBLIC_RELEASE_STAGE}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations&rid=${process.env.NEXT_PUBLIC_TIK_TOK_AUTH_RID}`;
    localStorage.removeItem('is_tik_tok_integration_called');
    window.open(url, '_self');
  };

  return (
    <div className="flex flex-col items-start border p-3.5 rounded border-extraLightColor">
      <div className="font-bold mb-1 text-darkGrade100">TikTok</div>
      <div className="text-textSecondaryColor font-normal mb-6">
        {tikTokIntegrationStatus === true && loading === false && displayName}
      </div>
      <div className="mt-auto ">
        {loading ? (
          <Spinner />
        ) : tikTokIntegrationStatus ? (
          <button
            className="inline-flex text-darkGrade50 hover:text-darkGrade75"
            data-bs-toggle="modal"
            data-bs-target="#disconnectTikTokModal"
          >
            <i className="icon-dismiss text-lg mr-2.5"></i>Disconnect
          </button>
        ) : (
          <button
            onClick={tiktokConnectInit}
            className="mt-auto inline-flex items-center text-primaryColor hover:text-primaryColorHover font-medium"
          >
            <i className="icon-connect text-lg mr-2.5"></i>Connect
          </button>
        )}
      </div>

      <TailwindModal id="disconnectTikTokModal">
        <DisconnectIntegration
          connectionStatus={!!tikTokIntegrationStatus}
          handler={disconnectTikTokIntegration}
          type={'tik_tok'}
        />
      </TailwindModal>

      <div
        ref={disconnectModalRef}
        data-bs-toggle="modal"
        data-bs-target="#failedIntegration"
      ></div>
      <TailwindModal id="failedIntegration">
        <FailedIntegration type={'TikTok'} />
      </TailwindModal>
    </div>
  );
};

export default TikTokIntegration;
