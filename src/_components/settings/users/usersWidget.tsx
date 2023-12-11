'use client';

import Popover from '_components/Popover';
import Image from 'next/image';
import TailwindModal from '_components/modals/TailwindModal';
import { useEffect, useMemo, useRef, useState } from 'react';
import CreateStaffAccountModal from '_components/settings/users/create-staff-account-modal';
import { initialName } from '@utils/initialName';
import Message, {
  ValidTypeMessages,
} from '_components/modals/tailwindTypes/Message';
import { useBoundStore } from '@store/index';
import { API } from 'aws-amplify';
import { getAllStaffAccountsNew } from '@graphql/queries';
import * as Sentry from '@sentry/nextjs';
import { usePopper } from 'react-popper';
import { UserSession } from '@sirge-io/sirge-types/dist/interfaces/session';
import { formatDateTimezone } from '@utils/format';
import Link from 'next/link';
import { executeGraphqlOperation } from '_utils/executeGraphqlOperation';
import {
  GetAllStaffAccountsQueryVariables,
  GetAllStaffAccountsResponsePrisma,
  UserPrisma,
} from 'API';

const UsersWidget = () => {
  const {
    businessProfile,
    isLoading,
    dialogOptions,
    selectedBusiness,
    sessions,
    setDialogOptions,
    setIsLoading,
  } = useBoundStore((state) => state);

  debugger;

  // const businessVanityName = businessProfile?.profilePrisma?.vanity_name;

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const [staffUsers, setStaffUsers] = useState<UserPrisma[]>([]);

  const getLastActivity = (sessions: UserSession[]) => {
    const getLastSession = sessions?.sort(
      (a: UserSession, b: UserSession) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    const last_activity = formatDateTimezone(
      getLastSession[0].created_at,
      selectedBusiness?.store?.timezone,
    );

    return last_activity;
  };

  const getStaffInfo = async (businessId: string) => {
    try {
      setIsLoading(true);

      const response = await executeGraphqlOperation<
        GetAllStaffAccountsQueryVariables,
        GetAllStaffAccountsResponsePrisma
      >(API, getAllStaffAccountsNew, {
        getAllStaffAccountsInput: {
          business_id: businessId,
        },
      });

      const data = response?.data ? (response?.data as UserPrisma[]) : [];

      setStaffUsers(data);
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBusiness) {
      getStaffInfo(selectedBusiness?.id);
    }
  }, [selectedBusiness]);

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {});

  const staffLimit =
    selectedBusiness?.subscriptions?.find(
      (subscription) => subscription.status === 'active',
    )?.staff_limit || 5;

  const activeStaffAccounts = staffUsers?.length;

  const isStaffLimitExceeded = useMemo(() => {
    const list = staffUsers?.length || 0;

    if (list >= staffLimit) {
      return true;
    }

    return false;
  }, [staffUsers, staffLimit]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h5 className="h5">
          Active Users{' '}
          {staffUsers ? `(${activeStaffAccounts}/${staffLimit})` : ''}
        </h5>

        {isStaffLimitExceeded && (
          <div
            ref={setPopperElement}
            className={`${
              displayPopover ? 'popover visible' : 'popover visually-hidden'
            }`}
            style={{
              ...styles.popper,
              width: '200px',
              top: '-85px',
              left: '-80px',
            }}
            {...attributes.popper}
          >
            <Popover
              title={'User Limit Met'}
              customClassPopoverBody={{ padding: 0 }}
            />
          </div>
        )}

        <button
          data-bs-target="#createAccountModal"
          data-bs-toggle={isStaffLimitExceeded ? '' : 'modal'}
          className={` ${
            isStaffLimitExceeded ? 'text-darkGrade50' : 'link'
          }  font-medium inline-flex items-center`}
          onMouseEnter={() => setDisplayPopover(true)}
          onMouseLeave={() => setDisplayPopover(false)}
          ref={setReferenceElement}
        >
          <i className="icon-person-add mr-2 text-xl"></i>Add User
        </button>
      </div>
      <div className="flex flex-col h-35 overflow-y-auto">
        {!isLoading &&
          staffUsers?.map((user, i) => (
            <div
              key={i}
              className="flex items-center border rounded border-extraLightColor px-4 py-3 mb-3"
            >
              <div className="bg-blueLightColor cursor-pointer mr-4 text-primaryMidColor font-semibold text-lg relative uppercase inline-flex w-10 h-10 flex-shrink-0 rounded-full items-center justify-center">
                <span>
                  {' '}
                  {initialName(`${user?.first_name} ${user?.last_name}`)}
                </span>
              </div>
              <div className="inline-flex flex-col">
                <div className="font-semibold text-textSecondaryColor mb-0.5">
                  {`${user.first_name} ${user.last_name}`}
                </div>
                <div className="text-textSecondaryColor font-medium text-xs">
                  {sessions && sessions?.length > 0 ? (
                    <span className="text-textTeriraryColor">
                      Last Activity {getLastActivity(sessions)}
                    </span>
                  ) : (
                    <span className="text-textTeriraryColor">
                      No recent activity
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={`/${businessProfile?.profilePrisma?.vanity_name}/settings/users/${user.id}`}
                className="inline-flex ml-auto text-2xl text-darkGrade50 hover:text-darkGrade75"
              >
                <i className="icon-settings"></i>
              </Link>
            </div>
          ))}
        {isLoading && (
          <div className="flex items-center justify-center bg-white h-[300px] border-[1px] border-extraLightColor rounded-lg ">
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
      </div>

      <TailwindModal id={'createAccountModal'}>
        <CreateStaffAccountModal
          refreshUsers={() => {
            getStaffInfo(selectedBusiness?.id as string);
          }}
          handleResponse={(response: {
            message: string;
            type: ValidTypeMessages;
          }) => {
            setDialogOptions({
              message: response.message,
              type: response.type,
            });

            responseModalButtonRef.current?.click();
          }}
        />
      </TailwindModal>

      <TailwindModal id="successModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <TailwindModal id="litmiExceededModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successModal"
        ref={responseModalButtonRef}
      />
    </>
  );
};

export default UsersWidget;
