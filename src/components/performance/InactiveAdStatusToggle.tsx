import React, { useEffect, useState } from 'react';
import { Performance } from '@sirge-io/sirge-types';
import Tooltip from '@components/Tooltip';
import { generateSecondaryStatus } from '@utils/generateSecondaryStatus';
import { DrawerBasicInfo } from './drawer';
interface Props {
  item: (Performance & { id: string }) | DrawerBasicInfo;
  adType: string | null;
  source: string;
  isTable?: boolean;
}
const InactiveAdStatusToggle = ({
  item,
  adType,
  source,
  isTable = true,
}: Props) => {
  const [adStatusMessage, setAdStatusMessage] = useState<string>('');

  const status = generateSecondaryStatus(item, adType);

  useEffect(() => {
    if (item?.id) {
      if (
        item.ad_type === 'VIDEO_RESPONSIVE_AD' ||
        item.ad_type === 'PERFORMANCE_MAX'
      ) {
        setAdStatusMessage('Turn on/off in Google ad manager');
      } else {
        setAdStatusMessage(status);
      }
    }
  }, [item?.id, item?.ad_type, status]);

  if (!isTable) {
    return (
      <>
        <Tooltip title={adStatusMessage} anchorId={'drawer'} place="top" />

        <span className="flex justify-center">
          <label className="switch" id={'drawer'}>
            <input type="checkbox" disabled />
            <span className="inactive-slider-media"></span>
          </label>
        </span>
      </>
    );
  }

  return (
    <td className="relative text-textSecondaryColor max-w-0 px-2 py-3 border-b border-r align-middle border-extraLightColor last:border-r-0 text-center">
      <Tooltip title={adStatusMessage} anchorId={item.id} />

      <span className="flex justify-center">
        <label className="switch" id={item.id}>
          <input type="checkbox" disabled />
          <span className="inactive-slider-media"></span>
        </label>
      </span>
    </td>
  );
};

export default InactiveAdStatusToggle;
