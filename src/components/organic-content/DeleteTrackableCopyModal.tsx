import Image from 'next/image';
import React from 'react';

interface Props {
  loading: boolean;
  setDeleteModalActive: (value: boolean) => void;
  handleDeleteCopy: () => void;
  deleteCopyOptions: { id: string; short_code: string };
}

const DeleteTrackableCopyModal = ({
  loading,
  setDeleteModalActive,
  handleDeleteCopy,
  deleteCopyOptions,
}: Props) => {
  return (
    <div className="px-4 pt-5 pb-4">
      {loading && (
        <div className="flex items-center justify-center bg-white absolute left-px right-px top-[0px] bottom-[0px] z-50">
          <div className="inline-flex items-center justify-center flex-col">
            <div className="spinner"></div>
            <div className="font-semibold text-primaryColor mt-3">
              Updating Results
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-4">
        <div className="mb-2">
          <Image src="/images/warning-icon.svg" width="28" height="25" alt="" />
        </div>
        <h4 className="mb-1">Delete Post Track</h4>
        <p className="text-textSecondaryColor">
          Are you sure you want to delete this post track?
        </p>
        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            className="btn red ml-3 min-w-[120px]"
            onClick={handleDeleteCopy}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn light ml-3 min-w-[120px]"
            onClick={() => setDeleteModalActive(true)}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTrackableCopyModal;
