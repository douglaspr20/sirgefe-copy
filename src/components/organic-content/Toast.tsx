import Image from 'next/image';
import React from 'react';
import { useBoundStore } from '@store/index';

interface Props {
  text: string;
  notificationState: string | null;
}
const Toast = ({ notificationState, text }: Props) => {
  const { isSidebarOpen } = useBoundStore();
  return (
    <div
      className={`${
        isSidebarOpen ? 'left-[15rem]' : 'left-[6rem]'
      } absolute bottom-[4rem] duration-500 ease-in-out  border ${
        notificationState === 'success'
          ? 'border-[#52CF80]'
          : 'border-[#F67063]'
      } px-4 py-3 shadow-md bg-white rounded-lg transition-transform z-[1000]`}
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
        <span className="font-medium text-xs capitalize">
          {notificationState === 'success'
            ? `${text}`
            : 'Update Failed, Please Retry'}
        </span>
      </div>
    </div>
  );
};

export default Toast;
