'use client';
import Image from 'next/image';
import ArrowLeft from '@assets/img/arrow-left.svg';
import ArrowRigh from '@assets/img/arrow-right.svg';
import { ConfirmViewPropsType, DrawerBasicInfo, DrawerOptionProps } from '.';
import { MarketingSources } from '@sirge-io/sirge-types';
import {
  formatMoneyWithDecimals,
  formatRoas,
  getPlatformCurrencyForSelectedPlatform,
} from '@utils/format';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getAdGroupBudgetDetails } from '@graphql/queries';
import dayjs from 'dayjs';
import { AdGroupBudgetDetailsObject, BusinessPrisma } from '../../../API';
import OptionsView from './OptionsView';
import ConfirmView from './ConfirmView';
import { useBoundStore } from '@store/index';

type DailyBudget = {
  name: string;
  status?: string | null;
  daily_budget?: number | null;
  lifetime_budget?: number | null;
  roas?: string | null;
  amount_spent?: number | string | null;
  tcv?: number | null;
  source?: string | null;
  shared_budget_name?: string | null;
};

type Props = {
  setShowBudgetDetailsView: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBusiness: BusinessPrisma;
  basicData: DrawerBasicInfo;
  itemType: string;
  handleOpenDrawer: Dispatch<SetStateAction<DrawerOptionProps>>;
  drawerOptions: DrawerOptionProps;
  confirmViewProps: ConfirmViewPropsType;
  loadingStatus: boolean;
  setShowConfirmView: Dispatch<SetStateAction<boolean>>;
  showConfirmView: boolean;
  currentPurchase: string | null;
  setConfirmViewProps: Dispatch<SetStateAction<ConfirmViewPropsType>>;
  handleStatus: (isOn: boolean) => Promise<void>;
  handleDailyBudget: (amount: number | null) => Promise<void>;
  dailyBudget: number | null;
  setDailyBudget: Dispatch<SetStateAction<number | null>>;
  setErrorText: Dispatch<SetStateAction<string>>;
  errorText: string;
  setShowBudgetConfirmation: Dispatch<SetStateAction<boolean>>;
  showBudgetConfirmation: boolean;
};

const BudgetDetails: React.FunctionComponent<Props> = ({
  setShowBudgetDetailsView,
  basicData,
  itemType,
  selectedBusiness,
  handleOpenDrawer,
  drawerOptions,
  confirmViewProps,
  loadingStatus,
  setShowConfirmView,
  showConfirmView,
  currentPurchase,
  setConfirmViewProps,
  handleDailyBudget,
  handleStatus,
  setDailyBudget,
  dailyBudget,
  errorText,
  setErrorText,
  setShowBudgetConfirmation,
  showBudgetConfirmation,
}) => {
  const [loading, setLoading] = useState(true);
  const [adGroupBudgetDetails, setadGroupBudgetDetails] =
    useState<AdGroupBudgetDetailsObject | null>(null);

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      try {
        setLoading(true);
        const today = dayjs().tz(
          selectedBusiness?.store?.timezone || 'America/Chicago',
        );
        const format = 'YYYY-MM-DD';

        const payload = {
          getAdGroupBudgetDetailsInput: {
            itemType:
              itemType === 'Ad'
                ? 'ads'
                : itemType === 'Campaign'
                ? 'campaigns'
                : 'adSets',
            id: basicData.id,
            dateStart: today.subtract(7, 'day').format(format),
            dateEnd: today.subtract(1, 'day').format(format),
            business_id: selectedBusiness.id,
          },
        };

        const response: any = await API.graphql(
          graphqlOperation(getAdGroupBudgetDetails, payload),
        );

        const responseData = response?.data?.getAdGroupBudgetDetails
          ?.data as AdGroupBudgetDetailsObject;

        setadGroupBudgetDetails(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (basicData) fetchBudgetDetails();
  }, [basicData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen py-10">
        <div className="inline-flex items-center justify-center flex-col">
          <div className="spinner"></div>
          <div className="font-semibold text-primaryColor mt-3">Loading</div>
        </div>
      </div>
    );
  }

  const currency = getPlatformCurrencyForSelectedPlatform(
    basicData?.source as MarketingSources,
    selectedBusiness,
  );

  const budgetAmount =
    basicData.daily_budget ?? basicData.lifetime_budget
      ? (basicData.daily_budget ?? basicData.lifetime_budget)?.toLocaleString(
          'en-US',
          {
            style: 'currency',
            currency: currency?.length ? currency : 'USD',
            maximumFractionDigits: 2,
          },
        )
      : undefined;

  let showBudgetColumn = false;

  adGroupBudgetDetails?.relatedItems?.forEach((item) => {
    if (item?.daily_budget ?? item?.lifetime_budget) {
      showBudgetColumn = true;
    }
  });

  return (
    <>
      <div className="flex items-center">
        <Image
          src={ArrowLeft}
          alt="left"
          className="cursor-pointer "
          onClick={() => setShowBudgetDetailsView(false)}
        />

        <p className="text-textSecondaryColor ml-1 font-bold text-[16px]">
          Budget details
        </p>
      </div>

      <div className="flex flex-col flex-grow">
        {showConfirmView ? (
          <ConfirmView
            {...confirmViewProps}
            loading={loadingStatus}
            setShowConfirmView={setShowConfirmView}
            loadingButton={loadingStatus}
            showBudgetConfirmation={showBudgetConfirmation}
            setShowBudgetConfirmation={setShowBudgetConfirmation}
          />
        ) : (
          <>
            {basicData && (
              <OptionsView
                setShowConfirmView={setShowConfirmView}
                setShowBudgetDetailsView={setShowBudgetDetailsView}
                source_delivery_status={drawerOptions.source_delivery_status}
                is_editing_budget={drawerOptions.is_editing_budget}
                basicData={basicData as DrawerBasicInfo}
                itemType={currentPurchase as string}
                utm_status={drawerOptions.utm_status}
                are_all_ads_connected={drawerOptions.are_all_ads_connected}
                setConfirmViewProps={setConfirmViewProps}
                handleStatus={handleStatus}
                handleDailyBudget={handleDailyBudget}
                dailyBudget={dailyBudget}
                setDailyBudget={setDailyBudget}
                selectedBusiness={selectedBusiness}
                titles={drawerOptions.titles}
                showDetailsButton={false}
                setErrorText={setErrorText}
                errorText={errorText}
              />
            )}
          </>
        )}
      </div>

      <h5 className="my-4 text-sm font-semibold text-darkGrade100">
        {itemType === 'Campaign'
          ? 'You can ad sets under that campaign'
          : itemType === 'Ad Set'
          ? 'Campaign'
          : drawerOptions.titles?.mainTitle?.split(' budget')[0]}
      </h5>

      <div className="flex items-center mt-2">
        <div className="min-w-[150px] max-w-[170px] w-full">
          <span className="font-medium text-textSecondaryColor">
            {itemType === 'Campaign'
              ? 'Ad set '
              : itemType === 'Ad Set'
              ? 'Campaign '
              : drawerOptions.titles?.mainTitle?.split('budget')[0]}
            name
          </span>
        </div>
        <div className="min-w-[65px] max-w-[95px] w-full">
          <span className="font-medium text-textSecondaryColor">Status</span>
        </div>
        {showBudgetColumn ? (
          <div className="min-w-[35px] max-w-[80px] w-full">
            <span className="font-medium text-textSecondaryColor">Budget</span>
          </div>
        ) : (
          <></>
        )}
        <div className="min-w-[35px] max-w-[80px] w-full">
          <span className="font-medium text-textSecondaryColor">ROAS</span>
        </div>
        <div className="min-w-[35px] max-w-[120px] w-full">
          <span className="font-medium text-textSecondaryColor">
            Amount spent
          </span>
        </div>
        <div className="min-w-[35px] max-w-[70px] w-full">
          <span className="font-medium text-textSecondaryColor">TCV</span>
        </div>
      </div>

      {adGroupBudgetDetails?.relatedItems?.map((item, index) => (
        <BudgetItem
          key={index}
          name={item?.ad_set_name ?? item?.campaign_name ?? ''}
          amount_spent={item?.amount_spent as number}
          daily_budget={item?.daily_budget}
          lifetime_budget={item?.lifetime_budget}
          shared_budget_name={item?.shared_budget_name}
          roas={item?.sirge_roas}
          status={item?.source_delivery_status}
          tcv={item?.sirge_total_conversion_value}
          source={item?.source}
        />
      ))}
    </>
  );
};

const BudgetItem: React.FunctionComponent<DailyBudget> = ({
  name,
  status,
  daily_budget,
  lifetime_budget,
  roas,
  amount_spent,
  tcv,
  source,
  shared_budget_name,
}) => {
  const { selectedBusiness } = useBoundStore((state) => state);

  const budgetAmount = (daily_budget ?? lifetime_budget)?.toLocaleString(
    'en-US',
    {
      style: 'currency',
      currency:
        getPlatformCurrencyForSelectedPlatform(
          source as MarketingSources,
          selectedBusiness,
        ) ?? 'USD',
      maximumFractionDigits: 2,
    },
  );

  return (
    <>
      <div className="border rounded-xl border-borderLightColor px-3 py-2 my-2 flex items-center">
        <div className="min-w-[150px] max-w-[155px] w-full">
          <span className="text-textSecondaryColor">{name}</span>
        </div>
        <div className="min-w-[65px] max-w-[100px] w-full">
          <div
            className={`${
              status === 'Active' ? 'bg-greenBgColor' : 'bg-yellowBgColor'
            } w-[65px] rounded-2xl text-center py-1`}
          >
            <span
              className={`${
                status === 'Active' ? 'text-greenDefault' : 'text-yellowColor'
              } text-sm`}
            >
              {status}
            </span>
          </div>
        </div>
        {budgetAmount ? (
          <div className="min-w-[35px] max-w-[80px] w-full">
            <div>
              <span className="text-textSecondaryColor">{budgetAmount}</span>
            </div>
            <span className="text-textTeriraryColor text-xs">
              {shared_budget_name
                ? `Shared ${shared_budget_name}`
                : !!lifetime_budget
                ? 'Lifetime'
                : 'Daily'}
            </span>
          </div>
        ) : (
          <></>
        )}
        <div className="min-w-[35px] max-w-[80px] w-full">
          <span className="text-textSecondaryColor">
            {formatRoas(roas || 0)}
          </span>
        </div>
        <div className="min-w-[35px] max-w-[120px] w-full">
          <span className="text-textSecondaryColor">
            {formatMoneyWithDecimals(
              amount_spent as number,
              selectedBusiness?.store?.currency as string,
            )}
          </span>
        </div>
        <div className="min-w-[35px] max-w-[70px] w-full">
          <span className="text-textSecondaryColor">
            {formatMoneyWithDecimals(
              tcv ?? 0,
              selectedBusiness?.store?.currency as string,
            )}
          </span>
        </div>

        <div className="w-full max-w-[30px] flex justify-end">
          <Image src={ArrowRigh} alt="right" width={24} />
        </div>
      </div>
    </>
  );
};

export default BudgetDetails;
