export const ERRORS = {
  FIRST_NAME_REQUIRED: 'First name is required.',
  FIRST_NAME_VALID: 'First name is not valid.',
  LAST_NAME_REQUIRED: 'Last name is required.',
  LAST_NAME_VALID: 'Last name is not valid.',
  PHONE_REQUIRED: 'Phone is required.',
  PHONE_VALID: 'Phone is not valid.',
  STREET_ADDRESS_1_REQUIRED: 'Street Address is required.',
  STREET_ADDRESS_IS_REQUIRED: 'Street address is required.',
  STREET_NUMBER: 'Street Number is required.',
  STREET_NAME: 'Street Name is required.',
  CITY_REQUIRED: 'City is required.',
  STATE_REQUIRED: 'State is required.',
  ZIP_REQUIRED: 'Zip/Postal is required.',
  COUNTRY_REQUIRED: 'Country is required.',
  VALID_CITY: 'Please enter a valid city.',
  VALID_STATE: 'Please enter a valid state.',
  SOMETHING_WRONG: 'Something went wrong.',
  UN_AUTHORIZE_LOGIN: 'Wrong email or password.',
  VALID_EMAIL: 'Please enter a valid email address.',
  REQUIRED_EMAIL: 'Email is required.',
  REQUIRED_PASSWORD: 'Password is required.',
  REQUIRED_PASSWORD_CONFIRMATION: 'Password confirmation is required.',
  INVALID_POSTAL_CODE: 'Invalid Postal Code',
  ONLY_NUMBERS: 'This field allows only digits',
  MINIMUM_PASSWORD_LENGTH:
    'Invalid password, a minimum length of 8 characters is required.',
  MINIMUM_PASSWORD_CONFIRMATION_LENGTH:
    'Invalid password confirmation, a minimum length of 8 characters is required.',
  EQUAL_PASSWORD: 'Password and Confirm Password should be the same.',
  TRY_AGAIN: 'An error occurred please try again later.',
  BUSINESS_LIMIT: 'Business Limit is required.',
  BUSINESS_LIMIT_VALID: 'Business Limit must be greater than 0.',
  EXPERIENCE: 'Experience is required.',
  EXPERIENCE_VALID: 'Please state your experience in more than 5 characters.',
  VALID_NAME_LENGTH: 'a minimum length of 4 characters is required.',
  INVALID_CARD_NUMBER: 'Invalid Card Number',
  INVALID_CARD_EXPIRATION_DATE: 'Invalid Card Expiration Date',
  INVALID_CVC: 'Invalid cvc',
  MAX_FILE_SIZE: 'Max file size is 5MB',
  INVALID_PROMO_CODE: 'Invalid Promo Code',
  PICKCOLUMN: 'Please Pick A Column',
  PICKOPERATOR: 'Please Select An Operator',
};

export const ERROR_CODES = { NO_ACTIVE_SUBSCRIPTION: 88 };

export const ENV = {
  DEV: 'dev',
  PROD: 'prod',
};
export const STATUS_CODES = {
  unAuthorize: 401,
  success: 200,
  unprocessableEntity: 422,
  notFound: 404,
  serverError: 500,
  conflict: 409,
  tooManyRequests: 429,
};
export const TIMES = {
  SCID_EXPIRY: 30000, //15 min
  // SCID_EXPIRY: 60000, //1 min
  SCR_EXPIRY: 60 * 24 * 60 * 30 * 1000, //60 days , numberOfDays*24toHours*60ToMins*60toSecs*1000toMiliSecs
};
