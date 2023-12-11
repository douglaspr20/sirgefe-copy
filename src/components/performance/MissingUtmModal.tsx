import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react';

import { LoadingButton } from '@components/LoadingButton';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { BusinessPrisma, Performance } from 'API';
import { handleAccountType } from '@utils/utm-handler';

type MissingUtmModalProps = {
  title: string | undefined | null;
  setOpenModal: (data: any) => void;
  platform: string;
  selectedBusiness: BusinessPrisma | null;
  selectedAd: Performance;
  setDialogOptions: Dispatch<
    SetStateAction<{
      type: ValidTypeMessages;
      message: string;
      description?: string;
    }>
  >;
  refreshData: () => void;
  currentPurchase: string;
};

const MissingUtmModal: FC<MissingUtmModalProps> = (
  props: MissingUtmModalProps,
) => {
  const [loading, setLoading] = useState(false);
  const dismissSuccessModalButtonRef = useRef<HTMLButtonElement | null>(null);
  if (!props.selectedBusiness) {
    return <></>;
  }

  return (
    <>
      <div className="p-4">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-3">
          <h3 className="h3">{props.title}</h3>
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>
        <div className="p-3 border border-warningBgColor rounded mb-3">
          <div className="flex items-center mb-2">
            <div className="w-5 h-5 mr-1 p-0.5">
              <img src="/images/warning-icon.svg" alt="Warning Icon" />
            </div>
            <p className="font-semibold">UTMs are missing</p>
          </div>
          <div className="text-textSecondaryColor mb-2 text-xs font-medium">
            Your campaign is running, but we are not receiving tracking data.
            Please click the button below to inject UTMs into your campaign
          </div>
        </div>
        <div className="text-center">
          {loading ? (
            <LoadingButton text="Connecting" />
          ) : (
            <button
              className="btn primary"
              onClick={() => {
                setLoading(true);

                handleAccountType(props.platform, {
                  currentPurchase: props.currentPurchase,
                  id: props.selectedAd.id as string,
                  business_id: props.selectedBusiness?.id || '',
                  refreshData: props.refreshData,
                  dismissSuccessModalButtonRef,
                  setDialogOptions: props.setDialogOptions,
                  setLoading,
                });
              }}
            >
              Connect UTM
            </button>
          )}
        </div>
      </div>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#utmModalResponse"
        ref={dismissSuccessModalButtonRef}
      />
    </>
  );
};

export default MissingUtmModal;
