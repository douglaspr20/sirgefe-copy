import React, { FC } from 'react';
const NoRoasGoalData: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-7 w-full h-64">
      <div className="inline-flex items-center justify-center bg-primaryExtraLightColor rounded-full w-14 h-14 flex-shrink-0 mb-3">
        <i className="icon-target-arrow text-2xl text-primaryColor"></i>
      </div>
      <div className="text-textSecondaryColor font-semibold mb-1">
        Break-Even ROAS Goals
      </div>
      <p className="text-center text-xs text-textTeriraryColor mb-4 max-w-[325px]">
        Set your Break-even ROAS and quickly see which ads, ad sets and
        campaigns are meeting or falling short of it.
      </p>
      <button
        data-bs-toggle="modal"
        data-bs-target="#roasGoalModal"
        className="inline-flex items-center font-medium justify-center text-primaryColor hover:text-primaryColorHover"
      >
        <i className="icon-spark mr-2 text-xl"></i>
        Setup Goals
      </button>
    </div>
  );
};

export default NoRoasGoalData;
