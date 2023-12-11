'use client';
import { getPlatformCurrencyForSelectedPlatform } from '@utils/format';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

import toolTipIcon from '@images/tooltip.svg';
import PencilEditIcon from '@assets/img/pencil-edit-icon.svg';
import Tooltip from '@components/Tooltip';
import { getAdGroupBudgetTitles } from '@utils/budget';
import { DrawerOptionProps } from '../drawer';
import { useBoundStore } from '@store/index';
interface Props {
  item: any;
  itemType: string;
  handleOpenDrawer: Dispatch<SetStateAction<DrawerOptionProps>>;
}

const AdGroupBudget = ({ item, itemType, handleOpenDrawer }: Props) => {
  const { selectedBusiness } = useBoundStore((state) => state);

  if (!item.daily_budget && !item.lifetime_budget) {
    const { mainTitle, tooltipTitle } = getAdGroupBudgetTitles(item);

    return (
      <div className="flex flex-row mb-2">
        {mainTitle}
        <Image
          className="ml-1 cursor-pointer"
          id={`${item.id}-budget-column-tooltip`}
          src={toolTipIcon}
          alt="tooltip-info"
          width={13}
          height={13}
        />
        <Tooltip
          title={tooltipTitle}
          anchorId={`${item.id}-budget-column-tooltip` as string}
        />
      </div>
    );
  }

  const currency = getPlatformCurrencyForSelectedPlatform(
    item.platform,
    selectedBusiness,
  );

  const budgetAmount = (
    item.daily_budget ?? item.lifetime_budget
  ).toLocaleString('en-US', {
    style: 'currency',
    currency: currency?.length ? currency : 'USD',
    maximumFractionDigits: 2,
  });

  return (
    <div
      className="flex flex-row items-center cursor-pointer edit-budget-container"
      onClick={() => {
        handleOpenDrawer({
          isOpen: true,
          adType: item.ad_type as string,
          adId: item.id,
          sirge_adset_id: item.sirge_adset_id,
          name: item.campaign_name,
          utm_status: item.utm_status,
          are_all_ads_connected: item.are_all_ads_connected,
          source_delivery_status: item.source_delivery_status,
          is_editing_budget: true,
          daily_budget: item.daily_budget,
          lifetime_budget: item.lifetime_budget,
          shared_budget_name: item.shared_budget_name,
        });
      }}
    >
      <div className="flex flex-col">
        <span>{budgetAmount}</span>
        <span className="text-[10px] text-textTeriraryColor">
          {item.shared_budget_name
            ? `Shared ${item.shared_budget_name}`
            : !!item.lifetime_budget
            ? 'Lifetime'
            : 'Daily'}
        </span>
      </div>

      <Image
        className="ml-1 hidden edit-budget-icon "
        src={PencilEditIcon}
        alt="edit-budget"
        width={24}
        height={24}
      />
    </div>
  );
};

export default AdGroupBudget;
