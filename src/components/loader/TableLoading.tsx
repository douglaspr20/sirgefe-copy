import React from 'react';
import Image from 'next/image';

const TableLoading = () => {
  return (
    <div className="flex items-center justify-center bg-white h-[300px] border-[1px] border-extraLightColor rounded-lg ">
      <div className="inline-flex items-center justify-center flex-col">
        <div className="relative w-[58px] h-[58px] flex justify-center items-center ">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <Image
              className="animate-spin"
              src={'/images/spinner.png'}
              width={58}
              height={58}
              alt="spinner"
            />
          </div>
          <Image
            src={'/images/bolt-sm.svg'}
            width={32}
            height={32}
            alt="spinner"
          />
        </div>
        <div className="font-semibold text-primaryColor mt-3">
          Updating Results
        </div>
      </div>
    </div>
  );
};

export default TableLoading;
