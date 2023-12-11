import Image from 'next/image';
import { useIntercom } from 'react-use-intercom';

const EnterprisePlan = () => {
  const { show } = useIntercom();

  return (
    <div className="my-16">
      <div className="flex flex-row bg-white px-8 mx-20 py-6 rounded-xl items-center justify-between max-sm:flex-col max-md:mx-5 max-sm:px-2 max-sm:justify-center">
        <div className="flex items-center ">
          <div className="bg-primaryExtraLightColor border border-primaryColor w-14 h-14 rounded-full mr-2 p-0.5  ">
            <Image
              className="mt-3 ml-3"
              src="/images/gear.svg"
              alt="gear"
              width={26}
              height={26}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Enterprise</span>
            <span className="font-normal text-xs text-textTeriraryColor ">
              Need a custom solution? Chat with us today
            </span>
          </div>
        </div>
        <button
          className="bg-[#42CBC1]  w-64 h-12 rounded  max-md:w-48 max-sm:w-32"
          onClick={() => show()}
        >
          <span className="font-semibold text-xs text-white px-4 py-2">
            Book a free tour
          </span>
        </button>
      </div>
    </div>
  );
};

export default EnterprisePlan;
