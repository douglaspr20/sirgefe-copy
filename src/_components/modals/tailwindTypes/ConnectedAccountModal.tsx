import Image from 'next/image';
import React, { FC } from 'react';
import { ValidTypeMessages } from './Message';

interface Props {
  type?: ValidTypeMessages;
  title: string;
  description: string;
  actionButton?: () => void;
}

const ConnectedAccountModal: FC<Props> = ({
  type,
  title,
  description,
  actionButton,
}) => {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-1">
          <Image
            src={`/images/${
              type === 'success' ? 'checkmark-circle' : 'warning-icon'
            }.svg`}
            width={32}
            height={15}
            alt="success"
          />
        </div>
        <h4 className="text-center capitalize">{title}</h4>
        <p
          className="text-center text-textSecondaryColor"
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, '<br/>'),
          }}
        />
        <button
          className="btn mt-4 w-[250px]"
          onClick={actionButton}
          data-bs-toggle="modal"
          data-bs-target="#connectedAccount"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default ConnectedAccountModal;
