import ChecklOutline from '@assets/icons/ChecklOutline';
import { Business, MarketingSources } from '@sirge-io/sirge-types';
import { getAdGroupMinBudget } from '@utils/budget';
import { getPlatformCurrencyForSelectedPlatform } from '@utils/format';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useBoundStore } from '@store/index';
import { BusinessPrisma } from 'API';

interface Props {
  dailyBudgetAmount: number;
  handleSave: () => void;
  setDailyBudget: React.Dispatch<React.SetStateAction<number | null>>;
  budgetDetails: {
    daily_budget: string | number | null;
    lifetime_budget: string | number | null;
    shared_budget_name: string | null;
  };
  itemType: string;
  source: string;
  setErrorText: Dispatch<SetStateAction<string>>;
  errorText: string;
}

const DailyBudgetInput: FC<Props> = ({
  dailyBudgetAmount,
  handleSave,
  setDailyBudget,
  budgetDetails,
  itemType,
  source,
  errorText,
  setErrorText,
}) => {
  const { selectedBusiness } = useBoundStore.getState();
  const [state, setState] = useState<string>(String(dailyBudgetAmount));

  useEffect(() => {
    setDailyBudget(Number(state));
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedValue = e.target.value;
    if (isNaN(Number(e.target.value)) || Number(e.target.value) < 0) return;

    const decimalPoints = e.target.value.split('.')?.[1]?.length;
    if (decimalPoints > 2) {
      updatedValue = `${e.target.value.split('.')?.[0]}.${e.target.value
        .split('.')?.[1]
        .slice(0, 2)}`;
    }

    setState(updatedValue);
  };

  const onSave = () => {
    setErrorText('');
    const currentValue = Number(state);

    if (source === 'tiktok') {
      const currency =
        getPlatformCurrencyForSelectedPlatform(
          MarketingSources.TIKTOK,
          selectedBusiness as unknown as BusinessPrisma,
        ) ?? 'USD';

      const minBudgetValue = getAdGroupMinBudget(itemType, currency) as number;

      if (!currentValue || currentValue < minBudgetValue) {
        return setErrorText(
          `Budget value must be greater than or equal to ${minBudgetValue}`,
        );
      }
    } else if (source === 'facebook') {
      if (!Number.isInteger(currentValue)) {
        return setErrorText('Budget value must be an integer');
      }
    } else if (currentValue <= 0) {
      return setErrorText(`Budget value must be greater than 0`);
    }

    handleSave();
  };

  return (
    <div className="w-full flex items-center">
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <div className="flex items-center border border-[#7B848D] rounded pl-3 w-full">
            <div className="flex items-center h-full bg-[#fff] w-[127px]">
              <span className="text-textTeriraryColor mr-2">
                {budgetDetails?.shared_budget_name
                  ? `Shared ${budgetDetails.shared_budget_name}`
                  : !!budgetDetails.lifetime_budget
                  ? 'Lifetime Budget'
                  : 'Daily Budget'}
              </span>
            </div>
            <div className="w-full h-full">
              <input
                className="input"
                type="text"
                id="dailyBudget"
                value={state}
                onChange={(e) => handleChange(e)}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              />
            </div>
          </div>
          <button className="flex link items-center ml-2" onClick={onSave}>
            <ChecklOutline />
            Save
          </button>
        </div>
        {errorText?.length ? (
          <div className="text-warningColor ml-[127px] text-xs">
            {errorText}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DailyBudgetInput;
