import React, { FC } from 'react';
import Image from 'next/image';
import { LoadingButton } from '@components/LoadingButton';

interface Props {
  deleteStaff: () => void;
  loading?: boolean;
}

const RemoveUserModal: FC<Props> = ({ deleteStaff, loading }) => {
  return (
    <div className="px-4 pt-5 pb-4">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="mb-1">
          <Image
            src="/images/warning-icon.svg"
            width={30}
            height={15}
            alt="alert"
          />
        </div>
        <h4>Remove The User</h4>
        <p className="text-textSecondaryColor text-center">
          The Removal Of A Staff Account Is Permanent. This Person Will No
          Longer Have Access To Any Of Your Businesses.
        </p>
        <div className="mt-4 flex items-center justify-center">
          {!loading ? (
            <button
              type="button"
              className="btn ml-3 min-w-[120px]"
              onClick={() => deleteStaff()}
            >
              Delete
            </button>
          ) : (
            <div className="flex justify-end">
              <LoadingButton text="Deleting" />
            </div>
          )}

          <button
            type="button"
            className="btn light ml-3 min-w-[120px]"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveUserModal;
