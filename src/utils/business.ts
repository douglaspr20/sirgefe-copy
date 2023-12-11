import { Business } from '@sirge-io/sirge-types';
import { BusinessPrisma } from 'API';

export const getCampaignCount = (
  business: Business | BusinessPrisma,
): string => {
  const message = '0 Active Campaigns, 0 Paused';

  const businessOld = business as Business;
  if (!businessOld?.campaign_count) {
    return message;
  }

  const { active_count, paused_count } = businessOld?.campaign_count;
  let activeCampaigns = 0;
  if (active_count) {
    const activeCountJson = JSON.parse(active_count.toString()) as Record<
      string,
      number
    >;
    Object.keys(activeCountJson).map((key) => {
      activeCampaigns = activeCampaigns + activeCountJson[key];
    });
  }
  let pausedCampaigns = 0;
  if (paused_count) {
    const pausedCountJson = JSON.parse(paused_count.toString()) as Record<
      string,
      number
    >;
    Object.keys(pausedCountJson).map((key) => {
      pausedCampaigns = pausedCampaigns + pausedCountJson[key];
    });
  }

  return `${activeCampaigns} Active Campaigns, ${pausedCampaigns} Paused`;
};
