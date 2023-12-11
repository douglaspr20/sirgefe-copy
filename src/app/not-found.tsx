import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
};

const NotFound = () => {
  return (
    <div className="p-5 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-9">
          <Image
            width={500}
            height={500}
            src="/images/error-img.svg"
            alt="error"
          />
        </div>
        <div className="text-[56px] font-bold mb-2 text-darkGrade100 leading-[64px]">
          404
        </div>
        <p className="font-semibold mb-7 text-textSecondaryColor">
          Page not found
        </p>
        <div className="flex justify-center">
          <button className="btn">Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
