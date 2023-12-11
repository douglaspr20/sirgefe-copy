import dayjs from 'dayjs';
import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  DateValueType,
  PopoverDirectionType,
} from 'react-tailwindcss-datepicker/dist/types';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

type CalendarProps = {
  value: DateValueType;
  onChange: (
    value: DateValueType,
    e?: HTMLInputElement | null | undefined,
  ) => void;
  timezone: string;
  cssClass?: string;
  maxDate?: boolean;
  asSingle?: boolean;
};

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Calendar({
  timezone,
  onChange,
  value,
  cssClass,
  maxDate = true,
  asSingle = false,
}: CalendarProps) {
  const date = dayjs().tz(timezone).format('YYYY-MM-DD');

  return (
    <div>
      <Datepicker
        primaryColor={'blue'}
        value={value}
        onChange={onChange}
        useRange={false}
        configs={{
          shortcuts: {
            customToday: {
              text: 'Today',
              period: {
                start: date,
                end: date,
              },
            },
            customYesterday: {
              text: 'Yesterday',
              period: {
                start: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
                end: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
              },
            },
            last7days: {
              text: 'Last 7 Days',
              period: {
                start: dayjs(date).subtract(7, 'day').format('YYYY-MM-DD'),
                end: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
              },
            },
            last30days: {
              text: 'Last 30 Days',
              period: {
                start: dayjs(date).subtract(30, 'day').format('YYYY-MM-DD'),
                end: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
              },
            },
            thisMonth: {
              text: 'This Month',
              period: {
                start: dayjs(date).startOf('month').format('YYYY-MM-DD'),
                end: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
              },
            },
            lastMonth: {
              text: 'Last Month',
              period: {
                start: dayjs(date)
                  .subtract(1, 'month')
                  .startOf('month')
                  .format('YYYY-MM-DD'),
                end: dayjs(date)
                  .subtract(1, 'month')
                  .endOf('month')
                  .format('YYYY-MM-DD'),
              },
            },
            customAllTime: {
              text: 'All Time',
              period: {
                start: dayjs(date).subtract(90, 'day').format('YYYY-MM-DD'),
                end: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
              },
            },
          },
        }}
        showShortcuts={true}
        showFooter={true}
        popoverDirection={'down' as PopoverDirectionType}
        placeholder={'Select Date'}
        inputClassName={`input pr-9 min-w-[250px] ${cssClass} h-8`}
        classNames={{
          footer: () => 'footerDatePicker',
        }}
        asSingle={asSingle}
        maxDate={maxDate ? dayjs(date).toDate() : null}
        displayFormat="MMM DD, YYYY"
      />
    </div>
  );
}