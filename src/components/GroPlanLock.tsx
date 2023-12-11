import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const GroPlanLock = () => {
  const router = useRouter();

  return (
    <>
      <div
        className="flex flex-col justify-center items-center gap-2 absolute w-full h-full secondary-gradient-bg blur-background-effect"
        style={{ marginTop: -15, zIndex: 999 }}
      >
        <div
          className="flex flex-col items-center bg-white rounded-md outline-none text-current p-[32px]"
          style={{
            boxShadow: '0px 12px 40px rgba(36, 143, 155, 0.15)',
            borderRadius: '12px',
          }}
        >
          <div className="logo-radius-container mb-[12px]">
            <Image
              src={'/images/lock.svg'}
              width={20}
              height={20}
              alt="lock icon"
            />
          </div>

          <h4 className="h4 mb-[4px]">Break the limits with Sirge</h4>

          <span className="text-textSecondaryColor font-light leading-4 mb-[12px]">
            Increase your performance
          </span>

          <button
            type="submit"
            className="btn ml-3 flex items-center"
            onClick={() => {
              router.push('/settings/billing');
            }}
          >
            <i className="icon-spark mr-2" />
            <span>Power UP</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default GroPlanLock;
