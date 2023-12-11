import { PlanType } from '@utils/plans';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

interface Props {
  setPlanType?: Dispatch<SetStateAction<PlanType>>;
}

const PlanTypeSelector = ({ setPlanType }: Props) => {
  const [selectedPlanType, setSelectedPlanType] = useState(PlanType.MONTHLY);

  return (
    <div className="">
      <div className="p-3 flex justify-center items-center">
        <ul className="flex flex-row justify-center w-72 h-16 bg-white items-center rounded-lg shadow-md">
          <li>
            <button
              className={` px-9 py-2 border border-bodyColor rounded-lg mr-3 ${
                selectedPlanType === PlanType.MONTHLY
                  ? 'text-white bg-[#42CBC1]'
                  : 'bg-white'
              }`}
              onClick={() => {
                if (setPlanType) setPlanType(PlanType.MONTHLY);
                setSelectedPlanType(PlanType.MONTHLY);
              }}
            >
              Monthly
            </button>
          </li>
          <li>
            <button
              className={` px-9 py-2 border border-bodyColor rounded relative ${
                selectedPlanType === PlanType.ANNUALLY
                  ? 'text-white bg-[#42CBC1]'
                  : 'bg-white'
              }`}
              onClick={() => {
                if (setPlanType) setPlanType(PlanType.ANNUALLY);
                setSelectedPlanType(PlanType.ANNUALLY);
              }}
            >
              Annually
              <div className="px-3 right-[-48px] top-[-11px] rotate-[17deg] absolute text-[#42CBC1] border border-[#42CBC1] bg-white rounded">
                <span className="font-medium text-xs ">Save Up To 77%</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlanTypeSelector;
