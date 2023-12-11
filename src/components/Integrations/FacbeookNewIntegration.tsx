import { FC, useEffect, useRef, useState } from 'react';
import FacebookIcon from '@assets/icons/FacebookIcon';
import { FacebookAdAccount } from '@interfaces/facebook';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import ConnectClip from '@assets/icons/ConnectClip';
import { API, graphqlOperation } from 'aws-amplify';
import { getUserFacebookAccount } from '@graphql/queries';
import {
  removeFacebookUserAccess,
  setFacebookUserAccess,
} from '@graphql/mutations';
import * as Sentry from '@sentry/nextjs';

interface Props {
  facebookAccount?: FacebookAdAccount;
}

const FacbeookNewIntegration: FC<Props> = ({ facebookAccount }) => {
  const {
    businessProfile,
    userProfile,
    selectedBusiness,
    updateBusinessAdAccount,
  } = useBusinessProfileContext();

  const disconnectModalRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);

  const [facebookAccountState, setFacebookAccountState] =
    useState(facebookAccount);

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

      // required to see the facebookResponse from app.sirge

      await API.graphql(
        graphqlOperation(setFacebookUserAccess, {
          facebookAccessInput: {
            facebook_userID: userId,
            facebook_accessToken: accessToken,
          },
        }),
      );

      const fbname = await getAccountInfo(facebookResponse.accessToken);

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
      await fetch(
        `https://graph.facebook.com/v16.0/${facebookAccountState?.id}/permissions`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_token: facebookAccountState?.accessToken,
          }),
        },
      );

      await API.graphql(graphqlOperation(removeFacebookUserAccess));
      setConnectionStatus(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex py-3 mb-3 items-center justify-between border-bottom-darkgrey">
      <div className="flex">
        <FacebookIcon width={30} height={30} />
        <div className="ml-2">
          <h2 className="h5">Facebook account</h2>
          {connectionStatus === true && loading === false && (
            <span>{facebookAccountState?.name}</span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <button className="link inline-flex items-center font-medium">
          <ConnectClip />
          Connect
        </button>
      </div>
    </div>
  );
};

export default FacbeookNewIntegration;
