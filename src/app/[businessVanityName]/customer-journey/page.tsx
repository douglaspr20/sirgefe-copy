'use client';
import ClickSourcesRatio from '@components/customer-journey/charts/ClickSourceRatio';
import ConversionBySource from '@components/customer-journey/charts/ConversionBySources';
import NewVsReturningVisitorChart from '@components/customer-journey/charts/NewVsReturningVisitors';
import CustomerJourneyTablesWidget from '@components/customer-journey/tables';
import RefreshDataButton from '@components/RefreshDataButton';
import SelectPeriod from '@components/SelectPeriod';
import { getBusinessSourcesById } from '@graphql/queries';
import { SourcesSortObjectType } from '@interfaces/source';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import * as Sentry from '@sentry/nextjs';
import {
  getDateEnd,
  TypesValues as PeriodTypesValue,
  TypesValues as PeriodTypesValues,
  typeValues,
} from '@utils/format';
import { generateSourceName } from '@utils/source';
import { SourcesBusiness } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

const CustomerJorneyPage: NextPage = () => {
  const { selectedBusiness, userProfile } = useBusinessProfileContext();

  const [period, setPeriod] = useState<PeriodTypesValues>('last_7_days');
  const [sourcesGraphState, setSourcesGraphState] = useState<SourcesBusiness[]>(
    [],
  );
  const [loadingGraph, setLoadingGraph] = useState<boolean>(false);

  const handleChangePeriod = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPeriod(e.target.value as PeriodTypesValues);
  };

  const getSources = useCallback(
    async (filters: {
      date_from?: string;
      date_to?: string;
      sort?: SourcesSortObjectType;
      numberOfPage?: number;
    }) => {
      const responseGetSources: any = await API.graphql(
        graphqlOperation(getBusinessSourcesById, {
          getBusinessSourcesByIdInput: {
            business_id: selectedBusiness?.business_id,
            ...(filters.date_from && { date_from: filters.date_from }),
            ...(filters.date_to && { date_to: filters.date_to }),
            ...(filters.sort?.field && { sort: filters.sort }),
            ...(filters.numberOfPage && { numberOfPage: filters.numberOfPage }),
          },
        }),
      );

      return responseGetSources;
    },
    [selectedBusiness?.business_id],
  );

  const date = dayjs()
    .tz(userProfile?.timezone || 'America/Chicago')
    .subtract(1, 'days')
    .format('YYYY-MM-DD');

  useEffect(() => {
    const updateSourcesGraphValues = async () => {
      setLoadingGraph(true);
      const date_from = typeValues(
        false,
        date,
        period as PeriodTypesValue,
        'YYYY-MM-DD',
      ) as string;
      const date_to = getDateEnd(
        userProfile?.timezone || 'America/Chicago',
        period,
      );
      try {
        const response: any = await getSources({
          date_from,
          date_to,
        });

        if (response.data?.getBusinessSourcesById?.error) {
          throw new Error(response.data?.getBusinessSourcesById.error.message);
        }
        const sources: SourcesBusiness[] =
          response.data?.getBusinessSourcesById?.data.sources || [];
        sources.forEach((source) => {
          source.source = generateSourceName(
            source.source,
            selectedBusiness?.shopify_store_domain,
          );
        });
        setSourcesGraphState(sources);
      } catch (error: any) {
        Sentry.captureException(error);
      } finally {
        setLoadingGraph(false);
      }
    };
    updateSourcesGraphValues();
  }, [period, getSources, selectedBusiness?.shopify_store_domain]);

  return (
    <>
      <Head>
        <title>
          Sirge | {`${selectedBusiness?.business_name} - Customer Journey`}
        </title>
      </Head>
      <div className="absolute right-4 top-24 z-10">
        <RefreshDataButton
          business_id={selectedBusiness?.business_id as string}
        />
      </div>
      <div className={`flex flex-col overflow-x-hidden`}>
        <div className="px-8 py-8">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2 flex items-center">Customer Journey</h2>
              <div className="inline-flex items-center">
                <span className="mr-2 whitespace-nowrap text-xs font-medium text-textTeriraryColor">
                  Display data for
                </span>
                <SelectPeriod onChange={handleChangePeriod} period={period} />
              </div>
            </div>

            <div>
              <NewVsReturningVisitorChart period={period} />
            </div>

            <div className="grid grid-cols-2 gap-x-4 relative">
              {/* these 2 graphs take data from the same query, but mappped differently */}
              <ClickSourcesRatio
                sourcesGraphState={sourcesGraphState}
                loadingGraph={loadingGraph}
              />
              <ConversionBySource
                sourcesGraphState={sourcesGraphState}
                loadingGraph={loadingGraph}
              />
            </div>

            <div className="mt-6">
              <CustomerJourneyTablesWidget />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerJorneyPage;
