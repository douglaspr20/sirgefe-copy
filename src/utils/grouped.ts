import dayjs from 'dayjs';
import { AllBusinessVisitorGraph } from 'API';
import { TypesValues } from './format';

export const groupVisitorsByDate = (
  data: AllBusinessVisitorGraph[],
  numberOfSubtract: number,
  typeOfGrouping = 'normal',
): AllBusinessVisitorGraph[] => {
  if (typeOfGrouping !== 'today') {
    const groupedData: AllBusinessVisitorGraph[] = data.reduce(
      (
        result: AllBusinessVisitorGraph[],
        value: AllBusinessVisitorGraph,
        index: number,
      ): AllBusinessVisitorGraph[] => {
        const dateSplit = value?.date?.split(' ');

        const currentDate = dayjs(dateSplit && dateSplit[0]).startOf('day');
        const subtractDate = currentDate.subtract(numberOfSubtract);

        const lastGroup = result[result.length - 1];

        if (index === 0 || dayjs(lastGroup.date).isBefore(subtractDate)) {
          const newGroup = {
            date: currentDate.format(),
            new_visitors: value.new_visitors,
            returning_visitors: value.returning_visitors,
          } as AllBusinessVisitorGraph;
          result.push(newGroup);
        } else {
          lastGroup.new_visitors = (
            parseInt(lastGroup?.new_visitors || '0') +
            parseInt(value?.new_visitors || '0')
          ).toString();
          lastGroup.returning_visitors = (
            parseInt(lastGroup.returning_visitors || '0') +
            parseInt(value.returning_visitors || '0')
          ).toString();
        }

        return result;
      },
      [],
    );

    return groupedData;
  }

  const groupedDataToday: AllBusinessVisitorGraph[] = data.reduce(
    (
      result: AllBusinessVisitorGraph[],
      value: AllBusinessVisitorGraph,
      index: number,
    ): AllBusinessVisitorGraph[] => {
      const dateSplit = value?.date?.split(' ');

      const currentDate = dayjs(dateSplit && dateSplit[0])
        .startOf('day')
        .add(dateSplit && dateSplit[1] ? Number(dateSplit[1]) : 0, 'hours');

      const subtractDate = currentDate.subtract(
        dateSplit && dateSplit[1] ? 1 : numberOfSubtract,
        dateSplit && dateSplit[1] ? 'hours' : 'day',
      );

      const lastGroup = result[result.length - 1];

      if (index === 0 || dayjs(lastGroup.date).isBefore(subtractDate)) {
        const newGroup = {
          date: currentDate.format(),
          new_visitors: value.new_visitors,
          returning_visitors: value.returning_visitors,
        } as AllBusinessVisitorGraph;
        result.push(newGroup);
      } else {
        lastGroup.new_visitors = (
          parseInt(lastGroup.new_visitors || '0') +
          parseInt(value.new_visitors || '0')
        ).toString();
        lastGroup.returning_visitors = (
          parseInt(lastGroup.returning_visitors || '0') +
          parseInt(value.returning_visitors || '0')
        ).toString();
      }

      return result;
    },
    [],
  );

  return groupedDataToday;
};

export const groupPerformanceDrawerDataByDate = (
  array: { amount: number; date: string }[],
  performanceFilter: TypesValues,
  labelsDate: any,
  timezone?: string,
): Record<string, number> => {
  if (!array) {
    return {};
  }

  const dataArray = array
    .filter(
      (purchases) =>
        dayjs(purchases.date)
          .tz(timezone)
          .startOf('day')
          .isAfter(
            dayjs()
              .tz(timezone)
              .startOf('day')
              .subtract(
                performanceFilter === 'today'
                  ? 7
                  : performanceFilter === 'last_7_days'
                  ? 8
                  : performanceFilter === 'last_30_days'
                  ? 30
                  : 90,
                'days',
              ),
          ) ||
        dayjs(purchases.date)
          .tz(timezone)
          .startOf('day')
          .isSame(
            dayjs()
              .tz(timezone)
              .startOf('day')
              .subtract(
                performanceFilter === 'today'
                  ? 7
                  : performanceFilter === 'last_7_days'
                  ? 8
                  : performanceFilter === 'last_30_days'
                  ? 30
                  : 90,
                'days',
              ),
          ),
    )
    .sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      } else {
        return 0;
      }
    });

  const groupedData: Record<string, number> = {};
  for (let i = 0; i <= labelsDate.length - 1; i++) {
    const datePeriod = labelsDate[i].tz(timezone).startOf('day');

    let nextDatePeriod = labelsDate[i + 1]?.tz(timezone)?.startOf('day');
    const isLastDatePeriod = labelsDate.length - 1 === i;
    if (isLastDatePeriod) {
      nextDatePeriod = datePeriod;
    }

    const sumOfAmountWithinRange = dataArray
      .filter((acc: any) => {
        const formattedDate = dayjs(acc.date).tz(timezone).startOf('day');

        const isDateWithinRange =
          (formattedDate.isAfter(datePeriod) ||
            formattedDate.isSame(datePeriod)) &&
          formattedDate.isBefore(nextDatePeriod);

        return (
          isDateWithinRange ||
          (isLastDatePeriod && formattedDate.isSame(datePeriod))
        );
      })
      .reduce((accumulator: number, obj: any) => {
        return accumulator + obj.amount;
      }, 0);

    groupedData[datePeriod.format('MMM DD')] = sumOfAmountWithinRange;
  }
  return groupedData;
};

export const groupByGraphData = (
  array: { amount: number; created: string }[],
  dateFilter: TypesValues,
  labelsDate: any,
  timezone?: string,
  visitors?: boolean,
): Record<string, number> => {
  if (!array) {
    return {};
  }
  const groupedData: Record<string, number> = {};
  if(array.length === labelsDate.length) {
    for (let i = 0; i < labelsDate.length; i++) {
      const datePeriod = labelsDate[i];
      let nextDatePeriod = labelsDate[i + 1];
      const isLastDatePeriod = labelsDate.length - 1 === i;
      if (isLastDatePeriod) {
        nextDatePeriod = datePeriod;
      }

      if(visitors === true && dateFilter === "today"){
        groupedData[datePeriod.format('hh:mm A')] = array[i]?.amount || (Number.prototype.valueOf,0);
      }
      else {
        groupedData[datePeriod.format('MMM DD')] = array[i]?.amount || (Number.prototype.valueOf,0);
      }
    }
  }
  else{
    labelsDate.map((label: any) => {
        if(visitors === true && dateFilter === "today"){
          const match = array.find((data) => dayjs(data.created).format('hh:mm A') === label.format('hh:mm A'));
          if(match){
            groupedData[label.format('hh:mm A')] = match?.amount
          }
          else{
            groupedData[label.format('hh:mm A')] = (Number.prototype.valueOf,0)
          }
        }
        else {
          const match = array.find((data) => dayjs(data.created).format('MMM DD') === label.format('MMM DD'));

          match ?
            groupedData[label.format('MMM DD')] = match?.amount as number
          :
            groupedData[label.format('MMM DD')] = (Number.prototype.valueOf,0)
        }
    })
  }
  return groupedData;
};