import Image from 'next/image';
import Link from 'next/link';

import AdAccountModal from './ad-account-modal';

import TailwindModal from '_components/modals/TailwindModal';
import WariningIcon from '@assets/img/warning-icon.svg';
import { API, graphqlOperation } from 'aws-amplify';
import { getFacebookAdAccounts, getUserTiktokAds } from '@graphql/queries';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { removeSocialAdAccount, setSocialAdAccount } from '@graphql/mutations';
import Message from '_components/modals/tailwindTypes/Message';
import { Business } from '@sirge-io/sirge-types';
import { useAsyncDataFetchContext } from '@providers/asyncDatafetchProvider';
import Popover from '_components/Popover';
import { usePopper } from 'react-popper';
import { useBoundStore } from '@store/index';

type ConnectionTabProps = {
  userRole: number;
  business: Business;
  tik_tok_integration: boolean;
  fb_integration: string;
  tik_tok_ad_account_id: string;
  tik_tok_ad_account_name: string;
  tik_tok_access_token: string;
  facebook_ad_account_id: string;
  facebook_ad_account_name: string;
  setFacebookConnected: Dispatch<SetStateAction<boolean>>;
  setTiktokConnected: Dispatch<SetStateAction<boolean>>;
  updateBusinessAdAccount: (businessId: string, dataToUpdate: Business) => void;
};

const ConnectionTab: React.FunctionComponent<ConnectionTabProps> = ({
  userRole,
  business,
  tik_tok_integration,
  fb_integration,
  tik_tok_ad_account_id,
  tik_tok_ad_account_name,
  tik_tok_access_token,
  updateBusinessAdAccount,
  facebook_ad_account_id,
  facebook_ad_account_name,
  setFacebookConnected,
  setTiktokConnected,
}) => {
  const [accountType, setAccountType] = useState<string>('');
  const [selectedAd, setSelectedAd] = useState<string>();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [loadingAds, setLoadingAds] = useState<boolean>(false);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [displayFbPopover, setDisplayFbPopover] = useState<boolean>(false);
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);

  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
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

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const { triggerFetch } = useAsyncDataFetchContext();
  const { selectedBusiness, dialogOptions, setDialogOptions } =
    useBoundStore.getState();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {});

  const getUserAds = async (type: string) => {
    setLoadingAds(true);
    if (type === 'tiktok') {
      setAccountType(type);
      const response: any = await API.graphql(
        graphqlOperation(getUserTiktokAds, {
          getUserTiktokAdsInput: {
            tik_tok_access_token: tik_tok_access_token,
            business_id: selectedBusiness?.id,
          },
        }),
      );

      debugger;

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
            business_id: 'c6747b88-3ca2-40a3-95c1-e8e2fe20fd89',
          },
        }),
      );

      debugger;

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
      graphqlOperation(setSocialAdAccount, {
        setSocialAdAccountInput: {
          business_id: selectedBusiness?.id,
          platform: 'tiktok',
          ad_account_id: fintAdAccount?.advertiser_id,
        },
      }),
    );

    const data = response.data.setTiktokAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: data.message,
      });

      updateBusinessAdAccount(business.business_id, {
        ...business,
        tik_tok_ad_account_id: fintAdAccount?.advertiser_id,
        tik_tok_ad_account_name: fintAdAccount?.advertiser_name,
      });

      triggerFetch(business.business_id);

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
   * Disconnect Tiktok
   */
  const disconnectTiktokAdAccount = async () => {
    setIsSending(true);

    const response: any = await API.graphql(
      graphqlOperation(removeSocialAdAccount, {
        removeSocialAdAccountInput: {
          business_id: selectedBusiness?.id,
          platform: 'tiktok',
        },
      }),
    );

    const data = response.data.disconnectBusinessTiktok;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: data.message,
      });

      updateBusinessAdAccount(business.business_id, {
        ...business,
        tik_tok_ad_account_id: '',
        tik_tok_ad_account_name: '',
        tik_tok_ad_account_timezone: '',
      });
      setTiktokConnected(false);
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
      graphqlOperation(setSocialAdAccount, {
        setSocialAdAccountInput: {
          business_id: selectedBusiness?.id,
          platform: 'facebook',
          ad_account_id: fintAdAccount?.id,
        },
      }),
    );

    debugger;

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

      triggerFetch(business.business_id);

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

  /**
   * Disconnect Facebook
   */
  const disconnectFacebookAdAccount = async () => {
    setIsSending(true);

    const response: any = await API.graphql(
      graphqlOperation(removeSocialAdAccount, {
        removeSocialAdAccountInput: {
          business_id: selectedBusiness?.id,
          platform: 'facebook',
        },
      }),
    );

    const data = response.data.removeFacebookAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: data.message,
      });

      updateBusinessAdAccount(business.business_id, {
        ...business,
        facebook_ad_account_currency: '',
        facebook_ad_account_id: '',
        facebook_ad_account_name: '',
      });

      setFacebookConnected(false);
    } else {
      setDialogOptions({
        type: 'error',
        message: data.error.message,
      });
    }

    responseModalButtonRef.current?.click();

    setIsSending(false);
  };

  return (
    <>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3 border rounded px-[18px] py-4 border-extraLightColor">
          <div className="inline-flex">
            <div className="inline-flex flex-col">
              <span className="inline-flex items-center font-semibold">
                Facebook ad Account
                {fb_integration === 'true' && facebook_ad_account_id ? (
                  <span className="inline-flex shrink-0 ml-1">
                    <i className="icon-checkmark-circle text-greenDefault text-sm"></i>
                  </span>
                ) : (
                  <div className="flex">
                    <div className="relative mt-1">
                      <span
                        className="inline-flex shrink-0 w-[14px] h-[14px] ml-1"
                        onMouseEnter={() => setDisplayFbPopover(true)}
                        onMouseLeave={() => setDisplayFbPopover(false)}
                        ref={setReferenceElement}
                      >
                        <Image src={WariningIcon} alt="warning" />
                      </span>

                      <div
                        ref={setPopperElement}
                        className={`${
                          displayFbPopover
                            ? 'popover visible'
                            : 'popover visually-hidden'
                        }`}
                        style={{
                          ...styles.popper,
                          width: '200px',
                          top: '-95px',
                        }}
                        {...attributes.popper}
                      >
                        <Popover
                          title={'Account Disconnected'}
                          content={`Please Connect It Again To Continue Tracking`}
                          customClassPopoverBody={{ padding: 0 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </span>
              <span>
                {fb_integration === 'true' && facebook_ad_account_name
                  ? facebook_ad_account_name
                  : ''}
              </span>
            </div>
          </div>
          <div>
            {fb_integration === 'true' &&
              (facebook_ad_account_id ? (
                <button
                  className="text-darkGrade50 hover:text-darkGrade75 inline-flex items-center font-medium"
                  onClick={disconnectFacebookAdAccount}
                >
                  <i className="icon-dismiss text-xl mr-2"></i> Disconnect ad
                  account
                </button>
              ) : (
                <button
                  className="link inline-flex items-center font-medium"
                  data-bs-toggle="modal"
                  data-bs-target="#addListModal"
                  onClick={() => getUserAds('fb')}
                >
                  <i className="icon-connect text-xl mr-2"></i> Select ad
                  account
                </button>
              ))}

            {fb_integration === 'false' &&
              (userRole === 1 ? (
                <Link
                  href={'/settings/integrations'}
                  className="link inline-flex items-center font-medium"
                >
                  Integrate
                </Link>
              ) : (
                <span className="text-darkGrade50 hover:text-darkGrade75 inline-flex items-center font-medium ">
                  Contact Manager
                </span>
              ))}

            {fb_integration === 'expired' &&
              (userRole === 1 ? (
                <Link
                  href={'/settings/integrations'}
                  className="link inline-flex items-center font-medium"
                >
                  Integrate
                </Link>
              ) : (
                <span className="text-darkGrade50 hover:text-darkGrade75 inline-flex items-center font-medium ">
                  Contact Manager
                </span>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-between mb-3 border rounded px-[18px] py-4 border-extraLightColor">
          <div className="inline-flex">
            <div className="inline-flex flex-col">
              <span className="inline-flex items-center font-semibold">
                TikTok
                {tik_tok_integration && tik_tok_ad_account_id ? (
                  <span className="inline-flex shrink-0 ml-1">
                    <i className="icon-checkmark-circle text-greenDefault text-sm"></i>
                  </span>
                ) : (
                  <div className="flex">
                    <div className="relative mt-1">
                      <div>
                        <span
                          className="inline-flex shrink-0 w-[14px] h-[14px] ml-1"
                          onMouseEnter={() => setDisplayPopover(true)}
                          onMouseLeave={() => setDisplayPopover(false)}
                          ref={setReferenceElement}
                        >
                          <Image src={WariningIcon} alt="warning" />
                        </span>
                      </div>

                      <div
                        ref={setPopperElement}
                        className={`${
                          displayPopover
                            ? 'popover visible'
                            : 'popover visually-hidden'
                        }`}
                        style={{
                          ...styles.popper,
                          width: '200px',
                          top: '-95px',
                        }}
                        {...attributes.popper}
                      >
                        <Popover
                          title={'Account Disconnected'}
                          content={`Please Connect It Again To Continue Tracking`}
                          customClassPopoverBody={{ padding: 0 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </span>
              {tik_tok_integration && tik_tok_ad_account_id && (
                <span>{tik_tok_ad_account_name}</span>
              )}
            </div>
          </div>
          <div>
            {!tik_tok_integration ? (
              userRole === 1 ? (
                <Link
                  href={'/settings/integrations'}
                  className="link inline-flex items-center font-medium"
                >
                  Integrate
                </Link>
              ) : (
                <span className="text-darkGrade50 hover:text-darkGrade75 inline-flex items-center font-medium">
                  Contact Manager
                </span>
              )
            ) : tik_tok_ad_account_id ? (
              <button
                className="text-darkGrade50 hover:text-darkGrade75 inline-flex items-center font-medium"
                onClick={() => disconnectTiktokAdAccount()}
              >
                <i className="icon-dismiss text-xl mr-2"></i> Disconnect Ad
                Account
              </button>
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

export default ConnectionTab;
