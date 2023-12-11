import { Metadata } from 'next';
import { useBoundStore } from 'store';
import Image from 'next/image';
import { graphqlOperation } from 'aws-amplify';
import { getStaffById } from '@graphql/queries';
import { UserSession } from '@sirge-io/sirge-types/dist/interfaces/session';
import * as Sentry from '@sentry/nextjs';
import React from 'react';
import UserManagement from '_components/settings/users/userManagement';
import { headers } from 'next/headers';
import amplifySSR from '_auth/amplifySSR.server';

type PageProps = {
  params: {
    [key: string]: string;
    businessVanityName: string;
    userId: string;
  };
};

export const metadata: Metadata = {
  title: 'User Detail Settings',
  description: 'Manage your user settings.',
};

const getStaffInfo = async (id: string) => {
  const cookies = headers().get('cookie');

  const SSR = amplifySSR(cookies as string);

  const { selectedBusiness } = useBoundStore.getState();

  try {
    const response: any = await SSR.API.graphql(
      graphqlOperation(getStaffById, {
        getStaffByIdInput: {
          staff_id: id,
          business_id: selectedBusiness?.id,
        },
      }),
    );

    const staff = response.data.getStaffById.data;

    let formatedDate;

    if (staff.sessions?.length > 0) {
      const getLastActivity: UserSession[] = staff.sessions.sort(
        (a: UserSession, b: UserSession) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      formatedDate = getLastActivity[0].created_at;
    }

    return {
      staff,
      lastActivity: formatedDate,
    };
  } catch (error) {
    Sentry.captureException(error);

    return {
      staff: null,
      lastActivity: null,
    };
  }
};

const Page = async ({ params }: PageProps) => {
  const { isLoading } = useBoundStore.getState();

  const { staff } = await getStaffInfo(params.userId);

  return (
    <>
      <div className="grow px-6 py-4">
        {isLoading && (
          <div className="flex items-center justify-center h-[300px] rounded-lg">
            <div className="inline-flex items-center justify-center flex-col">
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
              <div className="font-semibold text-primaryColor mt-3">
                Updating Results
              </div>
            </div>
          </div>
        )}
        {!isLoading && (
          <div>
            <h2 className="h4 mb-4 flex items-center">
              {`${staff?.first_name} ${staff?.last_name}`}
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="widget-container p-4 mb-4">
                <h5 className="h5 mb-3">Profile</h5>
                <div className="flex flex-col">
                  <UserManagement staffId={params.userId} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
