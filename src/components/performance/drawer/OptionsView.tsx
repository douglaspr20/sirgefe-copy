import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import { ConfirmViewPropsType, DrawerBasicInfo } from '.';
import { checkSecondaryStatus } from '@utils/checkSecondaryStatus';
import AdStatusToggle from '../AdStatusToggle';
import InactiveAdStatusToggle from '../InactiveAdStatusToggle';
import DailyBudgetOption from './DailyBudgetOption';
import DailyBudgetInput from './DailyBudgetInput';
import { Business, MarketingSources } from '@sirge-io/sirge-types';
import { BusinessPrisma } from '../../../API';

interface Props {
  setShowConfirmView: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBudgetDetailsView: React.Dispatch<React.SetStateAction<boolean>>;
  basicData: DrawerBasicInfo;
  itemType: string;
  utm_status: boolean;
  are_all_ads_connected: boolean;
  source_delivery_status: string;
  setConfirmViewProps: React.Dispatch<
    React.SetStateAction<ConfirmViewPropsType>
  >;
  handleStatus: (isOn: boolean) => void;
  handleDailyBudget: (amount: number | null) => void;
  dailyBudget: number | null;
  setDailyBudget: React.Dispatch<React.SetStateAction<number | null>>;
  selectedBusiness: BusinessPrisma;
  is_editing_budget: boolean;
  titles?: {
    mainTitle: string;
    tooltipTitle: string;
  };
  showDetailsButton: boolean;
  setErrorText: Dispatch<SetStateAction<string>>;
  errorText: string;
}

const OptionsView: FC<Props> = ({
  setShowConfirmView,
  setShowBudgetDetailsView,
  basicData,
  itemType,
  utm_status,
  are_all_ads_connected,
  is_editing_budget,
  source_delivery_status,
  setConfirmViewProps,
  handleStatus,
  handleDailyBudget,
  dailyBudget,
  setDailyBudget,
  selectedBusiness,
  titles,
  showDetailsButton,
  errorText,
  setErrorText,
}) => {
  const [checked, setChecked] = useState(false);

  const [isEditingBudget, setIsEditingBudget] = useState(is_editing_budget);

  useEffect(() => {
    if (is_editing_budget) setIsEditingBudget(is_editing_budget);
  }, [is_editing_budget]);

  const utmConnectionStatus = useMemo(() => {
    return process.env.NEXT_PUBLIC_SHOW_UTM_INJECTION === 'show' &&
      ((itemType === 'Ads' && !utm_status) ||
        (itemType !== 'Ads' && !are_all_ads_connected))
      ? 'No Active'
      : 'Active';
  }, [itemType, utm_status, are_all_ads_connected]);

  return (
    <>
      {showDetailsButton ? (
        <div className="border rounded-xl border-extraLightColor bg-layoutQuarteryColor px-4 py-2 flex items-center mb-2 justify-between">
          <div className="flex flex-col">
            <span className="text-textSecondaryColor">Status</span>
            <span
              className={`tag ${
                basicData.source_delivery_status === 'Active'
                  ? 'green'
                  : 'yellow'
              }`}
            >
              {basicData.source_delivery_status}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-semibold text-lg text-textSecondaryColor mr-2">
              Off/On
            </span>

            {checkSecondaryStatus(basicData, itemType, basicData?.ad_type) ? (
              <>
                <AdStatusToggle
                  item={basicData}
                  isStatusUpdated={basicData.id as string}
                  onChange={() => {
                    setChecked(!checked);
                    handleStatus(basicData.source_delivery_status === 'Active');
                    setShowConfirmView(true);
                  }}
                  isTable={false}
                  reminderStatus={selectedBusiness.reminder_status || false}
                />
              </>
            ) : (
              <>
                <InactiveAdStatusToggle
                  item={basicData}
                  adType={itemType}
                  source={basicData?.source}
                  isTable={false}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="border rounded-xl border-extraLightColor bg-layoutQuarteryColor px-4 py-2 flex items-center mb-1 justify-between">
        {isEditingBudget ? (
          <DailyBudgetInput
            dailyBudgetAmount={
              basicData?.daily_budget ?? (basicData?.lifetime_budget as number)
            }
            setDailyBudget={setDailyBudget}
            handleSave={() => {
              setIsEditingBudget(false);
              handleDailyBudget(dailyBudget);
              setShowConfirmView(true);
            }}
            budgetDetails={{
              daily_budget: basicData?.daily_budget,
              lifetime_budget: basicData?.lifetime_budget,
              shared_budget_name: basicData?.shared_budget_name,
            }}
            itemType={itemType}
            source={basicData?.source}
            errorText={errorText}
            setErrorText={setErrorText}
          />
        ) : (
          <DailyBudgetOption
            source={basicData?.source as MarketingSources}
            selectedBusiness={selectedBusiness}
            budgetDetails={{
              daily_budget: basicData?.daily_budget,
              lifetime_budget: basicData?.lifetime_budget,
              titles: titles,
              shared_budget_name: basicData?.shared_budget_name,
            }}
            editAction={() => setIsEditingBudget(true)}
            setShowBudgetDetailsView={setShowBudgetDetailsView}
            itemType={itemType}
            showDetailsButton={showDetailsButton}
          />
        )}
      </div>
      {showDetailsButton ? (
        <div className="flex mt-1">
          {itemType !== 'Ad sets' && itemType !== 'Ads' && (
            <div className="inline-flex items-center mr-2">
              <Image
                src="/images/clipboard-light.svg"
                alt="Ad sets"
                width={20}
                height={20}
              />

              <span className="text-textSecondaryColor">
                {basicData.no_of_adsets !== 1
                  ? `${basicData.no_of_adsets} Ad Sets`
                  : `${basicData.no_of_adsets} Ad Set`}
              </span>
            </div>
          )}

          {itemType !== 'Ads' && (
            <div className="inline-flex items-center mr-2">
              <Image
                src="/images/mega-phone-light.svg"
                alt="Ads"
                width={20}
                height={20}
              />

              <span className="text-textSecondaryColor">
                {basicData.no_of_ads !== 1
                  ? `${basicData.no_of_ads} Ads`
                  : `${basicData.no_of_ads} Ad`}
              </span>
            </div>
          )}

          <div className="inline-flex items-center">
            <i
              className={`icon-integration text-xl leading-5 text-darkGrade50`}
            />

            <span className="text-textSecondaryColor">UTM Connection</span>
            <span
              className={`tag ${
                utmConnectionStatus === 'Active' ? 'green' : 'yellow'
              } ml-1`}
            >
              {utmConnectionStatus}
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OptionsView;
