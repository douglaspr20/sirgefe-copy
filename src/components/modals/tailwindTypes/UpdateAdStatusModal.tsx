'use client';
import React, { FC, useState } from 'react';
import Icon from '@images/error-circle.svg';
// import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import {
  AdLevelTypes,
  AdStatusUpdate,
  MarketingSources,
} from '@sirge-io/sirge-types';
import { modifyAdLevelLabel } from '@utils/format';
import { useBoundStore } from '@store/index';

type UpdateAdStatusModalProps = {
  data: any;
  loading: boolean;
  handleStatusUpdate: (
    id: string,
    adType: AdLevelTypes,
    status: AdStatusUpdate,
    source: MarketingSources,
    reminderStatus: boolean,
  ) => void;
  currentReminderStatus: boolean;
};
//
const UpdateAdStatusModal: FC<UpdateAdStatusModalProps> = ({
  data,
  loading,
  handleStatusUpdate,
  currentReminderStatus,
}: UpdateAdStatusModalProps) => {
  const { currentPurchase } = useBoundStore.getState();
  const [reminderStatus, setReminderStatus] = useState(currentReminderStatus); // Initialize state to manage reminder status
  const id = data?.id;
  const adType = modifyAdLevelLabel(currentPurchase?.toLowerCase() as string);
  const status =
    data?.source_delivery_status?.toLowerCase() === 'active'
      ? AdStatusUpdate?.DISABLE
      : AdStatusUpdate?.ENABLE;
  const source = data?.platform;

  return (
    <>
      <div className="p-5">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-1">
            <Image src={Icon} width={32} height={32} alt="error-warning" />
          </div>
          <h4 className="text-center capitalize">{`Turn ${
            data?.source_delivery_status &&
            data?.source_delivery_status?.toLowerCase() === 'active'
              ? 'Off'
              : 'On'
          } ${currentPurchase?.toLowerCase()?.slice(0, -1)}`}</h4>
          <p className="text-center mt-1 text-[#5F666D]">
            Are You Sure To Turn
            <span className="text-[#34404B]">
              {` ${
                data?.source_delivery_status &&
                data?.source_delivery_status?.toLowerCase() === 'active'
                  ? 'Off'
                  : 'On'
              } ${data?.campaign_name} `}
            </span>
            {`${currentPurchase?.toLowerCase()?.slice(0, -1)}`}
          </p>

          <div className="flex items-center mt-1 gap-[5px]">
            <Image src={Icon} width={16} height={16} alt="error-warning" />
            <p className="text-center text-xs text-[#B79D46]">{`${
              data?.source_delivery_status?.toLowerCase() === 'active'
                ? `Upon reactivation, the ${currentPurchase
                    ?.slice(0, -1)
                    ?.toLowerCase()} may return to the learning mode.`
                : `${currentPurchase
                    ?.slice(0, -1)
                    ?.toLowerCase()} will back to learning mode.`
            }`}</p>
          </div>
          <div>
            <p className="flex text-center mt-4 items-center">
              <input
                type={'checkbox'}
                checked={reminderStatus}
                onChange={() => setReminderStatus(!reminderStatus)}
                className="mr-2" // Toggle reminder status on change
              />{' '}
              Do not remind me
            </p>
          </div>
          <div className="flex mt-4 gap-3">
            <button
              disabled={loading}
              className={`btn ${
                data?.source_delivery_status &&
                data?.source_delivery_status?.toLowerCase() === 'active'
                  ? 'red'
                  : ''
              } items-center inline-flex px-4 py-[10px]`}
              onClick={() => {
                handleStatusUpdate(id, adType, status, source, reminderStatus);
              }}
            >
              {' '}
              {loading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>

                  {data?.source_delivery_status &&
                  data?.source_delivery_status?.toLowerCase() === 'active'
                    ? 'Turning Off...'
                    : 'Turning On...'}
                </>
              ) : (
                <>
                  {data?.source_delivery_status &&
                  data?.source_delivery_status?.toLowerCase() === 'active'
                    ? 'Turn Off'
                    : 'Turn On'}
                </>
              )}
            </button>

            <button
              type="button"
              className="btn light items-center inline-flex px-4 py-[10px]"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAdStatusModal;
