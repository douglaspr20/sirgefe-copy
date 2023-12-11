import { SetStateAction } from 'react';
import * as Sentry from '@sentry/nextjs';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { setUtmValuesSocialCampaign } from '@graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { capitalizeFirstWord } from './format';

type DialogOptions = {
  type: ValidTypeMessages;
  message: string;
  description?: string;
};

type Props = {
  currentPurchase: string;
  id: string;
  business_id: string;
  refreshData: () => void;
  dismissSuccessModalButtonRef: any;
  setDialogOptions: React.Dispatch<SetStateAction<DialogOptions>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
};

const getItemType = (currentPurchase: string, id: string) => {
  if (currentPurchase === 'Ads') {
    return { adId: id, itemType: 'ads' };
  }

  if (currentPurchase === 'Ad sets') {
    return { adsetId: id, itemType: 'adSets' };
  }

  if (currentPurchase === 'Campaigns') {
    return { campaignId: id, itemType: 'campaigns' };
  }
};

export const handleAccountType = (platform: string, props: Props) => {
  if (platform === 'facebook') {
    connectFbUtm(props);
  } else if (platform === 'tiktok') {
    connectTiktokUtm(props);
  } else {
    connectGoogleUtm(props);
  }
};

export const connectTiktokUtm = async (props: Props) => {
  try {
    const response: any = await API.graphql(
      graphqlOperation(setUtmValuesSocialCampaign, {
        setUtmValuesSocialCampaignInput: {
          ...getItemType(props.currentPurchase, props.id),
          businessId: props.business_id,
          source: 'tiktok',
        },
      }),
    );

    const data = response.data?.setUtmValuesSocialCampaign;

    if (data.error) {
      throw new Error(data.error.message);
    }

    props.refreshData();

    handleResponse('success', data.message as string, props.setDialogOptions);
  } catch (error: any) {
    handleResponse(
      'error',
      errorMessage('TikTok'),
      props.setDialogOptions,
      errorDescription('TikTok'),
    );
    Sentry.captureException(error);
  } finally {
    props.setLoading(false);
    props.dismissSuccessModalButtonRef.current?.click();
  }
};

export const connectFbUtm = async (props: Props) => {
  try {
    const response: any = await API.graphql(
      graphqlOperation(setUtmValuesSocialCampaign, {
        setUtmValuesSocialCampaignInput: {
          ...getItemType(props.currentPurchase, props.id),
          businessId: props.business_id,
          source: 'facebook',
        },
      }),
    );

    const data = response.data?.setUtmValuesSocialCampaign;

    if (data?.data?.adsFailed && data?.data?.adsFailed?.length > 0) {
      if (
        data?.adsFailed.some((adFailed: { ad: string; error: string }) =>
          adFailed.error.includes('Error validating access token'),
        )
      ) {
        handleResponse(
          'error',
          errorMessage('facebook'),
          props.setDialogOptions,
          errorDescription('facebook'),
        );
      } else {
        handleResponse(
          'error',
          'Error trying to set utm values',
          props.setDialogOptions,
          `${capitalizeFirstWord(data.message)}. \n\n Total ads connected: ${
            data?.data?.adsConnected?.length
          } \n Total ads failed: ${data?.data?.adsFailed?.length}`,
        );
      }

      return;
    }

    if (data?.error) {
      throw new Error(data.error.message);
    }

    handleResponse('success', data.message as string, props.setDialogOptions);

    props.refreshData();
  } catch (error: any) {
    handleResponse(
      'error',
      errorMessage('Facebook'),
      props.setDialogOptions,
      errorDescription('Facebook'),
    );

    Sentry.captureException(error);
  } finally {
    props.setLoading(false);
    props.dismissSuccessModalButtonRef.current?.click();
  }
};

export const connectGoogleUtm = async (props: Props) => {
  try {
    const response: any = await API.graphql(
      graphqlOperation(setUtmValuesSocialCampaign, {
        setUtmValuesSocialCampaignInput: {
          ...getItemType(props.currentPurchase, props.id),
          businessId: props.business_id,
          source: 'google',
        },
      }),
    );

    const data = response.data?.setUtmValuesSocialCampaign;

    if (data.error) {
      throw new Error(data.error.message);
    }

    handleResponse('success', data.message as string, props.setDialogOptions);

    props.refreshData();
  } catch (error: any) {
    handleResponse(
      'error',
      errorMessage('Google'),
      props.setDialogOptions,
      errorDescription('Google'),
    );

    Sentry.captureException(error);
  } finally {
    props.setLoading(false);
    props.dismissSuccessModalButtonRef.current?.click();
  }
};

const handleResponse = (
  type: ValidTypeMessages,
  message: string,
  setDialogOptions: React.Dispatch<SetStateAction<DialogOptions>>,
  description?: string,
) => {
  setDialogOptions({
    type,
    message,
    description,
  });
};

const errorMessage = (account: string) => `Error with your ${account} account`;

const errorDescription = (account: string) =>
  `It seems that something is disconnected or not working correctly, please go to the connections page and check the connection with your ${account} account`;
