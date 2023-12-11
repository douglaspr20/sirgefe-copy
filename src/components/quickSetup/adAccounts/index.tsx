import TailwindModal from '@components/modals/TailwindModal';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import AdAccountModal from '@components/settings/connections/ad-account-modal';
import { setFacebookAdAccount, setTiktokAdAccount } from '@graphql/mutations';
import { getFacebookAdAccounts, getUserTiktokAds } from '@graphql/queries';
import { QuickFlowStep } from '@components/quick-setup/app/QuickSetup';
import { useAsyncDataFetchContext } from '@providers/asyncDatafetchProvider';
import { useBusinessConnectionsContext } from '@providers/businessConnectionsProvider';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { Business } from '@sirge-io/sirge-types';
import { API, graphqlOperation } from 'aws-amplify';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Props {
  onSkip: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<QuickFlowStep>>;
}
const QuickSetupAdAccounts = ({ onSkip, setCurrentStep }: Props) => {
  const { userProfile, selectedBusiness, updateBusinessAdAccount } =
    useBusinessProfileContext();
  const { triggerFetch } = useAsyncDataFetchContext();

  const business = selectedBusiness as Business;

  const {
    setFacebookConnected,
    setTiktokConnected,
    tik_tok_ad_account_id,
    tik_tok_ad_account_name,
    facebook_ad_account_id,
    facebook_ad_account_name,
  } = useBusinessConnectionsContext();
  const [accountType, setAccountType] = useState<string>('');
  const [selectedAd, setSelectedAd] = useState<string>();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [loadingAds, setLoadingAds] = useState<boolean>(false);
  const [facebookAds, serFacebookAds] = useState<
    {
      id: string;
      name: string;
      currency: string;
    }[]
  >([]);
  const [tiktokAds, setTiktokAds] = useState<
    {
      advertiser_id: string;
      advertiser_name: string;
    }[]
  >([]);

  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: 'Business updated',
  });

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const getUserAds = async (type: string) => {
    setLoadingAds(true);
    if (type === 'tiktok') {
      setAccountType(type);
      const response: any = await API.graphql(
        graphqlOperation(getUserTiktokAds, {
          getUserTiktokAdsInput: {
            tik_tok_access_token: selectedBusiness?.tik_tok_access_token,
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      const tiktokAds = response.data.getUserTiktokAds;

      if (tiktokAds.error) {
        setDialogOptions({
          message: tiktokAds.error.message,
          type: 'error',
        });
        responseModalButtonRef.current?.click();

        return;
      }

      if (tiktokAds.data.length > 0) {
        setSelectedAd(tiktokAds.data[0].advertiser_id);
        setTiktokAds(tiktokAds.data);
      }
    }

    if (type === 'fb') {
      setAccountType(type);
      const response: any = await API.graphql(
        graphqlOperation(getFacebookAdAccounts, {
          getFacebookAdAccountsInput: {
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      const facebookAdAccounts = response.data.getFacebookAdAccounts;

      if (facebookAdAccounts.error) {
        setDialogOptions({
          message: facebookAdAccounts.error.message,
          type: 'error',
        });
        responseModalButtonRef.current?.click();

        return;
      }

      if (facebookAdAccounts.data.length > 0) {
        setSelectedAd(facebookAdAccounts.data[0].id);
        serFacebookAds(facebookAdAccounts.data);
      }
    }

    setLoadingAds(false);
  };

  /**
   * Connect Tiktok
   */
  const connectTiktokAdAccount = async () => {
    setIsSending(true);
    const fintAdAccount = tiktokAds.find(
      (item) => item.advertiser_id === selectedAd,
    );

    const response: any = await API.graphql(
      graphqlOperation(setTiktokAdAccount, {
        setTiktokAdAccountInput: {
          business_id: business?.business_id,
          tik_tok_ad_account_id: fintAdAccount?.advertiser_id,
          tik_tok_ad_account_name: fintAdAccount?.advertiser_name,
        },
      }),
    );

    const data = response.data.setTiktokAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: data.message,
      });

      updateBusinessAdAccount(business?.business_id, {
        ...business,
        tik_tok_ad_account_id: fintAdAccount?.advertiser_id,
        tik_tok_ad_account_name: fintAdAccount?.advertiser_name,
      });
      setTiktokConnected(true);
    } else {
      setDialogOptions({
        type: 'error',
        message: data.error.message,
      });
    }

    responseModalButtonRef.current?.click();

    setIsSending(false);
  };

  /**
   * Connect Facebook
   */
  const connectFacebookAdAccount = async () => {
    setIsSending(true);
    const fintAdAccount = facebookAds.find((item) => item.id === selectedAd);

    const response: any = await API.graphql(
      graphqlOperation(setFacebookAdAccount, {
        setFacebookAdAccountInput: {
          business_id: business.business_id,
          facebook_ad_account_currency: fintAdAccount?.currency,
          facebook_ad_account_id: fintAdAccount?.id,
          facebook_ad_account_name: fintAdAccount?.name,
        },
      }),
    );

    const data = response.data.setFacebookAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: data.message,
      });

      updateBusinessAdAccount(business.business_id, {
        ...business,
        facebook_ad_account_currency: fintAdAccount?.currency,
        facebook_ad_account_id: fintAdAccount?.id,
        facebook_ad_account_name: fintAdAccount?.name,
      });

      setFacebookConnected(true);
    } else {
      setDialogOptions({
        type: 'error',
        message: data.error.message,
      });
    }

    responseModalButtonRef.current?.click();

    setIsSending(false);
  };

  const applyAndStart = () => {
    triggerFetch(selectedBusiness?.business_id as string);
    // setCurrentStep('welcome');
  };

  return (
    <>
      <h3 className="text-base font-bold">Ad accounts</h3>
      <span className="text-textTeriraryColor font-normal text-xs">
        Connect your ad accounts
      </span>

      <div>
        <div className="flex items-center justify-between mb-3 border rounded px-[18px] py-4 border-extraLightColor mt-4">
          <div className="flex flex-row items-center">
            <div className="inline-flex flex-col">
              <span className="inline-flex items-center font-semibold">
                Facebook Ad Account
              </span>
              {facebook_ad_account_name && (
                <span>{facebook_ad_account_name}</span>
              )}
            </div>
          </div>
          <div>
            {facebook_ad_account_id ? (
              <div className="inline-flex  bg-greenBgColor text-greenDefault items-center text-xs font-medium rounded-3xl py-[2px] px-[6px]">
                Connected
              </div>
            ) : (
              <button
                className="link inline-flex items-center font-medium"
                data-bs-toggle="modal"
                data-bs-target="#addListModal"
                onClick={() => getUserAds('fb')}
              >
                <i className="icon-connect text-xl mr-2"></i> Select ad Account
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mb-3 border rounded px-[18px] py-4 border-extraLightColor mt-4">
          <div className="flex flex-row items-center">
            <div className="inline-flex flex-col">
              <span className="inline-flex items-center font-semibold">
                TikTok
              </span>
              {selectedBusiness?.tik_tok_integration &&
                tik_tok_ad_account_id && <span>{tik_tok_ad_account_name}</span>}
            </div>
          </div>
          <div>
            {selectedBusiness?.tik_tok_integration ? (
              <div className="inline-flex  bg-greenBgColor text-greenDefault items-center text-xs font-medium rounded-3xl py-[2px] px-[6px]">
                Connected
              </div>
            ) : (
              <button
                className="link inline-flex items-center font-medium"
                data-bs-toggle="modal"
                data-bs-target="#addListModal"
                onClick={() => getUserAds('tiktok')}
              >
                <i className="icon-connect text-xl mr-2"></i> Select ad Account
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-right">
        <button
          onClick={onSkip}
          className=" w-[126px] border border-extraLightColor bg-white text-primaryColor text-sm font-semibold box-border py-[10px] rounded-md mr-3"
        >
          Skip
        </button>
        <button
          disabled={
            !selectedBusiness?.tik_tok_integration ||
            !selectedBusiness?.facebook_userID
          }
          onClick={applyAndStart}
          className="btn w-[126px] text-white text-sm font-semibold py-[10px] rounded-md"
        >
          Apply & Start
        </button>
      </div>
      <TailwindModal id="addListModal">
        <AdAccountModal
          title={accountType === 'fb' ? 'Facebook' : 'Tik tok'}
          type={accountType}
          tiktokAds={tiktokAds}
          facebookAds={facebookAds}
          selectedAd={selectedAd as string}
          isSending={isSending}
          loadingAds={loadingAds}
          setSelectedAd={setSelectedAd}
          connectTiktokAdAccount={connectTiktokAdAccount}
          connectFacebookAdAccount={connectFacebookAdAccount}
        />
      </TailwindModal>

      <TailwindModal id="successModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successModal"
        ref={responseModalButtonRef}
      />
    </>
  );
};

export default QuickSetupAdAccounts;
