import { DrawerBasicInfo } from '@components/performance/drawer';
import { Performance } from '@sirge-io/sirge-types';

export const checkSecondaryStatus = (
  data: Performance | DrawerBasicInfo,
  adLevelType: string | null,
  adType: string | null,
) => {
  let statusValue = false;

  if (adType === 'VIDEO_RESPONSIVE_AD' || adType === 'PERFORMANCE_MAX') {
    return statusValue;
  } else {
    if (adLevelType === 'Campaigns') {
      if (
        data?.source_delivery_status?.toLowerCase() === 'active' ||
        data?.source_delivery_status?.toLowerCase() === 'paused'
      ) {
        return (statusValue = true);
      }
    }

    if (adLevelType === 'Ad sets') {
      if (data?.source_secondary_status === 'CAMPAIGN_PAUSED') {
        return statusValue;
      } else {
        return (statusValue = true);
      }
    }

    if (adLevelType === 'Ads') {
      if (
        data?.source_secondary_status === 'CAMPAIGN_PAUSED' ||
        data?.source_secondary_status === 'ADSET_PAUSED'
      ) {
        return statusValue;
      } else {
        return (statusValue = true);
      }
    }
  }

  return statusValue;
};
