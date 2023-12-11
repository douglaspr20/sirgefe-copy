import Image from 'next/image';
import React, { FC } from 'react';

interface Props {
  type: string;
  acountName: string;
  numberOfCampaings: number;
  isConnecting: boolean;
  accountsConnected?: number;
  accountsToConnect?: number;
  typeOfItems?: 'ads' | 'campaigns';
  displayInModal?: boolean;
}

const ConnectedAcounts: FC<Props> = ({
  type,
  acountName,
  numberOfCampaings,
  isConnecting,
  accountsConnected,
  accountsToConnect,
  typeOfItems = 'ads',
  displayInModal = false,
}) => {
  return (
    <div className="border shadow-sm bg-white rounded-xl border-extraLightColor px-4 py-5 flex items-center mb-5">
      <Image
        src={`/images/${type.toLowerCase()}.svg`}
        className="mr-2"
        width={30}
        height={30}
        alt={type}
      />

      <span className="font-medium">{type} -</span>

      <span className="ml-2 text-textSecondaryColor">{acountName}</span>

      <span className="tag grey ml-2 capitalize">
        {numberOfCampaings} {displayInModal ? 'Disconnected' : 'Existing'}{' '}
        {typeOfItems}
      </span>

      {isConnecting && (
        <span className="text-primaryColor ml-auto capitalize">
          {accountsConnected} / {accountsToConnect} Connected
        </span>
      )}
    </div>
  );
};

export default ConnectedAcounts;
