import Image from 'next/image';
import { PlanGroPrices, PlanProPrices, PlanType } from '@utils/plans';

const PlanCards: React.FunctionComponent<{
  planType: any;
}> = ({ planType }) => {
  return (
    <div className="flex flex-wrap justify-center my-10 ">
      {/* Gro plan */}
      <div className="bg-white w-96 h-[550px] my-8 rounded-xl mx-5">
        <div className=" flex flex-col border-extraLightColor px-6 ">
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
                <span className="font-bold text-lg">Gro</span>
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
              <span className="font-bold text-2xl">
                {planType === PlanType.ANNUALLY
                  ? PlanGroPrices.anually
                  : PlanGroPrices.monthly}
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
                {planType === PlanType.ANNUALLY ? PlanGroPrices.anually : ''}
                USD/year
              </span>
            </div>
          </div>
          <button className="bg-[#42CBC1]  w-72 h-12 rounded self-center my-5">
            <span className="font-semibold text-xs text-white px-4 py-2">
              Start Free Trial {/* Start Gro */}
            </span>
          </button>
          <ul className="list-disc pb-28 pl-6">
            <li>1 Business</li>
            <li>1 User Account</li>
            <li>Unlimited Ad Tracking</li>
            <li>Shopify Integration</li>
            <li>Facebook Integration</li>
            <li>Tiktok Integration</li>
            <li>Limited Analytics dashboard</li>
          </ul>
        </div>
      </div>

      {/* Pro plan */}
      <div className="bg-white w-96 h-[550px] my-8 rounded-xl mx-5 border border-[#6B8BF0] shadow-2xl relative bottom-5">
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
                <span className="font-bold text-lg">Pro</span>
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
              <span className="font-bold text-2xl">
                {planType === PlanType.ANNUALLY
                  ? PlanProPrices.anually
                  : PlanProPrices.monthly}
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
          <button className="bg-[#42CBC1]  w-72 h-12 rounded self-center my-5">
            <span className="font-semibold text-xs text-white px-4 py-2">
              {/* Start Free Trial{' '} */}
              Start Pro
            </span>
          </button>
          <ul className="list-disc  pl-6">
            <li>1 Business</li>
            <li>3 User Accounts</li>
            <li>Unlimited Sessions</li>
            <li>Shopify Integration</li>
            <li>Facebook Integration</li>
            <li>Tiktok Integration</li>
            <li>Blended ROAS Tracker</li>
            <li>Full Analytics dashboard</li>
            <li>Facebook Conversion API</li>
            <li>TikTok Conversion API</li>
          </ul>
        </div>
      </div>

      {/* Turbo plan */}
      <div className="bg-white w-96 h-[550px]  my-8 rounded-xl mx-5 relative overflow-hidden">
        <div className=" flex flex-col relative border-extraLightColor px-6 ">
          <div className="flex flex-col py-5">
            <div className="flex items-center ">
              <div className="bg-[#FFF2FC] border border-[#E387CB] w-14 h-14 rounded-full mr-2 p-0.5  ">
                <Image
                  className="mt-3 ml-3"
                  src="/images/plan-turbo-icon.svg"
                  alt="plan gro icon"
                  width={26}
                  height={26}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">Turbo</span>
                <span className="bg-extraLightColor rounded-3xl w-20 h-2"></span>
              </div>
            </div>
          </div>
          <hr className="border-extraLightColor pt-5" />
          <div className="w-[470px] z-10 flex h-14 relative bottom-44 text-center bg-[#E387CB] right-16 top-36 rotate-[-27deg] text-white text-xl font-bold">
            <span className="absolute my-3 left-[160px]">Coming Soon</span>
          </div>

          <ul className="pl-6">
            <li className="list-disc">One Click Upsell</li>
            <li className="list-disc">Multiple Ad Accounts</li>
            <li className="list-disc  bg-darkGrade100 rounded-3xl w-32 h-2 my-4 opacity-10" />
            <li className="list-disc  bg-darkGrade100 rounded-3xl w-40 h-2 my-4 opacity-10" />
            <li className="list-disc  bg-darkGrade100 rounded-3xl w-12 h-2 my-4 opacity-10" />
            <li className="list-disc bg-darkGrade100  rounded-3xl w-4 h-2 my-4 opacity-10" />
            <li className="list-disc bg-darkGrade100  rounded-3xl w-8 h-2 my-4 opacity-10" />
            <li className="list-disc  bg-darkGrade100 rounded-3xl w-24 h-2 my-4 opacity-10" />
            <li className="list-disc  bg-darkGrade100 rounded-3xl w-20 h-2 my-4 opacity-10" />
            <li className="list-disc  bg-darkGrade100 rounded-3xl w-16 h-2 my-4 opacity-10" />
            <li className="list-disc  bg-darkGrade100 rounded-3xl w-32 h-2 my-4 opacity-10" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCards;
