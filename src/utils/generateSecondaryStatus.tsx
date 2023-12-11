import { DrawerBasicInfo } from '@components/performance/drawer';
import { Performance } from '@sirge-io/sirge-types';

export const generateSecondaryStatus = (
  data: Performance | DrawerBasicInfo,
  adType: string | null,
) => {
  let status = '';

  if (adType === 'Ad sets') {
    if (data?.source_secondary_status === 'CAMPAIGN_PAUSED') {
      status = 'Campaign paused';
    }
  }

  if (adType === 'Ads') {
    if (data?.source_secondary_status === 'CAMPAIGN_PAUSED') {
      status = 'Campaign paused';
    }

    if (data?.source_secondary_status === 'ADSET_PAUSED') {
      status = 'Adset paused';
    }
  }

  return status;
};
