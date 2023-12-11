import Image from 'next/image';
import React, { FC } from 'react';
import { Business, MarketingSources } from '@sirge-io/sirge-types';
import { getPlatformCurrencyForSelectedPlatform } from '@utils/format';
import { BusinessPrisma } from '../../../API';

interface Props {
  source: MarketingSources;
  selectedBusiness: BusinessPrisma;
  budgetDetails: {
    daily_budget: string | number | null;
    lifetime_budget: string | number | null;
    shared_budget_name: string | null;

    titles?: {
      mainTitle: string;
      tooltipTitle: string;
    };
  };
  editAction: () => void;
  setShowBudgetDetailsView: React.Dispatch<React.SetStateAction<boolean>>;
  itemType: string;
  showDetailsButton: boolean;
}

const DailyBudgetOption: FC<Props> = ({
  source,
  selectedBusiness,
  budgetDetails,
  itemType,
  editAction,
  setShowBudgetDetailsView,
  showDetailsButton,
}) => {
  const currency = getPlatformCurrencyForSelectedPlatform(
    source,
    selectedBusiness,
  );

  const budgetAmount =
    budgetDetails.daily_budget ?? budgetDetails.lifetime_budget
      ? (
          budgetDetails.daily_budget ?? budgetDetails.lifetime_budget
        )?.toLocaleString('en-US', {
          style: 'currency',
          currency: currency?.length ? currency : 'USD',
          maximumFractionDigits: 2,
        })
      : undefined;

  return (
    <>
      <div className="flex flex-col">
        <span className="text-textSecondaryColor">
          {budgetDetails.shared_budget_name
            ? `Shared ${budgetDetails.shared_budget_name}`
            : budgetAmount
            ? !!budgetDetails.lifetime_budget
              ? 'Lifetime Budget'
              : 'Daily Budget'
            : 'Budget'}
        </span>
        <span className="font-semibold text-sm text-darkGrade100 mt-1">
          {budgetAmount ? budgetAmount : budgetDetails?.titles?.tooltipTitle}
        </span>
      </div>

      <div className="flex items-center">
        {budgetAmount ? (
          <button
            className="inline-flex items-center cursor-pointer"
            onClick={editAction}
          >
            <Image
              src="/images/edit-icon.svg"
              width={20}
              height={20}
              alt="edit"
            />
            <span className="link ml-2">Edit</span>
          </button>
        ) : (
          <></>
        )}

        {showDetailsButton ? (
          <div className="inline-flex items-center text-darkGrade50 ml-2 pointer hover:text-darkGrade75">
            <i className="icon-eye-line text-xl" />
            <span
              className="ml-1"
              onClick={() => setShowBudgetDetailsView(true)}
            >
              Details
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DailyBudgetOption;
