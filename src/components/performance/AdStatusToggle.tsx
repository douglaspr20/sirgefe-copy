import React, { useEffect, useState } from 'react';
import {
  AdLevelTypes,
  AdStatusUpdate,
  MarketingSources,
  Performance,
} from '@sirge-io/sirge-types';
import { DrawerBasicInfo } from './drawer';
import { modifyAdLevelLabel } from '@utils/format';
import { useBoundStore } from '@store/index';

interface Props {
  index?: number | string;
  item: (Performance & { id: string }) | DrawerBasicInfo;
  isStatusUpdated: string;
  setOpenModal?: (data: any) => void;
  setTableDataindex?: (data: any) => void;
  onChange?: () => void;
  isTable?: boolean;
  reminderStatus: boolean;
  updateAdStatus?: (
    id: string,
    adType: AdLevelTypes,
    status: AdStatusUpdate,
    source: MarketingSources,
    reminderStatus: boolean,
  ) => Promise<void>;
}
const AdStatusToggle = ({
  index,
  item,
  isStatusUpdated,
  setOpenModal,
  setTableDataindex,
  isTable = true,
  onChange,
  reminderStatus,
  updateAdStatus,
}: Props) => {
  const { currentPurchase, setSelectedBusiness } = useBoundStore.getState();

  const [adStatus, setAdStatus] = useState<boolean>(
    !item?.source_delivery_status ||
      item?.source_delivery_status === 'Error' ||
      item?.source_delivery_status?.toLowerCase() !== 'active'
      ? false
      : true,
  );

  const handleChange = () => {
    // Define a type guard to check if item has the property 'platform'
    const isPerformanceItem = (
      object: any,
    ): object is Performance & { id: string } => {
      return 'platform' in object;
    };

    const status =
      item?.source_delivery_status?.toLowerCase() === 'active'
        ? AdStatusUpdate?.DISABLE
        : AdStatusUpdate?.ENABLE;

    if (onChange) {
      return onChange();
    }

    if (index && setTableDataindex) {
      setTableDataindex(index);
    }

    const source: MarketingSources | undefined = isPerformanceItem(item)
      ? (item.platform as MarketingSources)
      : undefined;

    if (setOpenModal && !reminderStatus) {
      setOpenModal(true);
    } else {
      // Check if updateAdStatus is defined before invoking it
      if (updateAdStatus && source) {
        updateAdStatus(
          item.id,
          modifyAdLevelLabel(currentPurchase?.toLowerCase() as string),
          status,
          source,
          reminderStatus,
        );
      }
    }
  };

  useEffect(() => {
    if (isStatusUpdated === item?.id) {
      setAdStatus(
        item?.source_delivery_status?.toLowerCase() === 'active' ? true : false,
      );
    }
  }, [isStatusUpdated]);

  if (!isTable) {
    return (
      <span className="flex justify-center">
        <label className="switch">
          <input type="checkbox" checked={adStatus} onChange={handleChange} />
          <span className="slider-media"></span>
        </label>
      </span>
    );
  }

  return (
    <td className="text-textSecondaryColor max-w-0 px-2 py-3 border-b border-r align-middle border-extraLightColor last:border-r-0 text-center">
      <span className="flex justify-center">
        <label className="switch">
          <input type="checkbox" checked={adStatus} onChange={handleChange} />
          <span className="slider-media"></span>
        </label>
      </span>
    </td>
  );
};

export default AdStatusToggle;
