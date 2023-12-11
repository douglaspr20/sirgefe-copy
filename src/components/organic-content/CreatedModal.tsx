import React, { FC } from 'react';
import Image from 'next/image';

export type ValidTypeMessages = 'success' | 'error';

interface Props {
  title: string;
  type: ValidTypeMessages;
  id: string;
}

const CreatedModal: FC<Props> = ({ title, type, id }) => {
  return (
    <div className="px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-1">
          <Image
            src={`/images/${
              type === 'success' ? 'checkmark-circle' : 'warning-icon'
            }.svg`}
            width={50}
            height={15}
            alt="success"
          />
        </div>
        <h4 className="text-center">{title}</h4>
        <button
          className="btn mt-4 w-1/2"
          data-bs-dismiss="modal"
          data-bs-toggle="modal"
          data-bs-target={`#${id}`}
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default CreatedModal;
