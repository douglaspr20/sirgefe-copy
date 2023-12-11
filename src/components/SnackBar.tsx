import { useSnackbarContext } from '@providers/snackBarProvider';
import Image from 'next/image';
import { useEffect } from 'react';

export const SnackBar = ({}) => {
  const { displaySnackBar, setSnackBar } = useSnackbarContext();
  const { display, message, severity } = displaySnackBar;

  useEffect(() => {
    return () => {
      setTimeout(() => {
        onClose();
      }, 4000);
    };
  });

  const snackBarTypes = {
    warning: {
      icon: '/images/warning-icon.svg',
      color: 'border-warningColor',
    },
    success: {
      icon: '/images/success-icon.svg',
      color: 'border-greenDefault',
    },
    error: {
      icon: '/images/error-icon.svg',
      color: 'border-yellowColor',
    },
    info: {
      icon: '/images/info-icon.svg',
      color: 'border-primaryColor',
    },
  };

  const onClose = () => {
    setSnackBar({ ...displaySnackBar, display: false });
  };

  return (
    <div className="absolute bottom-5 left-5">
      <div
        className={`flex flex-row  border h-12 shadow-md items-center rounded-md ease-in-out transition-opacity duration-500 ${
          snackBarTypes[severity].color
        }  ${display ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image
          className="mr-2 ml-4"
          alt="warning alert"
          src={snackBarTypes[severity].icon ?? ''}
          width={20}
          height={18.5}
        ></Image>
        <p className="font-medium text-xs">{message}</p>
        <Image
          className="ml-4 mr-4 hover:fill-darkGrade100"
          alt="close button"
          src={'/images/close-icon.svg'}
          width={10}
          height={10}
          onClick={onClose}
        ></Image>
      </div>
    </div>
  );
};
