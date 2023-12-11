'use client';
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react';
import { MarketingPlatforms } from '@enums/marketingPlatforms';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Filter from '@components/performance/filter';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import Calendar from '@components/Calendar';
import dayjs from 'dayjs';
import AdGroupTabHeader from '@components/performance/AdGroupTabHeader';
import RefreshDataButton from '@components/RefreshDataButton';
import TailwindModal from '@components/modals/TailwindModal';
import PlatformDataToggle from '@components/performance/PlatformDataToggle';
import TrackingSetup from '@components/quickSetup/TrackingSetup';
import { useBoundStore } from '@store/index';

type PerformanceProps = {
  children: ReactNode;
  FilterProps: (data: any) => void;
  isRoasGoalsSet: boolean;
  setIsRoasGoalsSet: Dispatch<SetStateAction<boolean>>;
  refreshData: (id?: string, name?: string, adType?: string) => Promise<void>;
};

const PerformanceComponent = (props: PerformanceProps) => {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [refetchAds, setRefetchAds] = useState<boolean>(false);
  const connectUTMsButtonRef = useRef<HTMLButtonElement | null>(null);
  const [showNewPerformance, setShowNewPerformance] = useState<boolean>(false);

  const {
    setCurrentPurchase,
    currentPlatform,
    setCurrentPlatform,
    currentSelectedDateValue,
    setCurrentSelectedDateValue,
    setCurrentPage,
    setselectedAdGroupsExplore,
    setAdSetsSelected,
    faceBookToggle,
    setFaceBookToggle,
    setLoading,
    activeFilterCount,
    setActiveFilterCount,
    facebookConnected,
    tiktokConnected,
    googleConnected,
    selectedBusiness,
    userProfile,
    businessProfile,
  } = useBoundStore((state) => state);

  const [showTutorialModal, setShowTutorialModal] = useState(false);

  const handlechange = (e: any) => {
    const platformSelected =
      e.target.id === 'Facebook'
        ? 'facebook'
        : e.target.id === 'TikTok'
        ? 'tik_tok'
        : e.target.id === 'Google'
        ? 'google'
        : 'All Platforms';

    if (currentPlatform !== platformSelected) setLoading(1);

    setCurrentPlatform(platformSelected as MarketingPlatforms);
    localStorage.setItem('current_platform', platformSelected);

    if (platformSelected === 'All Platforms') {
      setFaceBookToggle(false);
    }
    setselectedAdGroupsExplore({
      selected_campaign_ids: [],
      selected_ad_set_ids: [],
    });
    setAdSetsSelected([]);
  };

  const handleValueChange = (newValue: DateValueType) => {
    if (newValue?.startDate && newValue.endDate) {
      setCurrentSelectedDateValue({
        startDate: dayjs(newValue.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(newValue.endDate).format('YYYY-MM-DD'),
      });
    } else {
      setCurrentSelectedDateValue(null);
    }
  };

  const handleTogglechange = (e: { target: any }) => {
    setFaceBookToggle(e.target.checked);
  };

  const handleConnectUTMsModal = () => {
    connectUTMsButtonRef.current?.click();
  };

  useEffect(() => {
    if (
      localStorage.getItem('use_new_performance_page') === 'true' &&
      process.env.NEXT_PUBLIC_SHOW_NEW_PERFORMANCE === 'show'
    ) {
      handleTryNewPerformancePage();
    }
  }, []);

  const handleTryNewPerformancePage = () => {
    router.push(`/${selectedBusiness?.vanity_name}/performance/new`);
    setShowNewPerformance(true);

    localStorage.setItem('use_new_performance_page', 'true');
  };

  return (
    <>
      {selectedBusiness && (
        <div className="absolute right-4 top-44">
          <RefreshDataButton business_id={selectedBusiness?.id} />
        </div>
      )}
      <div className={`flex flex-col overflow-x-hidden`}>
        <div className="px-8 py-8">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-7">
              <div className="flex flex-row items-center">
                <h2 className="h2 flex items-center">Performance</h2>

                {process.env.NEXT_PUBLIC_SHOW_NEW_PERFORMANCE === 'show' ? (
                  <div className="flex items-center justify-between ml-3">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={showNewPerformance}
                        onChange={handleTryNewPerformancePage}
                      />
                      <span className="slider"></span>
                    </label>
                    <div className="font-medium text-darkGrade50 ml-2">
                      Try the new performance page!
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="inline-flex items-center">
                {facebookConnected || tiktokConnected || googleConnected ? (
                  <button
                    className="btn items-center inline-flex"
                    data-bs-toggle="modal"
                    data-bs-target="#connectAllUTMsModal"
                    ref={connectUTMsButtonRef}
                    onClick={() => setRefetchAds(true)}
                  >
                    Connect all UTMs
                  </button>
                ) : (
                  <></>
                )}

                {/* <button
                  className="btn ml-4 items-center inline-flex"
                  data-bs-toggle="modal"
                  data-bs-target="#generateUTMModal"
                >
                  <i className="mr-1 icon-connect text-xl"></i>Generate UTM
                </button>

                <GenerateUtmModal
                  business_id={businessProfile?.profile?.business_id as string}
                  shopify_store_url={
                    businessProfile.profile?.shopify_store_url || ''
                  }
                  isExistingFacebookCampaigns={false}
                /> */}
              </div>
            </div>
            <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b border-extraLightColor pl-0 mb-4">
              <li
                className="nav-item"
                role="presentation"
                key="tabs-all-platform"
              >
                <span
                  id="all"
                  className={`cursor-pointer ${
                    currentPlatform === MarketingPlatforms.ALLPLATFORMS &&
                    'active'
                  } inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                  onClick={handlechange}
                >
                  {MarketingPlatforms.ALLPLATFORMS}
                </span>
              </li>
              <li className="nav-item" role="presentation" key="tabs-facebook">
                <span
                  onClick={handlechange}
                  id="Facebook"
                  className={`cursor-pointer ${
                    currentPlatform === MarketingPlatforms.FACEBOOK && 'active'
                  } inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                >
                  Facebook
                </span>
              </li>
              <li className="nav-item" role="presentation" key="tabs-tiktok">
                <span
                  onClick={handlechange}
                  id="TikTok"
                  className={`cursor-pointer ${
                    currentPlatform === MarketingPlatforms.TIKTOK && 'active'
                  } inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                >
                  TikTok
                </span>
              </li>

              {process.env.NEXT_PUBLIC_SHOW_GOOGLE_INTEGRATION === 'show' && (
                <li className="nav-item" role="presentation" key="tabs-google">
                  <span
                    onClick={handlechange}
                    id="Google"
                    className={`cursor-pointer ${
                      currentPlatform === MarketingPlatforms.GOOGLE && 'active'
                    } inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                  >
                    Google
                  </span>
                </li>
              )}
            </ul>
            <div className="relative widget-container p-5 max-h-full flex flex-col min-h-[33rem] mb-8">
              <div className="flex justify-between items-center">
                <ul className="nav nav-tabs grid grid-cols-3 capitalize">
                  <AdGroupTabHeader adGroup={'Campaigns'} />
                  <AdGroupTabHeader adGroup={'Ad sets'} />
                  <AdGroupTabHeader adGroup={'Ads'} />
                </ul>
                <div className="inline-flex items-center relative">
                  <div className="mycalendar relative pr-4 mr-4 first:pl-0 last:pr-0 after:content-[''] after:block after:absolute after:h-6 after:-right-1 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
                    <Calendar
                      timezone={
                        selectedBusiness?.store?.timezone || 'America/Chicago'
                      }
                      value={currentSelectedDateValue}
                      onChange={handleValueChange}
                    />
                  </div>

                  <PlatformDataToggle
                    tiktokConnected={tiktokConnected}
                    facebookConnected={facebookConnected}
                    googleConnected={googleConnected}
                    onChange={handleTogglechange}
                    checked={faceBookToggle}
                    currentPlatform={currentPlatform}
                  />

                  <Filter
                    setCurrentPage={setCurrentPage}
                    FilterProps={props.FilterProps}
                    isRoasGoalsSet={props.isRoasGoalsSet}
                    businessId={selectedBusiness?.id as string}
                    setIsRoasGoalsSet={props.setIsRoasGoalsSet}
                    activeFilterCount={activeFilterCount}
                    setActiveFilterCount={setActiveFilterCount}
                  />
                </div>
              </div>
              {props.children}
            </div>
          </div>
        </div>
      </div>
      <TailwindModal setShowDialog={setShowTutorialModal} id="videoModal">
        {showTutorialModal && (
          <div>
            <div className="modal-header flex flex-shrink-0 items-center justify-between px-4 mt-5 mb-[7px] ">
              <h3 className="h3">Tutorial</h3>
              <button
                type="button"
                className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-dismiss-circle"></i>
              </button>
            </div>
            <div className="p-4 pt-0">
              <iframe
                width="468"
                height="315"
                src="https://www.youtube.com/embed/rCqCkJwRri8"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </TailwindModal>

      <TrackingSetup
        isConnecting={isConnecting}
        setIsConnecting={setIsConnecting}
        displayInModal
        handleConnectUTMsModal={handleConnectUTMsModal}
        refetchAds={refetchAds}
        setRefetchAds={setRefetchAds}
        refreshData={props.refreshData}
        onboardingPath={`/${selectedBusiness?.vanity_name}/home`}
      />
    </>
  );
};

export default PerformanceComponent;
