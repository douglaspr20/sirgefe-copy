export const installScriptCode = (business_id: string) =>
  `<script defer id="sirge_tracking" type="text/javascript" src="https://${
    process.env.REACT_APP_RELEASE_STAGE === 'production' ||
    process.env.REACT_APP_RELEASE_STAGE === 'staging'
      ? 'track.sirge.io'
      : 'track.dev.sirge.io'
  }/notify.js" business_id="${business_id}"></script>`;

export const codeShopify = (business_id: string) =>
  `{% if first_time_accessed %}  <script defer id="sirge_tracking" type="text/javascript" src="https://${
    process.env.REACT_APP_RELEASE_STAGE === 'production' ||
    process.env.REACT_APP_RELEASE_STAGE === 'staging'
      ? 'track.sirge.io'
      : 'track.dev.sirge.io'
  }/notify.js" business_id="${business_id}"></script> {% endif %}`;

export const facebookUTM = `utm_source={{site_source_name}}&utm_campaign={{campaign.name}}&utm_medium={{adset.name}}&utm_content={{ad.name}}&sirge_campaign_id={{campaign.id}}&sirge_adset_id={{adset.id}}&sirge_ad_id={{ad.id}}&sirge_source_name=facebook`;

export const tikTokUTM =
  'utm_source=tiktok&utm_campaign=__CAMPAIGN_NAME__&utm_medium=__AID_NAME__&utm_content=__CID_NAME__&sirge_campaign_id=__CAMPAIGN_ID__&sirge_adset_id=__AID__&sirge_ad_id=__CID__&sirge_source_name=tiktok';

export const urlPatten =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

export const googleUTM = `utm_source=google&sirge_campaign_id={campaignid}&sirge_adset_id={adgroupid}&sirge_ad_id={creative}&sirge_source_name=google`;
