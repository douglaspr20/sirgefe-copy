import PlanDetails from './PlanDetails';
import { PlanCodes } from '@sirge-io/sirge-types';

interface Props {
  title: string;
  price: string;
  priceByYear: string;
  list: string[];
  status: string;
  currentPlanCode: any | undefined;
  code: string;
  recomended?: boolean;
  callback?: () => void;
}

const PlanCard: React.FunctionComponent<Props> = ({
  title,
  price,
  priceByYear,
  list,
  currentPlanCode,
  code,
  recomended,
  callback,
}) => {
  const conditionalButtonProps = callback
    ? {
        onClick: () => callback(),
      }
    : {
        'data-bs-toggle': 'modal',
        'data-bs-target':
          currentPlanCode === 'bolt_basic'
            ? '#upgrademodal'
            : '#downgrademodal',
      };

  return (
    <div className="flex flex-col">
      <div
        className={
          recomended
            ? 'relative px-3.5 py-4 mb-5 rounded-lg bg-white border-primaryColor border shadow-lg shadow-primaryColor/20'
            : 'widget-container px-3.5 py-4 mb-5'
        }
      >
        {recomended && (
          <span className="absolute top-[-18px] left-2/4 -translate-x-2/4 px-3 py-1 font-semibold text-primaryColor rounded bg-white border-primaryColor border shadow-lg shadow-primaryColor/20">
            Recommended
          </span>
        )}

        <div className="mb-3 font-semibold text-darkGrade100">{title}</div>

        {price && <h2 className="h2">{price}</h2>}

        {priceByYear && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-textTeriraryColor">USD/month</span>
            <span className="text-xs text-textSecondaryColor font-medium">
              {priceByYear} USD/year
            </span>
          </div>
        )}

        {currentPlanCode === code ? (
          <div className="text-primaryColor bg-primaryExtraLightColor rounded h-9 inline-flex items-center justify-center font-semibold text-center text-xs py-2 px-3 w-full">
            Current plan
          </div>
        ) : (
          <>
            <button
              className="btn w-full mt-auto"
              {...conditionalButtonProps}
              // data-bs-toggle="modal"
              // data-bs-target={
              //   currentPlanCode === 'bolt_basic'
              //     ? '#upgrademodal'
              //     : '#downgrademodal'
              // }
              // onClick={(e) => {
              //   e.preventDefault();

              //   if (callback) callback();
              // }}
            >
              <span>
                {currentPlanCode === 'bolt_basic' ? 'Upgrade' : 'Downgrade'}
              </span>
            </button>
          </>
        )}
      </div>
      <ul className="flex flex-col">
        <PlanDetails list={list} />
      </ul>
    </div>
  );
};

export default PlanCard;
