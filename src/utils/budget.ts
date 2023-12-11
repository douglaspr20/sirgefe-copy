import { Performance } from '../API';

export const getAdGroupBudgetTitles = (item: Performance) => {
  if (
    item.campaign_budget?.lifetime_budget ||
    item.campaign_budget?.daily_budget
  ) {
    return {
      mainTitle: 'Campaign budget',
      tooltipTitle: 'Managing on campaign level',
    };
  }

  return {
    mainTitle: 'Ad set budget',
    tooltipTitle: 'Managing on ad set level',
  };
};

export const getAdGroupMinBudget = (itemType: string, currency: string) => {
  if (itemType === 'Campaigns') {
    const item = campaignLevelTiktokBudgets.find(
      (item) => item.Code === currency,
    );

    return item?.['Minimum daily budget (inclusive)'];
  }

  const item = adSetLevelTiktokBudgets.find((item) => item.Code === currency);
  return item?.['Minimum daily budget (inclusive)'];
};

const adSetLevelTiktokBudgets = [
  {
    Currency: 'US Dollar',
    Code: 'USD',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'British Pound',
    Code: 'GBP',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Chinese Yuan',
    Code: 'CNY',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Euro',
    Code: 'EUR',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Hong Kong Dollar',
    Code: 'HKD',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Japanese Yen',
    Code: 'JPY',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Algerian Dinar',
    Code: 'DZD',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Argentine Peso',
    Code: 'ARS',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Australian Dollar',
    Code: 'AUD',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Bangladeshi Taka',
    Code: 'BDT',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Bolivian Boliviano',
    Code: 'BOB',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Brazilian Real',
    Code: 'BRL',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Canadian Dollar',
    Code: 'CAD',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Chilean Peso',
    Code: 'CLP',
    'Minimum daily budget (inclusive)': 20000,
    'Maximum daily budget (exclusive)': 10000000000,
  },
  {
    Currency: 'Colombian Peso',
    Code: 'COP',
    'Minimum daily budget (inclusive)': 20000,
    'Maximum daily budget (exclusive)': 10000000000,
  },
  {
    Currency: 'Costa Rican Colon',
    Code: 'CRC',
    'Minimum daily budget (inclusive)': 20000,
    'Maximum daily budget (exclusive)': 10000000000,
  },
  {
    Currency: 'Czech Koruna',
    Code: 'CZK',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Danish Krone',
    Code: 'DKK',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Egyptian Pound',
    Code: 'EGP',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Guatemalan Quetzal',
    Code: 'GTQ',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Honduran Lempira',
    Code: 'HNL',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Hungarian Forint',
    Code: 'HUF',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Icelandic Krona',
    Code: 'ISK',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Indian Rupee',
    Code: 'INR',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Indonesian Rupiah',
    Code: 'IDR',
    'Minimum daily budget (inclusive)': 200000,
    'Maximum daily budget (exclusive)': 100000000000,
  },
  {
    Currency: 'Israeli New Shekel',
    Code: 'ILS',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Kenyan Shilling',
    Code: 'KES',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Macanese Pataca',
    Code: 'MOP',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Malaysian Ringgit',
    Code: 'MYR',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Mexican Peso',
    Code: 'MXN',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'New Taiwan Dollar',
    Code: 'TWD',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'New Zealand Dollar',
    Code: 'NZD',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Nicaraguan Cordoba',
    Code: 'NIO',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Nigerian Naira',
    Code: 'NGN',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Norwegian Krone',
    Code: 'NOK',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Pakistani Rupee',
    Code: 'PKR',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Paraguayan Guarani',
    Code: 'PYG',
    'Minimum daily budget (inclusive)': 200000,
    'Maximum daily budget (exclusive)': 100000000000,
  },
  {
    Currency: 'Peruvian Nuevo Sol',
    Code: 'PEN',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Philippine Peso',
    Code: 'PHP',
    'Minimum daily budget (inclusive)': 1000,
    'Maximum daily budget (exclusive)': 500000000,
  },
  {
    Currency: 'Polish Zloty',
    Code: 'PLN',
    'Minimum daily budget (inclusive)': 80,
    'Maximum daily budget (exclusive)': 40000000,
  },
  {
    Currency: 'Qatari Riyal',
    Code: 'QAR',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Romanian Leu',
    Code: 'RON',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Russian Ruble',
    Code: 'RUB',
    'Minimum daily budget (inclusive)': 2000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Saudi Riyal',
    Code: 'SAR',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Singapore Dollar',
    Code: 'SGD',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'South African Rand',
    Code: 'ZAR',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'South Korean Won',
    Code: 'KRW',
    'Minimum daily budget (inclusive)': 20000,
    'Maximum daily budget (exclusive)': 10000000000,
  },
  {
    Currency: 'Swedish Krona',
    Code: 'SEK',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Swiss Franc',
    Code: 'CHF',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Thai Baht',
    Code: 'THB',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Turkish Lira',
    Code: 'TRY',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'UAE Dirham',
    Code: 'AED',
    'Minimum daily budget (inclusive)': 20,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Ukrainian Hryvnia',
    Code: 'UAH',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Uruguayan Peso',
    Code: 'UYU',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Venezuelan Bolivar',
    Code: 'VEF',
    'Minimum daily budget (inclusive)': 2000000,
    'Maximum daily budget (exclusive)': 1000000000000,
  },
  {
    Currency: 'Vietnamese Dong',
    Code: 'VND',
    'Minimum daily budget (inclusive)': 200000,
    'Maximum daily budget (exclusive)': 100000000000,
  },
];

const campaignLevelTiktokBudgets = [
  {
    Currency: 'US Dollar',
    Code: 'USD',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'British Pound',
    Code: 'GBP',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Chinese Yuan',
    Code: 'CNY',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Euro',
    Code: 'EUR',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Hong Kong Dollar',
    Code: 'HKD',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Japanese Yen',
    Code: 'JPY',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Algerian Dinar',
    Code: 'DZD',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Argentine Peso',
    Code: 'ARS',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Australian Dollar',
    Code: 'AUD',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Bangladeshi Taka',
    Code: 'BDT',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Bolivian Boliviano',
    Code: 'BOB',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Brazilian Real',
    Code: 'BRL',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Canadian Dollar',
    Code: 'CAD',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Chilean Peso',
    Code: 'CLP',
    'Minimum daily budget (inclusive)': 50000,
    'Maximum daily budget (exclusive)': 10000000000,
  },
  {
    Currency: 'Colombian Peso',
    Code: 'COP',
    'Minimum daily budget (inclusive)': 50000,
    'Maximum daily budget (exclusive)': 10000000000,
  },
  {
    Currency: 'Costa Rican Colon',
    Code: 'CRC',
    'Minimum daily budget (inclusive)': 50000,
    'Maximum daily budget (exclusive)': 10000000000,
  },
  {
    Currency: 'Czech Koruna',
    Code: 'CZK',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Danish Krone',
    Code: 'DKK',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Egyptian Pound',
    Code: 'EGP',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Guatemalan Quetzal',
    Code: 'GTQ',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Honduran Lempira',
    Code: 'HNL',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Hungarian Forint',
    Code: 'HUF',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Icelandic Krona',
    Code: 'ISK',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Indian Rupee',
    Code: 'INR',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Indonesian Rupiah',
    Code: 'IDR',
    'Minimum daily budget (inclusive)': 500000,
    'Maximum daily budget (exclusive)': 100000000000,
  },
  {
    Currency: 'Israeli New Shekel',
    Code: 'ILS',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Kenyan Shilling',
    Code: 'KES',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Macanese Pataca',
    Code: 'MOP',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Malaysian Ringgit',
    Code: 'MYR',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Mexican Peso',
    Code: 'MXN',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'New Taiwan Dollar',
    Code: 'TWD',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'New Zealand Dollar',
    Code: 'NZD',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Nicaraguan Cordoba',
    Code: 'NIO',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Nigerian Naira',
    Code: 'NGN',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Norwegian Krone',
    Code: 'NOK',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Pakistani Rupee',
    Code: 'PKR',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Paraguayan Guarani',
    Code: 'PYG',
    'Minimum daily budget (inclusive)': 500000,
    'Maximum daily budget (exclusive)': 100000000000,
  },
  {
    Currency: 'Peruvian Nuevo Sol',
    Code: 'PEN',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Philippine Peso',
    Code: 'PHP',
    'Minimum daily budget (inclusive)': 2500,
    'Maximum daily budget (exclusive)': 500000000,
  },
  {
    Currency: 'Polish Zloty',
    Code: 'PLN',
    'Minimum daily budget (inclusive)': 200,
    'Maximum daily budget (exclusive)': 40000000,
  },
  {
    Currency: 'Qatari Riyal',
    Code: 'QAR',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Romanian Leu',
    Code: 'RON',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Russian Ruble',
    Code: 'RUB',
    'Minimum daily budget (inclusive)': 5000,
    'Maximum daily budget (exclusive)': 1000000000,
  },
  {
    Currency: 'Saudi Riyal',
    Code: 'SAR',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Singapore Dollar',
    Code: 'SGD',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'South African Rand',
    Code: 'ZAR',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'South Korean Won',
    Code: 'KRW',
    'Minimum daily budget (inclusive)': 50000,
    'Maximum daily budget (exclusive)': 10000000000,
  },
  {
    Currency: 'Swedish Krona',
    Code: 'SEK',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Swiss Franc',
    Code: 'CHF',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Thai Baht',
    Code: 'THB',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Turkish Lira',
    Code: 'TRY',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'UAE Dirham',
    Code: 'AED',
    'Minimum daily budget (inclusive)': 50,
    'Maximum daily budget (exclusive)': 10000000,
  },
  {
    Currency: 'Ukrainian Hryvnia',
    Code: 'UAH',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Uruguayan Peso',
    Code: 'UYU',
    'Minimum daily budget (inclusive)': 500,
    'Maximum daily budget (exclusive)': 100000000,
  },
  {
    Currency: 'Venezuelan Bolivar',
    Code: 'VEF',
    'Minimum daily budget (inclusive)': 5000000,
    'Maximum daily budget (exclusive)': 1000000000000,
  },
  {
    Currency: 'Vietnamese Dong',
    Code: 'VND',
    'Minimum daily budget (inclusive)': 500000,
    'Maximum daily budget (exclusive)': 100000000000,
  },
];
