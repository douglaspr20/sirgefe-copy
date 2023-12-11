import dayjs from 'dayjs';
import url from 'url';
import { BusinessPrisma, PageView } from '../API';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import {
  AdLevelTypes,
  Business,
  MarketingSources,
} from '@sirge-io/sirge-types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const formatNumber = (creditCardNumber: string) => {
  const arrayChars = creditCardNumber.replace(/\s/g, '').split('');
  let number = '';

  for (let i = 0; i < arrayChars.length; i++) {
    number += arrayChars[i];

    if ((i + 1) % 4 === 0 && i + 1 !== arrayChars.length) {
      number += ' ';
    }
  }

  return number;
};

export const capitalize = (str: string | undefined) => {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return str;
  }
};

export const expirationCardDate = (expirationDate: string) => {
  const value = expirationDate
    .replace(/^([1-9]\/|[2-9])$/g, '0$1/')
    .replace(/^(0[1-9]|1[0-2])$/g, '$1/')
    .replace(/^([0-1])([3-9])$/g, '0$1/$2')
    .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2')
    .replace(/^([0]+)\/|[0]+$/g, '0')
    .replace(/[^\d\/]|^[\/]*$/g, '')
    .replace(/\/\//g, '/');

  return value;
};

export const formatSources = (sources: PageView[]) => {
  return sources.map((source: PageView) => ({
    created: source.created,
    clicks_count: source.clicks_count,
    purchases_count: source.purchases_count,
    referer: source.referer,
    source: source.source,
    url: source.url,
  }));
};

export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
export const formatSeconds = (seconds: number) => {
  if (seconds >= 60 && seconds <= 3600) {
    return `${Math.floor(seconds / 60)} Min`;
  }

  if (seconds >= 3600) {
    return `${Math.floor(seconds / 3600)} Hour`;
  }

  return `${seconds} ${seconds === 1 ? 'Second' : 'Seconds'}`;
};

export type TypesValues =
  | 'today'
  | 'last_7_days'
  | 'last_30_days'
  | 'last_90_days'
  | 'all_time';

export type TypesValuesAnalytics = 'today' | 'last_7_days' | 'last_30_days';

export const typeValues = (
  analytics?: boolean,
  date?: string,
  key?: TypesValues,
  format?: string,
) => {
  let values: any;

  if (analytics) {
    values as Record<TypesValuesAnalytics, string>;
    values = {
      today: dayjs(date).add(1, 'days').format(format),
      last_7_days: dayjs(date).subtract(6, 'days').format(format),
      last_30_days: dayjs(date).subtract(29, 'days').format(format),
    };
  } else {
    values as Record<TypesValues, string>;
    values = {
      today: dayjs(date).add(1, 'days').format(format),
      last_7_days: dayjs(date).subtract(6, 'days').format(format),
      last_30_days: dayjs(date).subtract(29, 'days').format(format),
      last_90_days: dayjs(date).subtract(89, 'days').format(format),
      all_time: dayjs(date).subtract(89, 'days').format(format),
    };
  }

  return key ? values[key] : values;
};

export const getDateEnd = (timezone: string, period: string) => {
  const dateEnd = dayjs()
    .tz(timezone || 'America/Chicago')
    .subtract(period === 'today' ? 0 : 1, 'day')
    .format(period === 'today' ? 'YYYY-MM-DD' : 'YYYY-MM-DD');
  return dateEnd;
};

export const getDateRangePeriod = (dateRange: string): TypesValues => {
  const period =
    dateRange === 'weekly'
      ? 'last_7_days'
      : dateRange === 'monthly'
      ? 'last_30_days'
      : 'today';
  return period;
};

export const trimUrl = (urlToTrim: string) => {
  const parsedUrl = url.parse(urlToTrim);
  const domain = parsedUrl.hostname;
  const shortenedUrl = `https://${domain}/`;
  return shortenedUrl;
};

export const formatDateTimezone = (
  date: string,
  timezome: string | undefined | null,
) => {
  return dayjs(date)
    .tz(timezome || 'america/chicago')
    .format('MMMM DD, YYYY hh:mm A');
};

export const formatDateNoTime = (date: string) => {
  return dayjs(date).format('MMMM DD, YYYY');
};

export const formatDate = (date: string) => {
  return dayjs(date).utc().format('MMMM DD, YYYY hh:mm A');
};

export const formatDateDetails = (date: string) => {
  return dayjs(date).format('MMMM DD, YYYY hh:mm A');
};

export const formatRoas = (num: number | string) => {
  num = Number(num);

  num = num.toFixed(2);

  return `${num}X`;
};

export const formatMoneyWithDecimals = (
  amount: number,
  currency = 'USD',
  isDrawer = false,
) => {
  const moneyFormatterWithDecimals = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: isDrawer && aboveThreeDigits(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });

  const value = moneyFormatterWithDecimals.format(amount);

  return value;
};

export const aboveThreeDigits = (num: number) => {
  const absNumber = Math.abs(num);
  const numToString = absNumber.toString();

  return numToString.length > 2;
};

export const modifyAdLevelLabel = (word: string) => {
  let convertedWord = word;

  if (convertedWord.endsWith('s') && convertedWord.length > 1) {
    convertedWord = convertedWord.slice(0, -1);
  }

  convertedWord = convertedWord.replace(/\s/g, '');

  return convertedWord as AdLevelTypes;
};

export const capitalizeWord = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const addHttpsURL = (url: string) => {
  if (/^(http|https):\/\//.test(url)) {
    return url;
  }

  return `https://${url}`;
};

export const capitalizeFirstWord = (text: string) => {
  if (text?.length === 0) {
    return '';
  }

  const firstWord = text.split(' ')[0];
  const capitalizedFirstWord =
    firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  const restOfText = text.slice(firstWord.length);

  return capitalizedFirstWord + restOfText;
};

export const getPlatformCurrencyForSelectedPlatform = (
  platform: MarketingSources,
  business: BusinessPrisma | null,
) => {
  if (!business) {
    return '';
  }
  const adPlatform = business.ad_account_settings.find(
    (ad) =>
      ad.ad_platform.internal_source_name.toLowerCase() ===
      platform.toLowerCase(),
  );
  if (!adPlatform) {
    return 'USD';
  }
  return adPlatform.social_account_currency || 'USD';
};

export const parseSubtitles = (subtitlesData: string) => {
  const regex =
    /(\d{2}:\d{2}:\d{2}:\d{2})\s(\d{2}:\d{2}:\d{2}:\d{2})\s([\s\S]*?)(?=\n\n|\n<end subtitles>)/g;
  const matches = subtitlesData.matchAll(regex);
  const subtitles = [];

  for (const match of matches) {
    const startTime = formatToSeconds(match[1]);
    const endTime = formatToSeconds(match[2]);
    const content = match[3].trim();

    const subtitle = {
      startTime,
      endTime,
      content,
    };

    subtitles.push(subtitle);
  }

  return subtitles;
};

export const formatToSeconds = (time: string) => {
  const [hours, minutes, seconds, milliseconds] = time.split(':');
  const duration = dayjs.duration({
    hours: Number(hours),
    minutes: Number(minutes),
    seconds: Number(seconds),
    milliseconds: Number(milliseconds) * 10,
  });
  const secondsNumber = duration.asSeconds();
  return secondsNumber;
};
