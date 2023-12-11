import Image from 'next/image';
import { PlanGroPrices, PlanProPrices, PlanType } from '@utils/plans';

const PlanCardsShopify: React.FunctionComponent<{
  planType: any;
  handlePlanSelect: (plan: string) => Promise<void>;
  current_plan: string | undefined;
  loading: boolean;
  promoCode: any;
}> = ({ planType, handlePlanSelect, current_plan, loading, promoCode }) => {
  return (
    <div className="flex justify-center items-center">
      {/* Gro plan */}
      {/* <div className="bg-white w-96 h-[550px] my-8 rounded-xl mx-5 border border-extraLightColor">
        <div className="relative flex flex-col border-extraLightColor px-6">
          <div className="flex flex-col py-5">
            <div className="flex items-center ">
              <div className="bg-yellowBgColor border border-yellowColor w-14 h-14 rounded-full mr-2 p-0.5  ">
                <Image
                  className="mt-3 ml-3"
                  src="/images/plan-gro-icon.svg"
                  alt="plan gro icon"
                  width={26}
                  height={26}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">Gro</span>
                  {current_plan == 'gro' && (
                    <div className="bg-[#6B8BF0] w-20 h-5 relative self-center rounded-lg text-left">
                      <span className="font-semibold absolute text-sm text-white pl-3">
                        Current
                      </span>
                    </div>
                  )}
                </div>
                <span className="font-normal text-xs text-textTeriraryColor ">
                  Nice plan to start
                </span>
              </div>
            </div>
          </div>
          <hr className="border-extraLightColor pt-5" />

          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-medium text-sm text-textTeriraryColor">
                {planType === PlanType.ANNUALLY ? PlanGroPrices.byYear : ''}
              </span>
              {promoCode && (
                <span className="font-medium text-sm text-textTeriraryColor line-through text-left">
                  $50
                </span>
              )}
              <span className="font-bold text-2xl text-left">
                {promoCode
                  ? `${
                      promoCode.type == 'percentage'
                        ? `$${(50 - (50 * promoCode.amount) / 100).toFixed(0)}`
                        : `$${(50 - promoCode.amount).toFixed(0)}`
                    }`
                  : '$50'}
              </span>
              <span className="font-medium text-xs text-textTeriraryColor">
                USD/month
              </span>
            </div>
            <div
              className={`flex flex-col self-center ${
                planType === PlanType.MONTHLY ? 'hidden' : ''
              }`}
            >
              <div className="text-white relative left-8 bottom-2 font-semibold rounded text-base bg-yellowColor h-7 w-[52px] text-center">
                <span className="absolute right-2 top-[3px]">-77%</span>
              </div>
              <span className="font-medium text-xs text-textTeriraryColor">
                $100 USD/year
              </span>
            </div>
          </div>
          <button
            className={`${
              current_plan == 'gro' || loading
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100 cursor-pointer'
            } disabled:opacity-50 disabled:cursor-not-allowed bg-[#42CBC1] w-72 h-12 rounded self-center my-5`}
            onClick={() => handlePlanSelect('gro')}
            disabled={current_plan === 'gro'}
          >
            <span className="font-semibold text-xs text-white px-4 py-2">
              {loading ? 'Please wait...' : 'Start Free Trial'}
            </span>
          </button>
          <div className="absolute top-[9rem]">
            <div className="w-[470px] z-10 flex h-14 relative bottom-44 text-center bg-[#E387CB] right-[4.3rem] top-0 rotate-[-27deg] text-white text-xl font-bold">
              <span className="absolute my-3 left-[160px]">Coming soon</span>
            </div>
          </div>
          <ul className="list-disc pb-28 pl-6 text-left">
            <li>1 Business</li>
            <li>1 User Accounts</li>
            <li>Unlimited Meta & TikTok Ad tracking</li>
            <li>Facebook Integration</li>
            <li>TikTok Integration</li>
            <li>Limited Analytics dashboard</li>
          </ul>
        </div>
      </div> */}

      {/* Pro plan */}
      <div className="bg-white w-96 h-[550px] my-8 rounded-xl mx-5 border border-[#6B8BF0] shadow-2xl relative">
        <div className=" flex flex-col border-extraLightColor px-6 ">
          <div className="bg-[#6B8BF0] w-40 h-6 relative bottom-6 self-center text-center rounded-t-lg">
            <span className="font-semibold absolute left-9 top-0.5 text-sm text-white ">
              Most Popular
            </span>
          </div>
          <div className="flex flex-col py-5">
            <div className="flex items-center ">
              <div className="bg-[#E3E9FC] border border-[#6B8BF0] w-14 h-14 rounded-full mr-2 p-0.5  ">
                <Image
                  className="mt-2 ml-3"
                  src="/images/plan-pro-icon.svg"
                  alt="plan gro icon"
                  width={26}
                  height={26}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">Early Adopter</span>
                  {current_plan === 'earlyadopter' && (
                    <div className="bg-[#6B8BF0] w-20 h-5 relative self-center rounded-lg text-left">
                      <span className="font-semibold absolute text-sm text-white pl-3">
                        Current
                      </span>
                    </div>
                  )}
                </div>
                <span className="font-normal text-xs text-textTeriraryColor ">
                  Increase Your Stats To The Moon{' '}
                </span>
              </div>
            </div>
          </div>
          <hr className="border-extraLightColor pt-5" />

          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-medium text-sm text-textTeriraryColor">
                {planType === PlanType.ANNUALLY ? PlanProPrices.byYear : ''}
              </span>
              {promoCode && (
                <span className="font-medium text-sm text-textTeriraryColor line-through text-left">
                  $50
                </span>
              )}
              <span className="font-bold text-2xl text-left">
                {promoCode
                  ? `${
                      promoCode.type === 'percentage'
                        ? `$${(50 - (50 * promoCode.amount) / 100).toFixed(0)}`
                        : `$${(50 - promoCode.amount).toFixed(0)}`
                    }`
                  : '$50'}
              </span>
              <span className="font-medium text-xs text-textTeriraryColor">
                USD/Month
              </span>
            </div>
            <div
              className={`flex flex-col self-center ${
                planType === PlanType.MONTHLY ? 'hidden' : ''
              }`}
            >
              <div className="text-white relative left-8 bottom-2 font-semibold rounded text-base bg-[#6B8BF0] h-7 w-14 text-center">
                <span className="absolute right-2 top-1">-66%</span>
              </div>
              <span className="font-medium text-xs text-textTeriraryColor">
                {planType === PlanType.ANNUALLY ? PlanProPrices.anually : ''}
                USD/year
              </span>
            </div>
          </div>
          <button
            className={`${
              current_plan === 'earlyadopter' || loading
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100 cursor-pointer'
            } bg-[#42CBC1] w-72 h-12 rounded self-center my-5`}
            onClick={() => handlePlanSelect('earlyadopter')}
            disabled={current_plan === 'earlyadopter'}
          >
            <span className="font-semibold text-xs text-white px-4 py-2">
              {loading ? 'Please wait...' : 'Start Early Adopter'}
            </span>
          </button>
          <ul className="list-disc pl-6 text-left">
            <li>Unlimited Facebook And TikTok Ad Tracking</li>
            <li>Facebook Integration</li>
            <li>TikTok Integration</li>
            <li>Shopify Store Analytics</li>
            <li>3 User Accounts</li>
            <li>ROAS Tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCardsShopify;
