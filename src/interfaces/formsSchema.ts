import { z } from 'zod';
import {
  changeCreditCardSchemaValidation,
  applyPromoCodeSchemaValidation,
  createBusinessSchemaValidation,
  addNewStoreSchemaValidation,
  shopifyStepSchemaValidation,
  setBudget,
  setRoasGoals,
} from 'utils';

export type changeCreditCardSchema = z.infer<
  typeof changeCreditCardSchemaValidation
>;

export type createBusinessSchema = z.infer<
  typeof createBusinessSchemaValidation
>;

export type addNewStoreSchema = z.infer<typeof addNewStoreSchemaValidation>;

export type applyPromoCodeSchema = z.infer<
  typeof applyPromoCodeSchemaValidation
>;
export type setBudgetSchema = z.infer<typeof setBudget>;
export type setRoasGoalsSchema = z.infer<typeof setRoasGoals>;
export type shopifyStepSchema = z.infer<typeof shopifyStepSchemaValidation>;
