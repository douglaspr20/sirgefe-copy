'use client';
import { SnackBar } from '@components/SnackBar';
import { QuickFlowStep } from '@components/quick-setup/app/QuickSetup';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

interface CallbackState {
  callback: (() => void) | null;
}

export type TextMainButtonType =
  | 'Continue'
  | 'Connect All'
  | 'Connect tracking script';
type TextSecondaryButtonType = 'Connect Selectively' | 'Decline';

type QuickSetupContextType = {
  showButton: boolean;
  setShowButton: Dispatch<SetStateAction<boolean>>;
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userHaveAds: boolean;
  setUserHaveAds: Dispatch<SetStateAction<boolean>>;
  mainButtonAction: CallbackState;
  setMainButtonAction: Dispatch<SetStateAction<CallbackState>>;
  executeMainButtonAction: () => void;
  secondaryButtonAction: CallbackState;
  setSecondaryButtonAction: Dispatch<SetStateAction<CallbackState>>;
  executeSecondaryButtonAction: () => void;
  textMainButton: TextMainButtonType;
  setTextMainbutton: Dispatch<SetStateAction<TextMainButtonType>>;
  textSecondaryButton: TextSecondaryButtonType;
  setTextSecondaryButton: Dispatch<SetStateAction<TextSecondaryButtonType>>;
  currentStep: QuickFlowStep;
  setCurrentStep: Dispatch<SetStateAction<QuickFlowStep>>;
  currentVideo: { videoUrl: string; subtitle: string };
};

const QuickSetupContext = createContext<QuickSetupContextType>(undefined!);

export const useQuickSetupContext = () => useContext(QuickSetupContext);

type QuickSetupProviderProps = {
  children: ReactNode;
};

export const QuickSetupProvider = ({ children }: QuickSetupProviderProps) => {
  const [showButton, setShowButton] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userHaveAds, setUserHaveAds] = useState<boolean>(false);
  const [textMainButton, setTextMainbutton] =
    useState<TextMainButtonType>('Continue');
  const [textSecondaryButton, setTextSecondaryButton] =
    useState<TextSecondaryButtonType>('Connect Selectively');

  const [currentStep, setCurrentStep] =
    useState<QuickFlowStep>('Shopify store');

  const [mainButtonAction, setMainButtonAction] = useState<CallbackState>({
    callback: null,
  });
  const [secondaryButtonAction, setSecondaryButtonAction] =
    useState<CallbackState>({
      callback: null,
    });

  const executeMainButtonAction = () => {
    if (mainButtonAction.callback) {
      mainButtonAction.callback();
    }
  };

  const executeSecondaryButtonAction = () => {
    if (secondaryButtonAction.callback) {
      secondaryButtonAction.callback();
    }
  };

  const currentVideo = useMemo(() => {
    switch (currentStep) {
      case 'Shopify store':
        return {
          videoUrl:
            'https://sirge-dev.s3.us-west-2.amazonaws.com/videos/onboarding-step-1.mp4',
          subtitle: 'onboarding-step-1.txt',
        };

      case 'Integrations and ad accounts':
        return {
          videoUrl:
            'https://sirge-dev.s3.us-west-2.amazonaws.com/videos/onboarding-step-2.mp4',
          subtitle: 'onboarding-step-2.txt',
        };

      case 'Connect your existing ads':
        return {
          videoUrl:
            'https://sirge-dev.s3.us-west-2.amazonaws.com/videos/onboarding-step-3.mp4',
          subtitle: 'onboarding-step-3.txt',
        };

      default:
        return {
          videoUrl:
            'https://sirge-dev.s3.us-west-2.amazonaws.com/videos/onboarding-step-1.mp4',
          subtitle: 'onboarding-step-1.txt',
        };
    }
  }, [currentStep]);

  return (
    <QuickSetupContext.Provider
      value={{
        showButton,
        setShowButton,
        isUpdating,
        setIsUpdating,
        loading,
        setLoading,
        userHaveAds,
        setUserHaveAds,
        mainButtonAction,
        setMainButtonAction,
        executeMainButtonAction,
        secondaryButtonAction,
        setSecondaryButtonAction,
        executeSecondaryButtonAction,
        textMainButton,
        setTextMainbutton,
        textSecondaryButton,
        setTextSecondaryButton,
        currentStep,
        setCurrentStep,
        currentVideo,
      }}
    >
      {children}

      <SnackBar />
    </QuickSetupContext.Provider>
  );
};
