import { ModalTypes } from '@enums/modalTypes';

export interface ModalState {
  show: boolean;
  type: ModalTypes;
  callback?: {
    id: string;
    has_purchase: boolean;
    created_at: Date | string;
    campaign_name: string;
    adset_name: string;
    ad_name: string;
    purchase_value: string;
    external_platform: string;
    external_order_id: string;
    source: string;
    updateCallback: (
      SelectedCampaignToMatchTo: string | null,
      keyName: string,
      selectedCampaignFormId: string | null | undefined
    ) => void;
  };
}
