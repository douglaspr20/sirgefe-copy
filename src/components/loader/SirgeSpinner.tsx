import Image from 'next/image';
import { FC } from 'react';

interface Props {
  text?: string;
  size?: 'small' | 'large';
  className?: string;
}

const SirgeSpinner: FC<Props> = ({ text = '', size, className }) => {
  if (size === 'small') {
    return (
      <>
        {/* animate spin + icon inside */}
        <div
          className={`relative w-[30px] h-[30px] flex justify-center items-center ${className}`}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <Image
              className="animate-spin"
              src={'/images/spinner.png'}
              width={30}
              height={30}
              alt="spinner"
            />
          </div>
          <Image
            src={'/images/bolt-sm.svg'}
            width={18}
            height={18}
            alt="spinner"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center h-full w-full bg-transparent ${className}`}
      >
        {/* animate spin + icon inside */}
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

        <div className="font-semibold text-primaryColor mt-3">{text}</div>
      </div>
    </>
  );
};

export default SirgeSpinner;
