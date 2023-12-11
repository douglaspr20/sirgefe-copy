import PlanCard from '@components/PlanCard';
import PlanDetails from '@components/PlanDetails';
import { Plan } from '@sirge-io/sirge-types';
import {
  boltBasicList,
  BoltBasicPrices,
  boltPlusList,
  boltProList,
  BoltProPrices,
} from '@utils/plans';
import React, { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  closeModal?: () => void;
  planType: number;
  setPlanType: Dispatch<SetStateAction<number>>;
  plan: Plan;
}

const PlansModal: FC<Props> = ({ planType, setPlanType, plan, closeModal }) => {
  return (
    <>
      <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-3">
        <h3 className="h3">Power Up</h3>
        <button
          type="button"
          className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="icon-dismiss-circle"></i>
        </button>
      </div>

      <div className="modal-body relative px-4">
        <div className="w-full mb-3">
          <div className="flex flex-col">
            <div className="inline-flex items-center justify-center mb-[30px]">
              <div className="inline-flex items-center mr-3">
                <span className="inline-flex items-center font-semibold text-darkGrade100 mr-3">
                  Monthly
                </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    value={planType}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);

                      if (value) {
                        setPlanType(0);
                      } else {
                        setPlanType(1);
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="inline-flex items-center font-semibold text-darkGrade100">
                Annually{' '}
                <span className="ml-3 text-white px-2.5 py-1 bg-primaryColor font-medium leading-[14px] rounded-2xl">
                  20% Off
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-4">
              <PlanCard
                title="Bolt Basic"
                price={
                  planType
                    ? `$${BoltBasicPrices.anually}`
                    : `$${BoltBasicPrices.monthly}`
                }
                priceByYear={`$${
                  planType
                    ? `${BoltBasicPrices.anually * 12}`
                    : `${BoltBasicPrices.monthly * 12}`
                }`}
                currentPlanCode={plan?.plan_code}
                code={'bolt_basic'}
                status="Current plan"
                list={boltBasicList}
                callback={closeModal}
              />

              <PlanCard
                title="Bolt Pro"
                price={
                  planType
                    ? `$${BoltProPrices.anually}`
                    : `$${BoltProPrices.monthly}`
                }
                priceByYear={`$${
                  planType
                    ? `${BoltProPrices.anually * 12}`
                    : `${BoltProPrices.monthly * 12}`
                }`}
                currentPlanCode={plan?.plan_code}
                code={'bolt_pro'}
                status="Upgrade"
                list={boltProList}
                callback={closeModal}
                recomended
              />

              <div className="flex flex-col">
                <div className="widget-container px-3.5 py-4 flex flex-col min-h-[163px] mb-5">
                  <div className="mb-3 font-semibold text-darkGrade100">
                    Bolt Plus+
                  </div>
                  <h2 className="h2">Custom</h2>
                  <button className="btn w-full mt-auto open_intercom_chat">
                    Contact Us
                  </button>
                </div>
                <ul className="flex flex-col">
                  <PlanDetails list={boltPlusList} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlansModal;
