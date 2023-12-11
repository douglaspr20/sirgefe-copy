import { Currencies } from '@interfaces/currency';

export const getCurrencyFormatter = (currency: Currencies) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
