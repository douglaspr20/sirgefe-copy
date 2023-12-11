'use client';
import SearchInput from '@components/SearchInput';
import React, { FC, useEffect, useState } from 'react';
import AdsTabPanel from './AdsTabPanel';
import { ItemSocialMediaIntegration } from 'API';
import { CurrentViewType } from '@components/quickSetup/ConnectExistingAds';
import { useBoundStore } from '@store/index';

interface Props {
  facebookAds: ItemSocialMediaIntegration[] | null;
  tiktokAds: ItemSocialMediaIntegration[] | null;
  googleAds: ItemSocialMediaIntegration[] | null;
  handleConnectAdsAccounts: (
    facebookAccounts: ItemSocialMediaIntegration[],
    googleAccounts: ItemSocialMediaIntegration[],
    tiktokAccounts: ItemSocialMediaIntegration[],
  ) => void;
  isSettingsPage: boolean;
  onCloseUTMModal: () => void;
  displayInModal: boolean;
  isQuickSetupPage?: boolean;
  setCurrentView?: React.Dispatch<React.SetStateAction<CurrentViewType>>;
  error?: string | null;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
}

const ConnectCampaignsModal: FC<Props> = ({
  facebookAds,
  tiktokAds,
  googleAds,
  handleConnectAdsAccounts,
  isSettingsPage,
  displayInModal,
  onCloseUTMModal,
  isQuickSetupPage = false,
  setCurrentView,
  error,
  setError,
}) => {
  const { setMainButtonAction, setShowButton } = useBoundStore.getState();

  const [searchValue, setSearchValue] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<
    'facebook' | 'tiktok' | 'google'
  >('facebook');

  useEffect(() => {
    if (facebookAds && facebookAds?.length > 0) {
      setCurrentTab('facebook');

      return;
    }
    if (tiktokAds && tiktokAds.length > 0) {
      setCurrentTab('tiktok');

      return;
    }
    if (googleAds && googleAds.length > 0) {
      setCurrentTab('google');

      return;
    }
  }, [facebookAds, googleAds, tiktokAds]);

  const [facebookAdsSelected, setFacebookAdsSelected] = useState<
    ItemSocialMediaIntegration[]
  >([]);
  const [tiktokAdsSelected, setTiktokAdsSelected] = useState<
    ItemSocialMediaIntegration[]
  >([]);
  const [googleAdsSelected, setGoogleAdsSelected] = useState<
    ItemSocialMediaIntegration[]
  >([]);

  const tabToAdsMap = {
    facebook: [facebookAdsSelected, setFacebookAdsSelected, facebookAds],
    tiktok: [tiktokAdsSelected, setTiktokAdsSelected, tiktokAds],
    google: [googleAdsSelected, setGoogleAdsSelected, googleAds],
  };

  const handleSelectedAll = () => {
    const [adsSelected, setAdsSelected, ads] = tabToAdsMap[currentTab] as [
      ItemSocialMediaIntegration[],
      React.Dispatch<React.SetStateAction<ItemSocialMediaIntegration[]>>,
      ItemSocialMediaIntegration[],
    ];

    setAdsSelected(adsSelected.length === ads?.length ? [] : ads);
  };

  const handleSelectAd = (selectedAd: ItemSocialMediaIntegration) => {
    const [adsSelected, setAdsSelected] = tabToAdsMap[currentTab] as [
      ItemSocialMediaIntegration[],
      React.Dispatch<React.SetStateAction<ItemSocialMediaIntegration[]>>,
    ];

    const adsIsSelected = adsSelected.find((ad) => ad.id === selectedAd.id);

    setAdsSelected(
      adsIsSelected
        ? adsSelected.filter((ad) => ad.id !== selectedAd.id)
        : [...adsSelected, selectedAd],
    );
  };

  useEffect(() => {
    if (isQuickSetupPage) {
      if (
        facebookAdsSelected.length === 0 &&
        googleAdsSelected.length === 0 &&
        tiktokAdsSelected.length === 0 &&
        setError
      ) {
        setMainButtonAction({
          callback: () => {
            setError('Please select at least one ad');
          },
        });
      } else {
        setMainButtonAction({
          callback: () => {
            setShowButton(false);
            handleConnectAdsAccounts(
              facebookAdsSelected,
              googleAdsSelected,
              tiktokAdsSelected,
            );
            if (setCurrentView) {
              setCurrentView('Connect all ads');
            }
          },
        });
      }
    }
  }, [
    facebookAdsSelected,
    googleAdsSelected,
    tiktokAdsSelected,
    isQuickSetupPage,
    handleConnectAdsAccounts,
    setMainButtonAction,
    setCurrentView,
    setError,
  ]);

  return (
    <div className={`${!isQuickSetupPage ? 'p-4' : 'px-3'}`}>
      <div className="flex items-center justify-between relative mb-4">
        <h2 className="h4 mb-2 flex items-center">
          {isSettingsPage
            ? 'Connect Campaigns Selectively'
            : 'Track Ads Selectively'}
        </h2>

        {!isQuickSetupPage && (
          <button
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-dismiss-circle" />
          </button>
        )}
      </div>

      <div>
        <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b border-extraLightColor pl-0 mb-4">
          {facebookAds && facebookAds?.length > 0 && (
            <li className="nav-item" role="presentation" key="tabs-facebook">
              <a
                className={`${
                  facebookAds && facebookAds?.length > 0 ? 'active' : ''
                } inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                onClick={() => setCurrentTab('facebook')}
                href="#tabs-facebook"
                id="tabs-facebook-tab"
                data-bs-toggle="pill"
                data-bs-target="#tabs-facebook"
                role="tab"
                aria-controls="tabs-facebook"
                aria-selected="true"
              >
                Facebook
              </a>
            </li>
          )}

          {tiktokAds && tiktokAds.length > 0 && (
            <li className="nav-item" role="presentation" key="tabs-tiktok">
              <a
                className={`${
                  tiktokAds &&
                  tiktokAds.length > 0 &&
                  ((facebookAds && facebookAds?.length <= 0) || !facebookAds)
                    ? 'active'
                    : ''
                }  inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                onClick={() => setCurrentTab('tiktok')}
                href="#tabs-tiktok"
                id="tabs-tiktok-tab"
                data-bs-toggle="pill"
                data-bs-target="#tabs-tiktok"
                role="tab"
                aria-controls="tabs-tiktok"
                aria-selected="true"
              >
                TikTok
              </a>
            </li>
          )}

          {googleAds && googleAds.length > 0 && (
            <li className="nav-item" role="presentation" key="tabs-google">
              <a
                className={`${
                  ((facebookAds && facebookAds?.length <= 0) || !facebookAds) &&
                  ((tiktokAds && tiktokAds?.length <= 0) || !tiktokAds)
                    ? 'active'
                    : ''
                } inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                onClick={() => setCurrentTab('google')}
                href="#tabs-google"
                id="tabs-google-tab"
                data-bs-toggle="pill"
                data-bs-target="#tabs-google"
                role="tab"
                aria-controls="tabs-google"
                aria-selected="true"
              >
                Google
              </a>
            </li>
          )}
        </ul>
      </div>

      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholder="Search Ads"
      />

      <div className="border-b border-extraLightColor">
        <label
          htmlFor="custom-checkbox"
          className="checbox-default flex my-3 items-center"
        >
          <input
            id="custom-checkbox"
            type="checkbox"
            className="w-4 h-4"
            checked={
              (currentTab === 'facebook' &&
                facebookAdsSelected.length === facebookAds?.length) ||
              (currentTab === 'tiktok' &&
                tiktokAdsSelected.length === tiktokAds?.length) ||
              (currentTab === 'google' &&
                googleAdsSelected.length === googleAds?.length)
            }
            onChange={() => handleSelectedAll()}
          />

          <span className="text-darkGrade75 font-medium leading-4 ml-2 flex">
            Select All
          </span>
        </label>
      </div>

      <div className="tab-content flex-1">
        {facebookAds && facebookAds.length > 0 && (
          <AdsTabPanel
            id="tabs-facebook"
            arrayAds={facebookAds.filter((ad) =>
              ad.name?.toLowerCase().includes(searchValue.toLowerCase()),
            )}
            arrayAdsSelected={facebookAdsSelected}
            handleSelectAd={handleSelectAd}
            searchValue={searchValue}
            firstActive={facebookAds.length > 0}
          />
        )}

        {tiktokAds && tiktokAds.length > 0 && (
          <AdsTabPanel
            id="tabs-tiktok"
            arrayAds={tiktokAds.filter((ad) =>
              ad.name?.toLowerCase().includes(searchValue.toLowerCase()),
            )}
            arrayAdsSelected={tiktokAdsSelected}
            handleSelectAd={handleSelectAd}
            searchValue={searchValue}
            firstActive={
              !!(
                tiktokAds &&
                tiktokAds.length > 0 &&
                ((facebookAds && facebookAds?.length <= 0) || !facebookAds)
              )
            }
          />
        )}

        {googleAds && googleAds.length > 0 && (
          <AdsTabPanel
            id="tabs-google"
            arrayAds={googleAds.filter((ad) =>
              ad.name?.toLowerCase().includes(searchValue.toLowerCase()),
            )}
            arrayAdsSelected={googleAdsSelected}
            handleSelectAd={handleSelectAd}
            searchValue={searchValue}
            firstActive={
              !!(
                ((facebookAds && facebookAds?.length <= 0) || !facebookAds) &&
                ((tiktokAds && tiktokAds?.length <= 0) || !tiktokAds)
              )
            }
          />
        )}
      </div>

      <div className="flex border-t border-extraLightColor pt-3 mb-4">
        {facebookAds && facebookAds.length > 0 && (
          <div className="flex flex-col mr-4">
            <span className="text-darkGrade75 font-medium">Facebook</span>
            <span className="text-darkGrade50 text-[12px]">
              {facebookAdsSelected.length} / {facebookAds.length}
            </span>
          </div>
        )}

        {tiktokAds && tiktokAds.length > 0 && (
          <div className="flex flex-col mr-4">
            <span className="text-darkGrade75 font-medium">TikTok</span>
            <span className="text-darkGrade50 text-[12px]">
              {tiktokAdsSelected.length} / {tiktokAds.length}
            </span>
          </div>
        )}

        {googleAds && googleAds.length > 0 && (
          <div className="flex flex-col mr-4">
            <span className="text-darkGrade75 font-medium">Google</span>
            <span className="text-darkGrade50 text-[12px]">
              {googleAdsSelected.length} / {googleAds.length}
            </span>
          </div>
        )}
      </div>

      {error && <p className="text-warningColor text-xs">{error}</p>}

      {!isQuickSetupPage && (
        <div className="flex ">
          <button
            type="button"
            className="ml-auto btn light mr-2"
            data-bs-dismiss="modal"
            onClick={() => {
              if (displayInModal) onCloseUTMModal();
            }}
          >
            Decline
          </button>

          <button
            className="btn"
            data-bs-dismiss="modal"
            onClick={() =>
              handleConnectAdsAccounts(
                facebookAdsSelected,
                googleAdsSelected,
                tiktokAdsSelected,
              )
            }
          >
            Connect Tracking Script
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectCampaignsModal;
