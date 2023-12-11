'use client';

import { initialName } from '@utils/initialName';
import { formatDateTimezone } from '@utils/format';
import { getCampaignCount } from '@utils/business';
import DefaultBusinessIcon from '@images/business-default-icon.svg';
import {
  deleteStaffAccount,
  updateStaffAccountAccess,
} from '@graphql/mutations';
import TailwindModal from '_components/modals/TailwindModal';
import RemoveUserModal from '_components/modals/tailwindTypes/RemoveUserModal';
import Message from '_components/modals/tailwindTypes/Message';
import { useEffect, useRef } from 'react';
import { useBoundStore } from '@store/index';
import { useRouter } from 'next/navigation';
import { User } from '@sirge-io/sirge-types';
import { API, graphqlOperation } from 'aws-amplify';
import React from 'react';
import Image from 'next/image';
import { getStaffById } from '@graphql/queries';
import { UserSession } from '@sirge-io/sirge-types/dist/interfaces/session';
import * as Sentry from '@sentry/nextjs';

type Props = {
  staffId: string;
};

const UserManagement = ({ staffId }: Props) => {
  const {
    businessProfile,
    businessList,
    isLoading,
    selectedBusiness,
    dialogOptions,
    staff,
    lastActivity,
    setLastActivity,
    setStaff,
    setIsLoading,
    setDialogOptions,
  } = useBoundStore();

  const router = useRouter();

  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const showModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const getStaffInfo = async (id: string) => {
    try {
      setIsLoading(true);

      const response: any = await API.graphql(
        graphqlOperation(getStaffById, {
          getStaffByIdInput: {
            staff_id: id,
            business_id: selectedBusiness?.id,
          },
        }),
      );

      debugger;

      const staff = response.data.getStaffById.data;
      setStaff(staff);

      if (staff.sessions?.length > 0) {
        const getLastActivity: UserSession[] = staff.sessions.sort(
          (a: UserSession, b: UserSession) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        const formatedDate = getLastActivity[0].created_at;

        setLastActivity(formatedDate);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Sentry.captureException(error);
    }
  };

  useEffect(() => {
    getStaffInfo(staffId);
  }, [staffId]);

  /**
   * add or remove access to a business
   * @param vanity_name
   */
  const handleStaffAccess = async (vanity_name: string) => {
    setIsLoading(true);
    try {
      const response: any = await API.graphql<User>(
        graphqlOperation(updateStaffAccountAccess, {
          updateStaffAccountAccessInput: {
            staff_id: staffId,
            vanity_name,
            business_id: selectedBusiness?.id,
          },
        }),
      );

      debugger;

      const updateStaffacces = response.data.updateStaffAccountAccess;

      if (updateStaffacces.error) {
        throw new Error(updateStaffacces.error.message);
      }

      await getStaffInfo(staffId);
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * remove staff
   */
  const deleteStaff = async () => {
    setIsLoading(true);

    try {
      const response: any = await API.graphql<User>(
        graphqlOperation(deleteStaffAccount, {
          deleteStaffAccountInput: {
            staff_id: staffId,
            business_id: selectedBusiness?.id,
          },
        }),
      );

      const deleteStaff = response.data.deleteStaffAccount;

      if (deleteStaff.error) {
        throw new Error(deleteStaff.error.message);
      }

      setDialogOptions({
        type: 'success',
        message: 'User Deleted',
      });
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);

      showModalButtonRef.current?.click();

      setTimeout(() => {
        dismissModalButtonRef.current?.click();
        if (dialogOptions.type === 'success') {
          router.push(
            `/${businessProfile?.profilePrisma?.vanity_name}/settings/users`,
          );
        }
      }, 2000);
    }
  };

  /**
   * check business access
   * @param vainityName
   */
  const checkBusinessAccess = (vainityName = '') => {
    const findAccess = staff?.business_access?.find(
      (item) => item.vanity_name === vainityName,
    );

    if (!!findAccess) return true;

    return false;
  };

  return (
    <>
      <div className="flex items-center mb-4 pb-4 border-extraLightColor border-b">
        <div className="bg-blueLightColor cursor-pointer mr-4 text-primaryMidColor font-semibold text-lg relative uppercase inline-flex w-10 h-10 flex-shrink-0 rounded-full items-center justify-center">
          <span>{initialName(`${staff?.first_name} ${staff?.last_name}`)}</span>
        </div>
        <div className="inline-flex flex-col">
          <div className="font-semibold text-textSecondaryColor mb-0.5">
            {`${staff?.first_name} ${staff?.last_name}`}
          </div>

          {lastActivity && (
            <div className="text-textSecondaryColor font-medium text-xs">
              Last Activity{' '}
              <span className="text-textTeriraryColor">
                {formatDateTimezone(
                  lastActivity,
                  selectedBusiness?.store?.timezone,
                )}
              </span>
            </div>
          )}
        </div>
        <button
          className="inline-flex items-center font-medium ml-auto text-darkGrade50 hover:text-darkGrade75"
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
        >
          <i className="icon-delete text-2xl mr-2"></i> Remove User
        </button>
      </div>
      <h6 className="h6 mb-3">Has Access To</h6>
      <div className="max-h-[300px] overflow-y-auto">
        {businessList.map((business) => (
          <React.Fragment key={business.id}>
            <div className="px-4 py-3 rounded border border-borderLightColor flex items-center mb-4">
              <div className="edit-image relative flex items-center justify-center border w-8 h-8 rounded-full border-borderLightColor bg-greyLight overflow-hidden">
                <Image
                  src={DefaultBusinessIcon}
                  alt={`${business?.name}-logo`}
                  height={30}
                  width={30}
                />
              </div>
              <div className="flex flex-col mr-2 ml-2">
                <span className="text-textSecondaryColor font-semibold leading-4 mb-[2px] capitalize">
                  {business?.name}
                </span>
                <span className="text-textTeriraryColor text-xs leading-4">
                  {getCampaignCount(business)}
                </span>
              </div>
              <label
                htmlFor="custom-checkbox"
                className="checbox-default ml-auto"
              >
                <input
                  id="custom-checkbox"
                  type="checkbox"
                  className="w-4 h-4"
                  disabled={isLoading}
                  onChange={() =>
                    handleStaffAccess(business.vanity_name as string)
                  }
                  checked={checkBusinessAccess(business.vanity_name)}
                />
              </label>
            </div>
          </React.Fragment>
        ))}

        {businessList.length === 0 && (
          <div className="text-center my-4">Empty</div>
        )}
      </div>

      <TailwindModal id="removeUserModal">
        <RemoveUserModal deleteStaff={deleteStaff} loading={isLoading} />
      </TailwindModal>

      <TailwindModal id="successModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successModal"
        ref={showModalButtonRef}
      />

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-dismiss="modal"
        data-bs-target="#successModal"
        ref={dismissModalButtonRef}
      />
    </>
  );
};

export default UserManagement;
