import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';

interface Props {
  children: ReactNode;
}

const SettingsLayout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const { selectedBusiness } = useBusinessProfileContext();

  return (
    <div className="flex flex-row">
      <div className="flex flex-col px-8 min-w-[225px] w-100 border-right-darkgrey h-screen">
        <h2 className="h3 mb-4 ml-2 mt-[30px]">Settings</h2>

        <ul>
          <li>
            <Link
              href={`/${selectedBusiness?.vanity_name}/settings/profile`}
              className={`w-full rounded-lg py-2 px-3 inline-flex items-center text-textSecondaryColor transition-all ${
                router.pathname.includes('/profile') && 'bg-darkGrade25'
              }`}
            >
              <i
                className={`icon-person text-xl mr-2 leading-5 ${
                  router.pathname.includes('/profile')
                    ? 'text-darkGrade75'
                    : 'text-darkGrade50'
                }`}
              ></i>
              Profile
            </Link>
          </li>

          <li>
            <Link
              href={`/${selectedBusiness?.vanity_name}/settings/connections`}
              className={`w-full rounded-lg py-2 mt-2 px-3 inline-flex items-center text-textSecondaryColor transition-all ${
                router.pathname.includes('/connections') && 'bg-darkGrade25'
              }`}
            >
              <i
                className={`icon-integration text-xl mr-2 leading-5 ${
                  router.pathname.includes('/connections')
                    ? 'text-darkGrade75'
                    : 'text-darkGrade50'
                }`}
              ></i>
              Connections
            </Link>
          </li>

          <li>
            <Link
              href={`/${selectedBusiness?.vanity_name}/settings/my-store`}
              className={`w-full rounded-lg py-2 mt-3 px-3 inline-flex items-center text-textSecondaryColor transition-all ${
                router.pathname.includes('/my-store') && 'bg-darkGrade25'
              }`}
            >
              <i
                className={`icon-building-retai-more text-xl mr-2 leading-5 ${
                  router.pathname.includes('/my-store')
                    ? 'text-darkGrade75'
                    : 'text-darkGrade50'
                }`}
              ></i>
              My Store
            </Link>
          </li>

          <li>
            <Link
              href={`/${selectedBusiness?.vanity_name}/settings/users`}
              className={`w-full rounded-lg py-2 mt-3 px-3 inline-flex items-center text-textSecondaryColor transition-all ${
                router.pathname.includes('/users') && 'bg-darkGrade25'
              }`}
            >
              <i
                className={`icon-people-settings text-xl leading-5 mr-2 
              ${
                router.pathname.includes('/users')
                  ? 'text-darkGrade75'
                  : 'text-darkGrade50'
              }`}
              ></i>
              Users
            </Link>
          </li>

          <li>
            <Link
              href={`/${selectedBusiness?.vanity_name}/settings/billing`}
              className={`w-full rounded-lg py-2 mt-3 px-3 inline-flex items-center text-textSecondaryColor transition-all ${
                router.pathname.includes('/billing') && 'bg-darkGrade25'
              }`}
            >
              <i
                className={`icon-wallet text-xl leading-5 mr-2 ${
                  router.pathname.includes('/billing')
                    ? 'text-darkGrade75'
                    : 'text-darkGrade50'
                }`}
              ></i>
              Billing
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default SettingsLayout;
