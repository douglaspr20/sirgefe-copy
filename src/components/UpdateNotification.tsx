import Image from 'next/image';
import React from 'react';

interface Props {
  successDescription: string;
  failureDescription?: string;
  notificationState: string | null;
}
const UpdateNotification = ({
  successDescription,
  failureDescription = 'Update Failed, Please Retry',
  notificationState,
}: Props) => {
  return (
    <div
      className={`absolute left-0 bottom-[3px] duration-500 ease-in-out  border ${
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
        <span className="font-medium text-xs capitalize">
          {notificationState === 'success'
            ? successDescription
            : failureDescription}
        </span>
      </div>
    </div>
  );
};

export default UpdateNotification;
