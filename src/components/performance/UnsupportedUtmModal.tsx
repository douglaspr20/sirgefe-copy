import React, { FC, useRef } from 'react';
import { facebookUTM, googleUTM, tikTokUTM } from '@utils/settingsCodes';
import { MarketingSources } from '@sirge-io/sirge-types';

type UnsupportedUtmModalProps = {
  title: string | undefined | null;
  setOpenModal: (data: any) => void;
  source?: string;
};

const UnsupportedUtmModal: FC<UnsupportedUtmModalProps> = (
  props: UnsupportedUtmModalProps,
) => {
  const dismissSuccessModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const platformTitle =
    props.source === MarketingSources.FACEBOOK
      ? 'Facebook'
      : props.source === MarketingSources.GOOGLE
      ? 'Google'
      : 'TikTok';

  const utmValue =
    props.source === MarketingSources.FACEBOOK
      ? facebookUTM
      : props.source === MarketingSources.GOOGLE
      ? googleUTM
      : tikTokUTM;

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
            <p className="font-semibold">
              This ad is not eligible for automatic UTM injection
            </p>
          </div>
          <div className="text-textSecondaryColor mb-2 text-xs font-medium">
            Due to the nature of how {platformTitle} ads work, Sirge is is
            unable to automatically inject our UTM parameters without posing
            risk to your ad. Please copy the parameters located in the box below
            and paste them in the UTM Paramter box of the ad inside your{' '}
            {platformTitle} Ad Manager
          </div>

          <textarea
            className="input pt-3 pb-11 resize-none min-h-[120px]"
            placeholder="Enter website URL to generate UTM "
            value={utmValue}
            id="CopyClipBoard"
            readOnly
          ></textarea>
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

export default UnsupportedUtmModal;
