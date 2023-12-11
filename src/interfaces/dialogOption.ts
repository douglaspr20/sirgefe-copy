import { ValidTypeMessages } from '_components/modals/tailwindTypes/PromoCodeApplied';

export type DialogOption = {
  type: ValidTypeMessages;
  message: string;
  messageTwo?: string;
  description?: string;
};
