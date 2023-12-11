import React, { FC, useEffect, useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';

import { API, graphqlOperation } from 'aws-amplify';
import {
  removeFacebookUserAccess,
  setFacebookUserAccess,
} from 'graphql/mutations';
import TailwindModal from '@components/modals/TailwindModal';
import DisconnectIntegration from '@components/modals/tailwindTypes/DisconnectIntegration';
import Spinner from '@components/Spinner';
import FailedIntegration from '@components/modals/tailwindTypes/FailedIntegration';
import { FacebookAdAccount } from '@interfaces/facebook';
import { getUserFacebookAccount } from '@graphql/queries';
import SocialButton from './SocialButton';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';

interface Props {
  facebookAccount?: FacebookAdAccount;
}

const FacebookIntegration: FC<Props> = ({ facebookAccount }) => {
  const disconnectModalRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);

  const [facebookAccountState, setFacebookAccountState] =
    useState(facebookAccount);

  const FB_HOST = process.env.NEXT_PUBLIC_FB_HOST as string;

  const { selectedBusiness } = useBusinessProfileContext();

  useEffect(() => {
    if (facebookAccount?.id) {
      setConnectionStatus(true);
    }
  }, [facebookAccount]);

  const getAccountInfo = async (facebook_accessToken: string) => {
    const fbAccountResponse: any = await API.graphql(
      graphqlOperation(getUserFacebookAccount, {
        getUserFacebookAccountInput: {
          facebook_accessToken: facebook_accessToken,
          business_id: selectedBusiness?.business_id,
        },
      }),
    );

    const fbAccountData = fbAccountResponse.data.getUserFacebookAccount;

    if (fbAccountData.error) {
      return '';
    }

    return fbAccountData.data.name;
  };

  const facebookLoginCallback = async (facebookResponse: any) => {
    try {
      const accessToken = facebookResponse.token.accessToken;
      const userId = facebookResponse.profile.id;

      if (!accessToken) {
        throw new Error(facebookResponse.error ?? 'Facebook auth failed');
      }

      await API.graphql(
        graphqlOperation(setFacebookUserAccess, {
          facebookAccessInput: {
            facebook_userID: userId,
            facebook_accessToken: accessToken,
          },
        }),
      );

      const fbname = await getAccountInfo(accessToken);

      setFacebookAccountState({
        accessToken: accessToken,
        id: userId,
        name: fbname,
      });
      setConnectionStatus(true);
    } catch (error: any) {
      console.log(error);
      setConnectionStatus(false);
      disconnectModalRef?.current?.click();
      Sentry.captureException(new Error(error as any));
    } finally {
      setLoading(false);
    }
  };

  const removeFacebookIntegration = async () => {
    try {
      setLoading(true);
      if (facebookAccountState?.id) {
        await fetch(`${FB_HOST}/${facebookAccountState?.id}/permissions`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_token: facebookAccountState?.accessToken,
          }),
        });
      }

      await API.graphql(graphqlOperation(removeFacebookUserAccess));
      setConnectionStatus(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start border p-3.5 rounded border-extraLightColor">
      <div className="font-bold mb-1 text-darkGrade100">Facebook</div>
      <div className="text-textSecondaryColor font-normal mb-6">
        {connectionStatus === true &&
          loading === false &&
          `${facebookAccountState?.name} (${facebookAccountState?.id})`}
      </div>

      {loading ? (
        <Spinner />
      ) : connectionStatus ? (
        <button
          className="inline-flex text-darkGrade50 hover:text-darkGrade75"
          data-bs-toggle="modal"
          data-bs-target="#disconnectFacebookModal"
        >
          <i className="icon-dismiss text-lg mr-2.5"></i>Disconnect
        </button>
      ) : (
        <SocialButton
          className="mt-auto inline-flex items-center text-primaryColor hover:text-primaryColorHover font-medium"
          provider="facebook"
          appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
          onLoginSuccess={facebookLoginCallback}
          onLoginFailure={(error: unknown) => console.log(error)}
          autoLoad={false}
          fields="name"
          scope="public_profile,ads_read,ads_management"
        >
          Connect
        </SocialButton>
      )}

      <TailwindModal id="disconnectFacebookModal">
        <DisconnectIntegration
          connectionStatus={connectionStatus}
          handler={removeFacebookIntegration}
          type={'facebook'}
        />
      </TailwindModal>

      <div
        ref={disconnectModalRef}
        data-bs-toggle="modal"
        data-bs-target="#failedIntegration"
      ></div>
      <TailwindModal id="failedIntegration">
        <FailedIntegration type={'Facebook'} />
      </TailwindModal>
    </div>
  );
};

export default FacebookIntegration;
