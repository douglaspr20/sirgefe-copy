import React, { FC } from 'react';
const NoMonthlyBudgetData: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-7 w-full h-64">
      <div className="inline-flex items-center justify-center bg-primaryExtraLightColor rounded-full w-14 h-14 flex-shrink-0 mb-3">
        <i className="icon-data-pie text-2xl text-primaryColor"></i>
      </div>
      <div className="text-textSecondaryColor font-semibold mb-1">
        Ad Budget Spent vs Remaining
      </div>
      <p className="text-center text-xs text-textTeriraryColor mb-4 max-w-[210px]">
        Set, monitor, and balance your ad spend
      </p>
      <button
        data-bs-toggle="modal"
        data-bs-target="#monthlyBudgetModal"
        className="inline-flex items-center font-medium justify-center text-primaryColor hover:text-primaryColorHover"
      >
        <i className="icon-spark mr-2 text-xl"></i>
        Setup Budget
      </button>
    </div>
  );
};

export default NoMonthlyBudgetData;
