'use client';

import Image from 'next/image';
import { useRef } from 'react';

type Props = {
  icon: string;
  segmentName: string;
  title: string;
  type: string;
  description?: string;
  handleDelete: () => void;
  handleDecline?: () => void;
};

const DeleteSegmentModal: React.FunctionComponent<Props> = ({
  segmentName,
  handleDelete,
  icon,
  title,
  description,
  type,
  handleDecline,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <div className="p-5">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-1">
            <Image
              src={`/images/${icon}.svg`}
              width={32}
              height={32}
              alt="alter-icon"
            />
          </div>
          <h4 className="text-center capitalize">{title}</h4>
          <p className="text-center mt-1 text-[#5F666D]">
            Are you sure to {type} <strong>{segmentName}</strong> segment?{' '}
            {description}
          </p>

          <div className="flex mt-4 gap-3">
            <button
              className={`w-[119px] text-center items-center  text-white px-4 rounded-md  ${
                type === 'delete'
                  ? 'bg-warningColor hover:bg-warningHoverColor'
                  : 'bg-yellowColor hover:bg-yellowHoverColor'
              } `}
              onClick={() => {
                handleDelete();
                buttonRef?.current?.click();
              }}
            >
              {`${type === 'delete' ? 'Delete' : 'Deactivate'}`}
            </button>

            <button
              ref={buttonRef}
              type="button"
              className="btn w-[119px] text-center light items-center px-4  "
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                if (handleDecline) handleDecline();
              }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteSegmentModal;
