'use client';
import Image from 'next/image';
import React from 'react';
import { useBoundStore } from '@store/index';

interface Props {
  adGroup: string;
}

const AdGroupTabHeader = ({ adGroup }: Props) => {
  const icons: {
    [key: string]: {
      light: string;
      dark: string;
    };
  } = {
    Ads: {
      light: '/images/mega-phone-light.svg',
      dark: '/images/mega-phone-dark.svg',
    },
    'Ad sets': {
      light: '/images/clipboard-light.svg',
      dark: '/images/clipboard-dark.svg',
    },
    Campaigns: {
      light: '/images/briefcase-light.svg',
      dark: '/images/briefcase-dark.svg',
    },
  };
  const {
    currentPurchase,
    setCurrentPurchase,
    memberCount,
    selectedAdGroupsExplore,
    setselectedAdGroupsExplore,
    setCurrentPage,
    setLoading,
  } = useBoundStore((state) => state);

  const handleClick = async () => {
    if (currentPurchase !== adGroup) {
      setCurrentPage(0);
      setLoading(1);
    }

    setCurrentPurchase(adGroup);
    localStorage.setItem('current_purchase', adGroup);
  };

  const isActive = currentPurchase === adGroup;

  const handleDismiss = () => {
    if (adGroup === 'Ad sets') {
      setselectedAdGroupsExplore({
        ...selectedAdGroupsExplore,
        selected_ad_set_ids: [],
      });
    } else if (currentPurchase === 'Campaigns') {
      setselectedAdGroupsExplore({
        ...selectedAdGroupsExplore,
        selected_campaign_ids: [],
      });
    }
  };

  return (
    <li className="nav-item">
      <div
        onClick={handleClick}
        className={`${
          isActive && 'active'
        } cursor-pointer tab-link relative min-w-[170px] pt-4 pb-4 flex items-center justify-center font-medium text-sm text-darkGrade50 [&.active]:text-darkGrade100 `}
      >
        {isActive ? (
          <Image
            src={icons[adGroup].dark}
            width="20"
            height="20"
            alt={adGroup}
          />
        ) : (
          <Image
            src={icons[adGroup].light}
            width="20"
            height="20"
            alt={adGroup}
          />
        )}
        <span className="ml-1">{adGroup}</span>
        {adGroup === 'Ad sets' && memberCount?.adSetCount ? (
          <span>({memberCount?.adSetCount})</span>
        ) : (
          <></>
        )}
        {adGroup === 'Ads' && memberCount?.adsCount ? (
          <span>({memberCount?.adsCount})</span>
        ) : (
          <></>
        )}

        {adGroup === 'Campaigns' &&
        selectedAdGroupsExplore?.selected_campaign_ids?.length ? (
          <div className="flex flex-row items-center">
            <div
              className={` ${
                isActive
                  ? 'bg-blueLightColor text-primaryMidColor '
                  : 'bg-darkGrade25 text-darkGrade75'
              } w-5 h-5 rounded-3xl  ml-1 flex justify-center items-center text-[10px] font-semibold`}
            >
              {selectedAdGroupsExplore?.selected_campaign_ids?.length}
            </div>
            <span className="ml-1 w-5 cursor-pointer" onClick={handleDismiss}>
              <Image
                src={'/images/dismiss-light.svg'}
                width="20"
                height="20"
                alt={'dismiss'}
              />
            </span>
          </div>
        ) : (
          <></>
        )}

        {adGroup === 'Ad sets' &&
        selectedAdGroupsExplore?.selected_ad_set_ids?.length ? (
          <div className="flex flex-row items-center">
            <div
              className={` ${
                isActive
                  ? 'bg-blueLightColor text-primaryMidColor '
                  : 'bg-darkGrade25 text-darkGrade75'
              } w-5 h-5 rounded-3xl  ml-1 flex justify-center items-center text-[10px] font-semibold`}
            >
              {selectedAdGroupsExplore?.selected_ad_set_ids?.length}
            </div>
            <span className="ml-1 w-5 cursor-pointer" onClick={handleDismiss}>
              <Image
                src={'/images/dismiss-light.svg'}
                width="20"
                height="20"
                alt={'dismiss'}
              />
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

export default AdGroupTabHeader;
