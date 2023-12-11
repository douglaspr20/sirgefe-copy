import React, { FC, ReactElement } from 'react';
import Image from 'next/image';

export type ValidTypeMessages = 'success' | 'error';

interface Props {
  title: string;
  type?: ValidTypeMessages;
  description?: string;
  buttonAction?: ReactElement;
}

const Message: FC<Props> = ({ title, type, description, buttonAction }) => {
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
        <h4 className="text-center capitalize">{title}</h4>
        {description && (
          <p className="text-center" style={{ whiteSpace: 'pre-line' }}>
            {description}
          </p>
        )}

        {buttonAction}
      </div>
    </div>
  );
};

export default Message;
