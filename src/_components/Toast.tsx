'use client';

import Image from 'next/image';
import React from 'react';

interface Props {
  title: string;
  desc?: string;
  notificationState: string | null;
}
const Toast = ({ title, notificationState, desc }: Props) => {
  return (
    <div className="fixed bottom-[10px] w-full">
      <div
        className={`absolute left-[34px]  bottom-[10px] duration-500 ease-in-out  border ${
          notificationState === 'success'
            ? 'border-[#52CF80]'
            : 'border-[#F67063]'
        } px-4 py-3 shadow-md bg-white rounded-lg transition-transform `}
      >
        <div className="flex items-center">
          <Image
            className="mr-2"
            src={
              notificationState === 'success'
                ? '/images/checkmark-circle.svg'
                : '/images/warning-icon.svg'
            }
            alt="refresh"
            width={24}
            height={24}
          />
          <div className="flex flex-col">
            <span className="font-medium text-xs capitalize">{title}</span>
            {desc ? <span className="text-xs block">{desc}</span> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;

