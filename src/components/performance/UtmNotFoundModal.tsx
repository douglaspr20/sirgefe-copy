import React, { FC, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import CheckIcon from '@assets/img/check-mark.svg';
import Image from 'next/image';
import { facebookUTM, tikTokUTM, googleUTM } from '@utils/settingsCodes';

type UtmNotFoundModalProps = {
  title: string | undefined | null;
  setOpenModal: (data: any) => void;
  platform: string;
};

const UtmNotFoundModal: FC<UtmNotFoundModalProps> = (
  props: UtmNotFoundModalProps,
) => {
  const [copyclipBoard, setcopyclipBoard] = useState(false);

  const CopyClipBorad = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Browser don't have support for native clipboard.");
      }
      const copyText: any = document.getElementById('CopyClipBoard')?.innerHTML;
      await navigator.clipboard.writeText(copyText);
      setcopyclipBoard(true);

      setTimeout(() => {
        setcopyclipBoard(false);
      }, 2000);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-3">
          <h3 className="h3">{props.title}</h3>
          <button
            onClick={() => {
              setcopyclipBoard(false);
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
            <p className="font-semibold">UTM Not Found!</p>
          </div>
          <div className="text-textSecondaryColor mb-2 text-xs font-medium">
            Sirge Is Working But We Are Prevented From Receiving Data
          </div>
          <div className="text-textTeriraryColor text-xs">
            Please, Revisit Or Reinstall Your UTM Links.
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <p className="font-semibold text-darkGrade100 mb-1">
              For Existing Ads
            </p>
            <span className="text-xs text-textTeriraryColor mb-2">
              Add The Following UTM’s In The “URL Parameters” Box
            </span>
          </div>
          <button
            className="flex items-center font-medium text-primaryColor hover:text-primaryColorHover cursor-pointer disabled:opacity-50 relative"
            onClick={() => CopyClipBorad()}
          >
            <i className="icon-copy text-xl mr-2"></i>Copy{' '}
            <div
              className={`${
                !copyclipBoard && 'hidden'
              } inline-flex items-center bg-white border rounded-md border-extraLightColor px-4 py-2 shadow-lg whitespace-nowrap absolute min-w-[225px] -top-11 z-40 left-[50%] -translate-x-[50%] `}
            >
              <span className="inline-flex items-center justify-center mr-1.5 flex-shrink-0">
                <Image src={CheckIcon} alt="check-icon" />
              </span>
              <span className="text-textSecondaryColor font-semibold">
                Copied to clipboard
              </span>
            </div>
          </button>
        </div>
        <div className="relative flex flex-col">
          <textarea
            className="input pt-3 pb-11 resize-none min-h-[144px] mt-2"
            placeholder="Enter website URL to generate UTM"
            id="CopyClipBoard"
            value={
              'facebook' === props.platform
                ? facebookUTM
                : 'google' === props.platform
                ? googleUTM
                : tikTokUTM
            }
            readOnly
          ></textarea>
        </div>

        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end py-4 mx-4 border-t border-extraLightColor"></div>
      </div>
    </>
  );
};

export default UtmNotFoundModal;
