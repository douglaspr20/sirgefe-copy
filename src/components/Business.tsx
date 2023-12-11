import React, { FC } from 'react';
import Image from 'next/image';
import { Business } from '@sirge-io/sirge-types';
import Link from 'next/link';
import { getCampaignCount } from '@utils/business';

interface Props {
  business: Business;
}

const BusinessComponent: FC<Props> = ({ business }) => {
  return (
    <div className="px-4 py-3 rounded border border-borderLightColor flex items-center mb-4">
      <div className="edit-image relative flex items-center justify-center border w-8 h-8 rounded-full border-borderLightColor bg-greyLight overflow-hidden">
        <Image
          src={
            business?.logo && business?.logo.toUpperCase() !== 'NULL'
              ? business?.logo
              : '/images/business-default-icon.svg'
          }
          alt=""
          width={50}
          height={50}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col mr-2 ml-2">
        <span className="text-textSecondaryColor font-semibold leading-4 mb-[2px] capitalize">
          {business.business_name}
        </span>
        <span className="text-textTeriraryColor text-xs leading-4">
          {getCampaignCount(business)}
        </span>
      </div>
      <Link
        className="ml-auto"
        href={{
          pathname: `/settings/businesses/${business.vanity_name}`,
        }}
      >
        <button className="inline-flex items-center text-lg text-darkGrade50 hover:text-darkGrade75">
          <i className="icon-settings" />
        </button>
      </Link>
    </div>
  );
};

export default BusinessComponent;
