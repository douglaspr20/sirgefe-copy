import React, { FC } from 'react';
import Image from 'next/image';

interface Props {
  type: 'Facebook' | 'TikTok' | 'Google';
}

const FailedIntegration: FC<Props> = ({ type }) => {
  return (
    <div className="px-4 pt-8 pb-8">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="mb-1">
          <Image src="/images/warning-icon.svg" width="28" height="25" alt="" />
        </div>
        <h4>Can&apos;t connect to {type}</h4>
        <p className="text-textSecondaryColor">
          Can&apos;t connect to {type} at the moment. Please try again later.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            className="btn min-w-[250px]"
            data-bs-dismiss="modal"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedIntegration;
