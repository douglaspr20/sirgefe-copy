'use client';
import React, { FC, ReactElement } from 'react';

interface Props {
  icon: ReactElement;
  title: string;
  description: string;
  onClick: () => void;
  recommended?: boolean;
  selected?: boolean;
}

const SegmentOption: FC<Props> = ({
  icon,
  title,
  description,
  recommended = false,
  selected = false,
  onClick,
}) => {
  return (
    <div
      className={` ${
        selected
          ? 'border-primaryColor border-2'
          : 'border border-extraLightColor'
      } rounded-xl p-4 max-w-[310px] relative`}
      onClick={onClick}
    >
      <div className="w-[56px] h-[56px] relative rounded-full flex flex-col justify-center items-center bg-primaryExtraLightColor mb-5 mr-3 cursor-pointer">
        {icon}
      </div>

      {recommended && (
        <span className={`absolute right-3 top-3 tag blue`}>Recommended</span>
      )}

      <h3 className="h3 mb-3">{title}</h3>

      <p className="font-light text-textSecondaryColor">{description}</p>
    </div>
  );
};

export default SegmentOption;
