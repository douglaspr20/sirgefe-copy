'use client';
import React, { FC, ReactElement, useMemo } from 'react';
import Image from 'next/image';

interface Props {
  loading?: boolean;
  icon: 'error' | 'warning' | 'success';
  title: string;
  description?: string | ReactElement;
  isdescriptionIndicatorPresent?: boolean;
  action?: () => void;
  actionText?: string;
  loadingButton?: boolean;
  haveDeclineOption?: boolean;
  type?: string;
  setShowConfirmView: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBudgetConfirmation?: React.Dispatch<React.SetStateAction<boolean>>;
  showBudgetConfirmation?: boolean;
}

const ConfirmView: FC<Props> = ({
  loading = false,
  icon,
  title,
  description,
  isdescriptionIndicatorPresent,
  action,
  actionText,
  type,
  loadingButton = false,
  haveDeclineOption = false,
  setShowConfirmView,
  showBudgetConfirmation,
  setShowBudgetConfirmation,
}) => {
  const currentIcon = useMemo(() => {
    return (type === 'status' || type === 'budget') && icon === 'warning'
      ? 'error-icon.svg'
      : `warning-icon.svg`;
  }, [type, icon]);

  return (
    <div className="border rounded-xl border-extraLightColor bg-layoutQuarteryColor flex flex-col items-center p-4 justify-center h-full">
      {loading ? (
        <div className="relative w-[50px] h-[50px] flex justify-center items-center ">
          <div className="absolute">
            <Image
              className="animate-spin"
              src={'/images/spinner.png'}
              width={40}
              height={40}
              alt="spinner"
            />
          </div>
          <Image
            src={'/images/bolt-sm.svg'}
            width={22}
            height={22}
            alt="spinner"
          />
        </div>
      ) : (
        <Image src={`/images/${currentIcon}`} width="32" height="32" alt="" />
      )}

      <h1 className="h5 mt-[0.5%]" style={{ fontWeight: 600 }}>
        {title}
      </h1>

      {isdescriptionIndicatorPresent ? (
        <div className="flex items-center">
          {description && (
            <Image
              src={`/images/${currentIcon}`}
              width="13"
              height="13"
              alt=""
              className="mr-2"
            />
          )}

          <span className="text-yellowColor"> {description}</span>
        </div>
      ) : (
        <>
          <span>{description}</span>
          {!loading && type === 'budget' && (
            <span className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={showBudgetConfirmation}
                  onChange={(e) =>
                    setShowBudgetConfirmation &&
                    setShowBudgetConfirmation(!e.target.checked)
                  }
                />
                <span style={{ marginLeft: '8px' }}>Do not remind me</span>
              </label>
            </span>
          )}
        </>
      )}

      {action && (
        <div className="flex mt-2">
          {loadingButton ? (
            <Image
              className="animate-spin"
              src={'/images/spinner.png'}
              width={20}
              height={20}
              alt="spinner"
            />
          ) : (
            <button className="link" onClick={action}>
              {actionText}
            </button>
          )}

          {haveDeclineOption && (
            <button
              className="text-darkGrade50 ml-3 pointer hover:text-darkGrade75"
              onClick={() => setShowConfirmView(false)}
            >
              Decline
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfirmView;
