import { AdSet } from '@interfaces/adSet';
import { Ad } from '@interfaces/ad';
import { Campaign } from '@interfaces/campaign';

const isCampaign = (object: unknown) => {
  return Object.prototype.hasOwnProperty.call(object, 'sirge_campaign_id');
};

const isAd = (object: unknown) => {
  return Object.prototype.hasOwnProperty.call(object, 'sirge_ad_id');
};

const isAdSet = (object: unknown) => {
  return Object.prototype.hasOwnProperty.call(object, 'sirge_adset_id');
};

export const idExtractor = (
  rows: (Campaign | Ad | AdSet)[],
  selectedRows: any,
) =>
  rows
    .filter((_row, i) => Object.keys(selectedRows).includes(String(i)))
    .map((row) => {
      if (isCampaign(row)) {
        return (row as Campaign)['sirge_campaign_id'];
      }
      if (isAd(row)) {
        return (row as Ad)['sirge_ad_id'];
      }
      if (isAdSet(row)) {
        return (row as AdSet)['sirge_adset_id'];
      }

      return '';
    });
