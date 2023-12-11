import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { QuickFlowStep } from '@components/quick-setup/app/QuickSetup';

interface Props {
  currentStep: QuickFlowStep;
  stepNumber: number;
  setCurrentStep: Dispatch<SetStateAction<QuickFlowStep>>;
}

const steps = [
  {
    stepNumber: 'Step 1',
    stepName: 'Shopify store',
  },
  {
    stepNumber: 'Step 2',
    stepName: 'Facebook',
  },
  {
    stepNumber: 'Step 3',
    stepName: 'TikTok',
  },

  ...(process.env.NEXT_PUBLIC_SHOW_GOOGLE_INTEGRATION === 'show'
    ? [
        {
          stepNumber: 'Step 4',
          stepName: 'Google',
        },
      ]
    : []),

  {
    stepNumber: 'Step 5',
    stepName: 'Tracking guide',
  },
];

const QuickSetupStepper = ({
  currentStep,
  stepNumber,
  setCurrentStep,
}: Props) => {
  return (
    <div>
      <h2 className="h3 mb-4 ml-2 mt-[20px] text-center">Account setup</h2>
      <div className="flex flex-row w-full justify-between pb-3 ">
        {steps.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center w-[147px]"
          >
            <div
              className={`border-t mb-3 border-2 w-full rounded ${
                currentStep === item.stepName
                  ? 'border-primaryColor'
                  : 'border-extraLightColor'
              } `}
            />

            <div className="step-width flex-col justify-center flex text-center bg-white border border-extraLightColor rounded-full ml-3 mr-3 font-bold text-lg text-textTeriraryColor">
              <div
                className={`items-center ${
                  currentStep === item.stepName ? 'text-primaryColor ' : ''
                }`}
              >
                {currentStep === item.stepName && stepNumber === i + 1 ? (
                  i + 1
                ) : stepNumber < i + 1 ? (
                  <div className="step-width relative  rounded-full flex flex-col justify-center  mr-3">
                    {i + 1}
                  </div>
                ) : (
                  <div
                    className=" step-width relative  rounded-full flex flex-col justify-center bg-primaryExtraLightColor mr-3 cursor-pointer"
                    onClick={() => {
                      setCurrentStep(item.stepName as QuickFlowStep);
                    }}
                  >
                    <Image
                      className="self-center"
                      src="/images/check-mark.svg"
                      width={24}
                      height={24}
                      alt={item.stepName}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-2  text-center">
              <span
                className={`font-normal text-sm ${
                  currentStep !== item.stepName && 'opacity-50'
                }`}
              >
                {item.stepNumber}
              </span>
              <span
                className={`font-semibold text-base pt-1 ${
                  currentStep !== item.stepName && 'opacity-50'
                }`}
              >
                {item.stepName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickSetupStepper;
