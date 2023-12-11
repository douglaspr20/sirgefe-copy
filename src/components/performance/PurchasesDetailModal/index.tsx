'use client';
import Pagination from '@components/pagination';
import { getPurchasesByBusinessNew } from '@graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import { PageView } from '@sirge-io/sirge-types';

import NoData from '@components/NoData';
import VisitorItem from './VisitorItem';
import { useBoundStore } from '@store/index';

type PurchasesDetailModalProps = {
  data: any;
  setOpenModal: (data: any) => void;
  selectedPurcahsesIds: number[];
  selectedPurcahsesCount: number | null;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const PurchasesDetailModal: FC<PurchasesDetailModalProps> = ({
  data,
  selectedPurcahsesIds,
  selectedPurcahsesCount,
  activePage,
  setActivePage,
}: PurchasesDetailModalProps) => {
  const {
    currentPlatform,
    currentPurchase,
    currentSelectedDateValue,
    selectedBusiness,
  } = useBoundStore((state) => state);

  const [pageTotal, setPageTotal] = useState(1);

  const [loading, setLoading] = useState(true);

  const [visitors, setVisitors] = useState<PageView[]>([]);

  useEffect(() => {
    setActivePage(0);
  }, [selectedPurcahsesCount]);

  const fetchAllVisitors = async () => {
    try {
      if (!selectedPurcahsesIds?.length) return;

      setLoading(true);
      const dateFrom = dayjs(currentSelectedDateValue?.startDate).format(
        'YYYY-MM-DD',
      );
      const dateTo = dayjs(currentSelectedDateValue?.endDate).format(
        'YYYY-MM-DD',
      );
      let typePurchases = '';
      if (currentPurchase === 'Campaigns') typePurchases = 'campaigns';
      if (currentPurchase === 'Ad sets') typePurchases = 'ad_sets';
      if (currentPurchase === 'Ads') typePurchases = 'ads';

      const payload = {
        business_id: selectedBusiness?.id,
        date_from: dateFrom,
        date_to: dateTo,
        source: currentPlatform,
        selected_ids: selectedPurcahsesIds,
        typePurchases,
        per_page: 10,
        page_no: activePage + 1,
      };

      const response: any = await API.graphql(
        graphqlOperation(getPurchasesByBusinessNew, {
          getPurchaseByBusinessInput: payload,
        }),
      );
      if (response.data.getPurchasesByBusinessNew.data?.error) {
        Sentry.captureException(
          new Error(response.data.getPurchasesByBusinessNew.data?.error),
        );
      } else {
        const rows = response.data.getPurchasesByBusinessNew.data;
        setVisitors(rows ?? []);
        setPageTotal(response.data.getPurchasesByBusinessNew.numberPages ?? 1);
      }
    } catch (e) {
      setVisitors([]);
      Sentry.captureException(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllVisitors();
  }, [selectedPurcahsesIds, activePage]);

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between relative mb-[2px]">
          <h3 className="h3">
            {selectedPurcahsesCount} Order
            {Number(selectedPurcahsesCount) > 1 ? 's' : ''}
          </h3>

          <button
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>
        <p className="text-textTeriraryColor text-xs capitalize">
          {selectedPurcahsesIds.length > 1
            ? `${currentPlatform?.split(' ')?.[0]} ${currentPurchase}`
            : `${currentPurchase?.slice(0, -1)} - ${data?.campaign_name}`}
        </p>
        <div className="max-h-full relative mt-4">
          {loading ? (
            <div className="flex items-center justify-center bg-white w-[776px] h-[550px] border-[1px] border-extraLightColor rounded-lg ">
              <div className="inline-flex items-center justify-center flex-col">
                <div className="relative w-[58px] h-[58px] flex justify-center items-center ">
                  <div className="absolute top-0 left-0 right-0 bottom-0">
                    <Image
                      className="animate-spin"
                      src={'/images/spinner.png'}
                      width={58}
                      height={58}
                      alt="spinner"
                    />
                  </div>
                  <Image
                    src={'/images/bolt-sm.svg'}
                    width={32}
                    height={32}
                    alt="spinner"
                  />
                </div>
                <div className="font-semibold text-primaryColor mt-3">
                  Updating Results
                </div>
              </div>
            </div>
          ) : (
            <div className="table-scroll border border-extraLightColor rounded-lg overflow-x-auto relative max-h-full">
              <table className="main-table w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                      Visitor
                    </th>
                    <th className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                      Orders
                    </th>
                    <th className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                      Total Conversion Value
                    </th>
                    <th className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r-0 border-extraLightColor text-left">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visitors?.map((visitor: PageView, index: number) => (
                    <VisitorItem visitor={visitor} key={index} />
                  ))}
                </tbody>
              </table>

              {!visitors.length && <NoData />}
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-center pt-4">
            <Pagination
              currentPage={activePage}
              onChangeCurrentPage={setActivePage}
              numberPages={pageTotal}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PurchasesDetailModal;
