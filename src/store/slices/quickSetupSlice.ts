import { QuickFlowStep } from '@components/quick-setup/app/QuickSetup';
import { StateCreator } from 'zustand';

interface CallbackState {
  callback: (() => void) | null;
}

type TextMainButtonType =
  | 'Continue'
  | 'Connect All'
  | 'Connect tracking script';

type TextSecondaryButtonType = 'Connect Selectively' | 'Decline';

export interface QuickSetupSlice {
  showButton: boolean;
  setShowButton: (showButton: boolean) => void;
  loadingSetup: boolean;
  setLoadingSetup: (loading: boolean) => void;
  isUpdating: boolean;
  setIsUpdating: (isUpdating: boolean) => void;
  userHaveAds: boolean;
  setUserHaveAds: (userHaveAds: boolean) => void;
  mainButtonAction: CallbackState;
  currentStep: QuickFlowStep;
  setMainButtonAction: (mainButtonAction: CallbackState) => void;
  setCurrentStep: (currentStep: QuickFlowStep) => void;
  executeMainButtonAction: () => void;
  secondaryButtonAction: CallbackState;
  setSecondaryButtonAction: (secondaryButtonAction: CallbackState) => void;
  executeSecondaryButtonAction: () => void;
  textMainButton: TextMainButtonType;
  setTextMainbutton: (textMainButton: TextMainButtonType) => void;
  textSecondaryButton: TextSecondaryButtonType;
  setTextSecondaryButton: (
    textSecondaryButton: TextSecondaryButtonType,
  ) => void;
}

export const createQuickSetupSlice: StateCreator<QuickSetupSlice, [], []> = (
  set,
  get,
) => ({
  showButton: true,
  setShowButton: (showButton) => set((state) => ({ ...state, showButton })),
  loadingSetup: false,
  setLoadingSetup: (loading) => set((state) => ({ ...state, loading })),
  isUpdating: false,
  setIsUpdating: (isUpdating) => set((state) => ({ ...state, isUpdating })),
  userHaveAds: false,
  setUserHaveAds: (userHaveAds) => set((state) => ({ ...state, userHaveAds })),
  mainButtonAction: { callback: null },
  currentStep: 'Shopify store',
  setMainButtonAction: (mainButtonAction) =>
    set((state) => ({ ...state, mainButtonAction })),
  setCurrentStep: (currentStep) => set((state) => ({ ...state, currentStep })),
  executeMainButtonAction: () => get().mainButtonAction.callback?.(),
  secondaryButtonAction: { callback: null },
  setSecondaryButtonAction: (secondaryButtonAction) =>
    set((state) => ({ ...state, secondaryButtonAction })),
  executeSecondaryButtonAction: () => get().secondaryButtonAction.callback?.(),
  textMainButton: 'Continue',
  setTextMainbutton: (textMainButton) =>
    set((state) => ({ ...state, textMainButton })),
  textSecondaryButton: 'Connect Selectively',
  setTextSecondaryButton: (textSecondaryButton) =>
    set((state) => ({ ...state, textSecondaryButton })),
});
