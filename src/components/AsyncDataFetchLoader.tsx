import Image from 'next/image';
import React from 'react';

interface Props {
  loading: boolean;
  displayLoader: boolean;
}
const AsyncDataFetchLoader = ({ loading, displayLoader }: Props) => {
  return (
    <div
      className={` absolute top-4 left-[50%] -translate-x-[50%] -translate-y-14 duration-500 ease-in-out  px-4 py-[6px] shadow-md bg-white rounded-lg transition-transform ${
        displayLoader && 'translate-y-0'
      } `}
    >
      {loading ? (
        <div className="flex items-center">
          <Image
            className="animate-spin mr-2"
            src="/images/spinner-sm.svg"
            alt="refresh"
            width={20}
            height={20}
          />
          <span className="font-medium text-xs">Data Refreshing</span>
        </div>
      ) : (
        <div className="flex items-center">
          <Image
            className="mr-2 "
            src="/images/checkmark-circle-primary.svg"
            alt="refresh"
            width={20}
            height={20}
          />
          <span className="font-medium text-xs">Data Refreshed</span>
        </div>
      )}
    </div>
  );
};

export default AsyncDataFetchLoader;
