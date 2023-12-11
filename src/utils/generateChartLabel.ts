import dayjs, { Dayjs } from 'dayjs';
import { TypesValues } from './format';

export const getLabelsDate = (
  typeOfLabels: TypesValues,
  analytics?: boolean,
  timezone?: string,
): Dayjs[] => {
  const numberOfItems =
    typeOfLabels === 'last_7_days' || (typeOfLabels === 'today' && analytics)
      ? 7
      : typeOfLabels === 'last_30_days'
      ? 30
      : 90;

  if (typeOfLabels === 'today' && !analytics) {
    let acumulate = 0;

    return Array(24)
      .fill(0)
      .map(() => {
        const label = dayjs()
          .tz(timezone)
          .startOf('day')
          .add(acumulate, 'hours');

        acumulate += 1;

        return label;
      });
  } else if (typeOfLabels === 'today' && analytics) {
    return Array(numberOfItems)
      .fill(0)
      .map((_, index) =>
        dayjs()
          .tz(timezone)
          .startOf('day')
          .subtract(typeOfLabels === 'today' ? 0 : 0, 'days')
          .subtract(typeOfLabels === 'today' ? index : 0, 'days'),
      )
      .reverse();
  } else {
    return Array(numberOfItems)
      .fill(0)
      .map((_, index) =>
        dayjs()
          .tz(timezone)
          .startOf('day')
          .subtract(1, 'days')
          .subtract(index, 'days'),
      )
      .reverse();
  }
};

export const generateLabels = (
  typeOfLabels: TypesValues,
  analytics?: boolean,
  timezone?: string,
): string[] => {
  const labelFormat =
    typeOfLabels === 'today' && !analytics ? 'hh:mm A' : 'MMM DD';
  const dates = getLabelsDate(
    typeOfLabels,
    analytics ? analytics : false,
    timezone ? timezone : 'America/Chicago',
  );

  return dates.map((eachDate) => eachDate.format(labelFormat));
};

export const getLabelsClass = (
  typeOfLabels: TypesValues,
  analytics: boolean,
): string => {
  let labelClass = '';
  if (typeOfLabels === 'today' && analytics === true || typeOfLabels === 'last_7_days') {
    labelClass = ''
  }
  else if(typeOfLabels === 'today' && analytics === false){
    labelClass = 'apexcharts-xaxis-hide-odd-label'
  }
  else {
    labelClass = 'apexcharts-xaxis-hide-6n-label'
  }

  return labelClass
}