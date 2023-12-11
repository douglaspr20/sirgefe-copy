import React, { FC, useState } from 'react';
import Image from 'next/image';
import EyeImage from 'next/image';
import Pagination from '@components/pagination';
import { AudienceTableDataType } from 'app/[businessVanityName]/audiences/dynamicQuery/dynamicQueryPage';
import SirgeSpinner from '@components/loader/SirgeSpinner';

type DynamicDataProps = {
  data: AudienceTableDataType[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  record: number;
  isLoading: boolean;
};

type HeadRowType = {
  [key: string]: string;
  // customer_id: string;
  average_conversion_value: string;
  // email_address: string;
  customer_name: string;
  // zip: string;
  // city: string;
  // state: string;
  // country: string;
  // first_order_date: string;
  quantity: string;
  thirty_day_order_count: string;
  ninety_day_order_count: string;
};

const headRows: HeadRowType = {
  customer_name: 'Name',
  quantity: 'Page Views',
  average_conversion_value: 'Average Order Value',
  thirty_day_order_count: 'Orders',
  ninety_day_order_count: 'Added Revenue',
  first_order_date: 'First Visit',
  last_order_date: 'Last Visit',
};

const infoIcon = ['Orders', 'Added Revenue', 'First Visit', 'Last Visit'];

const columnSequence = Object.keys(headRows);

function convertDateFormat(inputDate: string) {
  const outputDate = new Date(inputDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return outputDate.replace(' at', ',');
}

const SegmentDataTable: FC<DynamicDataProps> = ({
  data,
  currentPage,
  setCurrentPage,
  record,
  isLoading
}) => {
  const sumValues = (key: string) => {
    let value = 0;
    data.forEach((item: any) => {
      value += Number(item[key]);
    });
    return value;
  };

  const handleCurrentPage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-lg py-3">Customers</h1>
        <div className="flex items-center">
          <Image
            src={'/images/filter.svg'}
            alt={'filter'}
            width={20}
            height={20}
            style={{ marginRight: '6px' }}
          />
          <p className="font-medium text-[#A1B3C3]">Filters</p>
        </div>
      </div>
      {isLoading ? (<div className="min-h-[400px] w-full grid place-items-center">
        <SirgeSpinner />
      </div>) : <div className="w-full h-full">
        <div className="bg-white dark:bg-gray-800 relative sm:rounded-lg overflow-hidden w-full h-full">
          <div className="overflow-x-auto w-full max-h-[33rem] max-h-full query-table">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#34404B] bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
                <tr>
                  {columnSequence.map((item) => {
                    return (
                      <th
                        key={item}
                        scope="col"
                        className="pl-4 pr-16 min-h-[48px]   "
                      >
                        {infoIcon.filter((i) => headRows[item] === i).length ? (
                          <div className="flex items-center">
                            {headRows[item]}
                            <Image
                              src={'/images/infoIcon.svg'}
                              alt={'info icon'}
                              width={17}
                              height={17}
                              style={{ marginLeft: '2px' }}
                            />
                          </div>
                        ) : (
                          <> {headRows[item]}</>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className={`border-b dark:border-gray-700`}
                  >
                    {columnSequence.map((columnKey) => {
                      const value =
                        item[columnKey as keyof AudienceTableDataType];
                      return (
                        <td
                          key={columnKey}
                          className="pl-4 pr-16 min-h-[48px]"
                          style={{ width: '150px' }}
                        >
                          <div className="flex">
                            {headRows[columnKey] === 'Average Order Value' ||
                              headRows[columnKey] === 'Added Revenue' ? (
                              <span>${value}</span>
                            ) : headRows[columnKey] === 'First Visit' ||
                              headRows[columnKey] === 'Last Visit' ? (
                              <span>{convertDateFormat(value as string)}</span>
                            ) : (
                              value || '0'
                            )}
                            {headRows[columnKey] === 'Name' ? (
                              <Image
                                src={'/images/link-to.svg'}
                                alt={'link-to'}
                                width={15}
                                height={15}
                                style={{ marginLeft: '4px' }}
                                className={"cursor-pointer"}
                              />
                            ) : headRows[columnKey] === 'Orders' ? (
                              <EyeImage
                                src={'/images/Eye.svg'}
                                alt={'link-to'}
                                width={15}
                                height={15}
                                style={{ marginLeft: '4px' }}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr
                  className={`border-b bg-red dark:border-gray-700 sticky-row sticky bottom-[-2px]`}
                >
                  <td className="bg-[#FCFCFC]">
                    Summary for {data.length} Customers
                  </td>
                  <td className="bg-[#FCFCFC]">{sumValues('quantity')}</td>
                  <td className="bg-[#FCFCFC]">
                    {sumValues('average_conversion_value').toFixed(2)}
                  </td>
                  <td className="bg-[#FCFCFC]">
                    {sumValues('thirty_day_order_count')}
                  </td>
                  <td className="bg-[#FCFCFC]">
                    {sumValues('ninety_day_order_count')}
                  </td>
                  <td className="bg-[#FCFCFC]"></td>
                  <td className="bg-[#FCFCFC]"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>}
      {!!record && (<div className="flex items-center justify-center py-4 sticky bottom-0 bg-white">
        <Pagination
          currentPage={currentPage}
          onChangeCurrentPage={(page) => handleCurrentPage(page)}
          numberPages={Math.ceil(record / 10)}
        />
      </div>)}
    </section>
  );
};
export default SegmentDataTable;
