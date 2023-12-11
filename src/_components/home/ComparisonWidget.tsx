'use client';
import React, { useEffect, useState } from 'react';
import Tooltip from '@components/Tooltip';
import Image from 'next/image';
import toolTipIcon from '@images/tooltip.svg';
import SelectPeriod from '@components/SelectPeriod';
import NoData from '@components/NoData';
import AnalyticsComparison from '_components/home/AnalyticsComparison';
import { ComparationPrisma } from '@interfaces/comparation';
import { getDateEnd, TypesValues, typeValues } from '@utils/format';
import FullWidthModal from '@components/modals/FullWidthModal';
import CompareModal from '_components/modals/CompareModal.client';
import { API, graphqlOperation } from 'aws-amplify';
import { getAdcomparisonData } from '@graphql/queries';
import dayjs from 'dayjs';

import { useBoundStore } from '@store/index';

interface Props {
  source: string;
  isSending: boolean;
}

const ComparisonWidget: React.FC<Props> = ({ source, isSending }) => {
  const { selectedBusiness } = useBoundStore((state) => state);
  const [adComparisonPeriod, setAdComparisonPeriod] =
    useState<TypesValues>('last_7_days');
  const [comparison, setComparison] = useState<string>('ads');
  const [itemsForComparison, setItemsForComparison] = useState([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataAdComparison, setDataAdComparison] = useState<any>([]);
  const date = dayjs()
    .tz(selectedBusiness?.store?.timezone || 'America/Chicago')
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  const dateStart = typeValues(
    true,
    date,
    adComparisonPeriod,
    'YYYY-MM-DD',
  ) as string;

  const dateEnd = getDateEnd(
    selectedBusiness?.store?.timezone || 'America/Chicago',
    adComparisonPeriod,
  );

  const fetchComparisonProduct = async (businessId: string) => {
    setDataAdComparison([]);
    setLoading(true);
    const response: any = await API.graphql(
      graphqlOperation(getAdcomparisonData, {
        getBusinessAnalyticsInput: {
          business_id: businessId,
          dateStart,
          dateEnd,
          fetchOnlyActive: true,
          limit: 3,
          source: source,
          level: comparison.toLowerCase().slice(0, -1),
          sort: [
            {
              field: 'roas',
              direction: 'desc',
            },
            {
              field: 'total_amount_spent',
              direction: 'desc',
            },
          ],
        },
      }),
    );

    const adcomparisonData = response?.data?.getAdcomparisonData?.data || [];

    setDataAdComparison(adcomparisonData);
    setLoading(false);
  };

  const handleChangePeriod = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAdComparisonPeriod(e.target.value as TypesValues);
  };

  useEffect(() => {
    if (selectedBusiness?.id) {
      fetchComparisonProduct(selectedBusiness.id!);
    }
  }, [source, selectedBusiness?.id, comparison, adComparisonPeriod]);

  //
  return (
    <>
      <div className="relative">
        <div>
          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center">
              <h4 className="h4">Best Performing & Comparison</h4>

              <Tooltip
                title="Compare the performance of the creatives from each campaign, ad set, and ad."
                anchorId="best-performing"
              />
              <span className="ml-1 cursor-pointer" id="best-performing">
                <Image
                  src={toolTipIcon}
                  alt="tooltip-info"
                  width={13}
                  height={13}
                />
              </span>
            </div>

            <div className="inline-flex items-center flex-shrink-0">
              <span className="font-medium text-textTeriraryColor text-xs mr-2 whitespace-nowrap">
                Display Data For
              </span>
              <SelectPeriod
                onChange={(e) => handleChangePeriod(e)}
                period={adComparisonPeriod}
                analytics={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="widget-container p-5 relative mb-5">
        <div className="mb-3 flex justify-between">
          <div className="p-1.5 rounded-md inline-flex items-center justify-center bg-greyLight logic-switcher">
            <div className="logic-switcher__item mr-1 last:mr-0">
              <input
                onChange={(e) => {
                  setComparison(e.target.id);
                  setItemsForComparison([]);
                }}
                type="radio"
                id="ads"
                name="comparison-switcher"
                checked={comparison === 'ads'}
              />
              <label htmlFor="ads">Ads</label>
            </div>

            <div className="logic-switcher__item mr-1 last:mr-0">
              <input
                onChange={(e) => {
                  setComparison(e.target.id);
                  setItemsForComparison([]);
                }}
                type="radio"
                id="adsets"
                name="comparison-switcher"
              />
              <label htmlFor="adsets">Ad Sets</label>
            </div>

            <div className="logic-switcher__item mr-1 last:mr-0">
              <input
                type="radio"
                id="campaigns"
                onChange={(e) => {
                  setComparison(e.target.id);
                  setItemsForComparison([]);
                }}
                name="comparison-switcher"
              />
              <label htmlFor="campaigns">Campaigns</label>
            </div>
          </div>
          <div
            className={`inline-flex ${
              itemsForComparison.length > 0 ? 'block' : 'hidden'
            }  items-center`}
          >
            <div
              className={`pr-4 mr-4 relative first:pl-0 last:pr-0 after:content-[''] after:block after:absolute after:h-6 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25`}
            >
              <button
                className="inline-flex items-center text-darkGrade50 hover:text-darkGrade75"
                onClick={() => setItemsForComparison([])}
              >
                <i className="icon-arrow-clockwise mr-2 text-xl"></i>
                Reset to default
              </button>
            </div>
            <div className="inline-flex">
              <button
                data-bs-toggle="modal"
                data-bs-target="#campaignsCompairModal"
                className="inline-flex text-xl text-darkGrade50 hover:text-darkGrade75"
              >
                <i className="icon-settings-line"></i>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-100 py-10 mt-7">
            <div className="inline-flex items-center justify-center flex-col">
              <div className="spinner"></div>
              <div className="font-semibold text-primaryColor mt-3">
                Loading
              </div>
            </div>
          </div>
        ) : (
          <>
            {!dataAdComparison || dataAdComparison?.length === 0 ? (
              <NoData />
            ) : (
              <div className="grid grid-cols-4 gap-x-3">
                {itemsForComparison.length > 0 ? (
                  <>
                    {itemsForComparison
                      .sort((a: any, b: any) => b.roas - a.roas)
                      .map((item: any, index: number) => (
                        <AnalyticsComparison
                          key={index}
                          id={item.id.split('-')[0]}
                          comparisonIndex={index}
                          name={item.ad_name}
                          status={item.ad_primary_status.toUpperCase()}
                          total_amount_spent={item.total_amount_spent}
                          impact={4 - index}
                          purchases={item.total_orders}
                          images={item.ad_images}
                          roas={item.roas}
                          source={item.source}
                          comparation={comparison}
                          total_conversion_value={item.total_conversion_value}
                        />
                      ))}
                  </>
                ) : dataAdComparison ? (
                  <>
                    {dataAdComparison?.map(
                      (item: ComparationPrisma, index: number) => (
                        <AnalyticsComparison
                          key={index}
                          id={item.id.split('-')[0]}
                          comparisonIndex={index}
                          name={item.ad_name}
                          status={'ACTIVE'}
                          total_amount_spent={item.total_amount_spent}
                          purchases={item.total_orders}
                          impact={4 - index}
                          images={item.ad_images}
                          roas={item.roas}
                          source={item.source}
                          comparation={comparison}
                          total_conversion_value={item.total_conversion_value}
                        />
                      ),
                    )}
                  </>
                ) : null}
                {itemsForComparison.length === 0 ? (
                  <>
                    <div className="flex flex-col items-center justify-center rounded-lg border border-extraLightColor p-7">
                      <div className="inline-flex items-center justify-center bg-primaryExtraLightColor rounded-full w-14 h-14 flex-shrink-0 mb-3">
                        <i className="icon-data-histogram text-2xl text-primaryColor"></i>
                      </div>
                      <div className="text-textSecondaryColor font-semibold mb-1">
                        Custom Compare
                      </div>
                      <p className="text-center text-xs text-textTeriraryColor mb-4">
                        Compare your ads to see what brings the best impact on
                        business.
                      </p>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#campaignsCompairModal"
                        className="inline-flex items-center font-medium justify-center text-primaryColor hover:text-primaryColorHover"
                        onClick={() => setShowDialog(true)}
                      >
                        <i className="icon-spark mr-2 text-xl"></i>
                        Custom Compare
                      </button>
                    </div>
                  </>
                ) : itemsForComparison.length < 4 ? (
                  <>
                    <div className="flex flex-col items-center justify-center rounded-lg border border-extraLightColor p-7">
                      <div className="text-textSecondaryColor font-semibold mb-1">
                        Add campaign
                      </div>
                      <p className="text-center text-xs text-textTeriraryColor mb-4">
                        Ad other campaigns to compare
                      </p>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#campaignsCompairModal"
                        className="inline-flex items-center font-medium justify-center text-primaryColor hover:text-primaryColorHover"
                        onClick={() => setShowDialog(true)}
                      >
                        <i className="icon-spark mr-2 text-xl"></i>
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </>
        )}
      </div>

      {selectedBusiness && (
        <FullWidthModal
          id="campaignsCompairModal"
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        >
          <CompareModal
            source={source}
            businessId={selectedBusiness.id}
            setCompare={setItemsForComparison}
            itemsCompare={itemsForComparison}
            isSending={isSending}
            tabCompare={comparison}
            dateStart={dateStart}
            dateEnd={dateEnd}
            showDialog={showDialog}
          />
        </FullWidthModal>
      )}
    </>
  );
};

export default ComparisonWidget;
