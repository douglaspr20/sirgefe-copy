import dayjs from 'dayjs';
import { z } from 'zod';
import { ERRORS } from '@modules/constants';

const MAX_FILE_SIZE = 5000000;

export const changeCreditCardSchemaValidation = z.object({
  creditCardNumber: z.string().trim().length(19, ERRORS.INVALID_CARD_NUMBER),
  expirationDate: z
    .string()
    .length(5)
    .superRefine((expirationDate: string, ctx) => {
      const month = Number(expirationDate.substring(0, 2));
      const year = Number(expirationDate.substring(3, expirationDate.length));

      const currentMonth = Number(dayjs().format('MM'));
      const currentYear = Number(dayjs().format('YY'));

      if (
        (month <= currentMonth && year <= currentYear) ||
        year < currentYear ||
        year > currentYear + 4
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: ERRORS.INVALID_CARD_EXPIRATION_DATE,
        });
      }
    }),
  cvc: z.string().length(3, ERRORS.INVALID_CVC),
});

export const createBusinessSchemaValidation = z.object({
  businessName: z.string().min(2),
  businessPhoto: z
    .object({
      file: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, ERRORS.MAX_FILE_SIZE),
      extension_type: z.string(),
      content_type: z.string(),
    })
    .optional(),
});

export const addNewStoreSchemaValidation = z.object({
  shop_url: z
    .string()
    .min(2)
    .refine((value) => {
      try {
        const regex = new RegExp(
          '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?',
        );
        const without_regex = new RegExp(
          '^([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?',
        );

        return regex.test(value) || without_regex.test(value);
      } catch (error) {
        return false;
      }
    }, 'Please enter a valid url'),
});

export const setBudget = z.object({
  budget: z.string({ invalid_type_error: ERRORS.ONLY_NUMBERS }),
});
export const setRoasGoals = z.object({
  campaigns: z.string({ invalid_type_error: ERRORS.ONLY_NUMBERS }),
  adsets: z.string({ invalid_type_error: ERRORS.ONLY_NUMBERS }),
  ads: z.string({ invalid_type_error: ERRORS.ONLY_NUMBERS }),
});
export const loginSchemaValidation = z.object({
  email: z.string().email(ERRORS.VALID_EMAIL),
  password: z.string().min(8, ERRORS.MINIMUM_PASSWORD_LENGTH),
});

export const passwordResetSchemaValidation = z.object({
  email: z.string().min(1).email(ERRORS.VALID_EMAIL),
});

export const passwordChangeSchemaValidation = z.object({
  password: z.string().min(8, ERRORS.MINIMUM_PASSWORD_LENGTH),
  confirmPassword: z.string().min(8, ERRORS.MINIMUM_PASSWORD_LENGTH),
});

export const applyPromoCodeSchemaValidation = z.object({
  promoCode: z.string().min(1, ERRORS.INVALID_PROMO_CODE),
});

export const registerBillingValidation = z.object({
  city: z.string().min(2, ERRORS.VALID_CITY),
  country: z.string().min(2, ERRORS.COUNTRY_REQUIRED),
  countryCode: z.string().min(2, ERRORS.COUNTRY_REQUIRED),
  streetAddress: z.string().min(2, ERRORS.STREET_ADDRESS_1_REQUIRED),
  state: z.string().min(2, ERRORS.STATE_REQUIRED),
  streetNumber: z.string().min(2, ERRORS.STREET_NUMBER),
  streetName: z.string().min(2, ERRORS.STREET_NAME),
  postalCode: z.string().trim().min(4, ERRORS.INVALID_POSTAL_CODE),
});

export const registerSchemaValidation = z.object({
  firstName: z.string().min(3, ERRORS.FIRST_NAME_REQUIRED),
  lastName: z.string().min(3, ERRORS.LAST_NAME_REQUIRED),
  email: z.string().email(ERRORS.VALID_EMAIL),
  password: z.string().min(8, ERRORS.MINIMUM_PASSWORD_LENGTH),
});

export const filterColumnSchemaValidation = z.object({
  filters: z.array(
    z.object({
      filterId: z.number({ invalid_type_error: ERRORS.ONLY_NUMBERS }),
      field: z.string().min(1, ERRORS.PICKCOLUMN),
      operator: z.string().min(1, ERRORS.PICKOPERATOR),
      value: z.string().optional(),
      logicalOperator: z.string().optional(),
    }),
  ),
});

export const shopifyStepSchemaValidation = z.object({
  businessName: z.string().min(2),
  businessPhoto: z
    .object({
      file: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, ERRORS.MAX_FILE_SIZE),
      extension_type: z.string(),
      content_type: z.string(),
    })
    .optional(),
});
