'use client';
import React from 'react';
import Image from 'next/image';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  console.error(error);
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
          500
        </div>
        <p className="font-semibold mb-7 text-textSecondaryColor">
          Something went wrong
        </p>
        <div className="flex justify-center">
          <button
            className="btn"
            onClick={() => {
              reset();
              //   window.history.go(-1);

              //   setTimeout(() => {
              //     window.location.reload();
              //   }, 2000);
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
