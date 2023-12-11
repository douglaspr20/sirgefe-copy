import { PromoCode } from '@sirge-io/sirge-types/dist/interfaces/promoCodes';
import { StateCreator } from 'zustand';

interface State {
  promoCode?: PromoCode;
}

export const initialPromoCodeSlice: State = {
  promoCode: undefined,
};

interface Actions {
  setPromoCode: (promoCode: PromoCode) => void;
}

export interface PromoCodeSlice extends State, Actions {}

export const createPromoCodeSlice: StateCreator<PromoCodeSlice, [], []> = (
  set,
) => ({
  ...initialPromoCodeSlice,
  setPromoCode: (promoCode: PromoCode) =>
    set((state) => ({ ...state, promoCode })),
});
