'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useBoundStore } from '@store/index';

interface Props {
  title?: string;
}

const AdAccountNotConnected = ({ title }: Props) => {
  const router = useRouter();
  const { selectedBusiness } = useBoundStore((state) => state);

  return (
    <div className="tab-content" id="tabs-tabContentFill">
      <div
        className="tab-pane fade show active"
        id="tabs-campaings"
        role="tabpanel"
        aria-labelledby="campaings"
      >
        <div
          className="tab-pane fade show active"
          id="tabs-campaings"
          role="tabpanel"
          aria-labelledby="campaings"
        >
          <div className="py-40 flex flex-col items-center justify-center w-full">
            <div className="mb-2">
              <Image
                width="161"
                height="160"
                src="/images/no-account-connected.svg"
                alt="no-account-connected"
              />
            </div>
            <h5 className="h5 text-textSecondaryColor mb-2">
              You Have Not Connected Your Ad Account{!title && 's'} Yet
            </h5>

            <span className="text-textTeriraryColor text-sm mb-3 capitalize">
              Connect Your {title ? title : 'Facebook and TikTok'} Ad Account
              {!title ? 's ' : ' '}
              To Start Tracking.
            </span>

            <button
              className="btn"
              onClick={() =>
                router.push(
                  `/${selectedBusiness?.vanity_name}/settings/connections`,
                )
              }
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdAccountNotConnected;
