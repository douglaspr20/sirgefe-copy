import React, { Dispatch, SetStateAction } from 'react';
import ShopifyStoreConnect from './types/ShopifyStoreConnect.old';
import { ModalTypes } from '@enums/modalTypes';

type ModalProps = {
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
      selectedCampaignFormId: string | null | undefined,
    ) => void;
  };
  selectedCampaignToMatchTo: string | null;
  setSelectedCampaignToMatchTo: Dispatch<SetStateAction<string | null>>;
};

const Modal = (props: ModalProps) => {
  const SelectedCampaignToMatchTo = props.selectedCampaignToMatchTo;
  const SetSelectedCampaignToMatchTo = props.setSelectedCampaignToMatchTo;

  return (
    <div>
      {props.type === ModalTypes.SHOPIFY_STORE_CONNECT && (
        <ShopifyStoreConnect />
      )}
      {/* Is this even being used? */}
    </div>
  );
};

export default Modal;
