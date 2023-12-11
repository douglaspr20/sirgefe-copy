'use client';

import React from 'react';
import Image from 'next/image';

interface IAudienceCard {
  title: string;
  description: string;
  no_of_customers: number | undefined;
  handleCreateSegment: () => void;
}

const AudienceCard = ({
  title,
  description,
  no_of_customers,
  handleCreateSegment,
}: IAudienceCard) => {
  return (
    <div className="widget-container p-5 flex flex-col justify-between relative">
      <div className="grid mb-5">
        <h5 className="mb-2">{title}</h5>
        <p className="text-textSecondaryColor text-sm mb-2">{description}</p>

        <span className="flex items-center text-darkGrade60">
          <i className="icon-peopl-team text-xl mr-2" />
          {no_of_customers}
        </span>
      </div>
      <div className="flex items-center mt-1">
        <button
          type="button"
          className="btn light"
          onClick={handleCreateSegment}
        >
          Create segment
        </button>
      </div>

      <Image
        src="/images/sirge-cloud.svg"
        alt="qlq"
        width={120}
        height={120}
        priority
        quality={100}
        className="absolute bottom-0 right-0"
        placeholder="blur"
        blurDataURL="/images/sirge-cloud.svg"
      />
    </div>
  );
};

export default AudienceCard;
