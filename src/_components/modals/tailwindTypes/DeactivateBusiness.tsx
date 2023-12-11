import React, { FC } from 'react';
import Image from 'next/image';
import Spinner from '_components/Spinner';

interface Props {
  deactivateBussines: () => void;
  isDeactivating?: boolean;
}

const DeactivateBusiness: FC<Props> = ({
  deactivateBussines,
  isDeactivating,
}) => {
  return (
    <div className="px-4 pt-5 pb-4">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="mb-1">
          <Image
            src="/images/warning-icon.svg"
            width={30}
            height={15}
            alt="waring"
          />
        </div>
        <h4>Deactivate business</h4>
        <p className="text-textSecondaryColor text-center">
          The deactivation of a business is permanent. All data and staff
          accounts will be deleted. You must remove the Sirge tracking script
          from your website
        </p>
        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            className="btn ml-3 flex items-center justify-center min-w-[120px]"
            onClick={() => deactivateBussines()}
            disabled={isDeactivating}
          >
            Deactivate
            {isDeactivating && <Spinner />}
          </button>
          <button
            type="button"
            className="btn light ml-3 min-w-[120px]"
            data-bs-dismiss="modal"
            disabled={isDeactivating}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateBusiness;
