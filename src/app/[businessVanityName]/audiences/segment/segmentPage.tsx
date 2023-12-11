'use client';
import React, { useEffect, useState } from 'react';
import { getSegmentBuilderBasicDetails } from '@graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { useSearchParams } from 'next/navigation';
import PauseCircleIcon from '@assets/icons/PauseCircleIcon';
import ArrowSyncCircleIcon from '@assets/icons/ArrowSyncCircleIcon';
import BasicInformation from '_components/audiences/segment/BasicInformation';
import CustomersDefinitions from '_components/audiences/segment/CustomersDefinitions';
import { PredefinedQueries, Rule } from '@utils/dynamic-query-builder-types';
import { GraphQLResult } from '@aws-amplify/api';
import SirgeSpinner from '_components/loader/SirgeSpinner';
import { BusinessPrisma } from 'API';

export type SegmentType = Rule & {
  city: '';
  country: '';
  state: '';
};

type SegmentPageProps = {
  selectedBusiness: BusinessPrisma | null;
};

const SegmentPage = ({ selectedBusiness }: SegmentPageProps) => {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dynamicRules, setDynamicRules] = useState<any>([]);
  const [cities, setCities] = useState<Array<string>>([]);
  const [countries, setCountries] = useState<Array<string>>([]);
  const [states, setStates] = useState<Array<string>>([]);
  const [predefinedQueries, setPredefinedQueries] = useState<PredefinedQueries>(
    {} as PredefinedQueries,
  );

  const segmentType = params?.get('segmentType') || 'Dynamic';

  useEffect(() => {
    getSegmentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSegmentInfo = async () => {
    try {
      setIsLoading(true);
      const response: any = (await API.graphql(
        graphqlOperation(getSegmentBuilderBasicDetails, {
          getSegmentBuilderBasicDetailsInput: {
            business_id: selectedBusiness?.id,
          },
        }),
      )) as GraphQLResult<any>;

      const respData =
        response &&
        response.data.getSegmentBuilderBasicDetails &&
        response.data.getSegmentBuilderBasicDetails.data;

      if (respData && respData.dynamicQueryRules) {
        setDynamicRules(JSON.parse(respData.dynamicQueryRules));
      }
      if (respData && respData.cities) {
        setCities(
          respData.cities
            .map((item: string) => {
              // Use regular expression to extract city names
              const matches = item.match(/city=([^}]*)/);
              return matches ? matches[1] : null;
            })
            .filter((city: string) => city !== null),
        );
      }

      if (respData && respData.countries) {
        setCountries(
          respData.countries
            .map((item: string) => {
              // Use regular expression to extract city names
              const matches = item.match(/country=([^}]*)/);
              return matches ? matches[1] : null;
            })
            .filter((country: string) => country !== null),
        );
      }

      if (respData && respData.states) {
        setStates(
          respData.states
            .map((item: string) => {
              // Use regular expression to extract city names
              const matches = item.match(/state=([^}]*)/);
              return matches ? matches[1] : null;
            })
            .filter((state: string) => state !== null),
        );
      }

      if (respData && respData.predefinedQueries) {
        setPredefinedQueries(JSON.parse(respData.predefinedQueries));
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full absolute z-50">
          <SirgeSpinner />
        </div>
      ) : (
        <div className={`flex flex-col`}>
          <div className="px-8 py-8 max-h-[95vh] overflow-auto">
            <div className="mx-auto ">
              <div className="flex items-center mb-1">
                <h2 className="h2 flex items-center">Segment details</h2>
              </div>

              <div className="flex items-center mb-6">
                {segmentType === 'Dynamic' ? (
                  <ArrowSyncCircleIcon />
                ) : (
                  <PauseCircleIcon />
                )}
                <span className="ml-1 font-light text-textTeriraryColor">
                  {segmentType} segment
                </span>
              </div>
              <div className="flex-col-1250 flex justify-between">
                <BasicInformation
                  cities={cities}
                  countries={countries}
                  states={states}
                />

                <CustomersDefinitions
                  dynamicRules={dynamicRules}
                  predefinedQueries={predefinedQueries}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SegmentPage;
