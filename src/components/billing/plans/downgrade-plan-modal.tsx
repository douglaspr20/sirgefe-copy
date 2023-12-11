import Image from 'next/image';

import { Plan, PlanCodes, Subscription } from '@sirge-io/sirge-types';

// images
import ArrowRight from '@assets/img/chevron-right.svg';
import TailwindModal from '@components/modals/TailwindModal';
import { BoltBasicPrices } from '@utils/plans';
import { useMemo } from 'react';
import { LoadingButton } from '@components/LoadingButton';

type DowngradePlanModalProps = {
  subscription: Subscription;
  plan: any;
  planType: number;
  handlePlan: (plan: any) => void;
  loading: boolean;
};

const DowngradePlanModal: React.FunctionComponent<DowngradePlanModalProps> = ({
  plan,
  planType,
  subscription,
  handlePlan,
  loading,
}) => {
  const formatTrialDate = (date: string) => {
    const parseDate = new Date(parseInt(date));

    const formatedDate = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(parseDate);

    return formatedDate;
  };

  const planToUpdate = useMemo(() => {
    if (planType) {
      return {
        price: BoltBasicPrices.anually,
        code: 'bolt_basic_2_annually',
      };
    }

    return {
      price: BoltBasicPrices.monthly,
      code: 'bolt_basic',
    };
  }, [planType]);

  return (
    <>
      <TailwindModal id="downgrademodal">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-3">
          <h3 className="h3">Downgrade plan</h3>
          <button
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>
        <div className="modal-body relative px-4 pb-4">
          <div className="w-full flex justify-between mb-3">
            <div className="w-full flex flex-col items-center border p-4 rounded border-extraLightColor">
              <div className="text-darkGrade100 font-semibold mb-1">
                Current plan
              </div>
              <div className="text-textSecondaryColor text-xs mb-1">
                {plan?.plan_name}
              </div>
              <div className="text-textSecondaryColor text-xs mb-1">
                {plan?.plan_code.includes('_annually') ? 'Annually' : 'Monthly'}
              </div>
              <div className="text-textSecondaryColor text-xs">
                ${plan?.plan_code === 'bolt_basic' ? '948 ' : '2,400 '} USD/year
              </div>
            </div>
            <div className="flex items-center shrink-0 w-2.5 mr-4 ml-4">
              <Image src={ArrowRight} alt="arrow-right" />
            </div>
            <div className="w-full flex flex-col items-center border p-4 rounded border-primaryColor">
              <div className="text-darkGrade100 font-semibold mb-1">
                Downgrade to
              </div>
              <div className="text-textSecondaryColor text-xs mb-1">
                {plan?.plan_code === 'bolt_basic' ? 'Bolt Pro' : 'Bolt Basic'}
              </div>
              <div className="text-textSecondaryColor text-xs mb-1">
                {planType ? 'Annually' : 'Monthly'}
              </div>
              <div className="text-textSecondaryColor text-xs">
                {planToUpdate.price} USD/month
              </div>
            </div>
          </div>
          <div className="text-textSecondaryColor mb-1">
            Downgrade will happen after current plan expire
          </div>
          <div className="text-textSecondaryColor mb-1">
            Current plan will expire{' '}
            <strong className="font-semibold ml-1 text-darkGrade100">
              {subscription?.trial_end &&
                formatTrialDate(subscription?.trial_end)}
            </strong>
          </div>
          <div className="text-textSecondaryColor mb-1">
            You’ll pay for new plan{' '}
            <strong className="font-semibold ml-1 text-darkGrade100">
              {planToUpdate.price}
            </strong>
          </div>
          <div className="text-textSecondaryColor">
            Next payment{' '}
            <strong className="font-semibold ml-1 text-darkGrade100">
              {subscription?.current_billing_period_end &&
                formatTrialDate(subscription?.current_billing_period_end)}
            </strong>
          </div>
        </div>
        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end py-4 mx-4 border-t border-extraLightColor">
          <button
            type="button"
            className="btn light ml-3"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Decline
          </button>

          {!loading ? (
            <button
              type="button"
              className="btn ml-3"
              onClick={() => handlePlan(planToUpdate.code as PlanCodes)}
            >
              Downgrade plan
            </button>
          ) : (
            <div className="flex justify-end ml-3">
              <LoadingButton text="Updating" />
            </div>
          )}
        </div>
      </TailwindModal>
    </>
  );
};

export default DowngradePlanModal;
