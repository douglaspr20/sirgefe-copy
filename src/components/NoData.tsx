import React, { FC } from 'react';
const NoData: FC = () => {
  return (
    <div className="text-textTeriraryColor flex items-center justify-center flex-col m-auto w-full min-h-[180px]">
      <i className="icon-data-area text-4xl"></i>
      <p className="text-xs font-medium">Not Enough Data</p>
    </div>
  );
};

export default NoData;
