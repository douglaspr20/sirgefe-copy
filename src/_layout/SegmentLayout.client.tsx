'use client';
import React, { FC, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API, graphqlOperation } from 'aws-amplify';
import {
  setAudienceSegmentQuery,
  updateAudienceSegmentQueryById,
} from '@graphql/mutations';
import {
  SetAudienceSegmentQueryMutationVariables,
  UpdateAudienceFields,
  UpdateAudienceSegmentQueryByIdMutationVariables,
  UpdateAudienceSegmentQueryInput,
} from 'API';
import TailwindModal from '_components/modals/TailwindModal';
import CreateActivateSegmentModal from '_components/audiences/segment/CreateActivateSegmentModal';
import { IAudienceItem } from '@interfaces/audiences';
import Message from '_components/modals/tailwindTypes/Message';
import { GraphQLResult } from '@aws-amplify/api';
import Image from 'next/image';
import Toast from '_components/Toast';
import { useBoundStore } from '@store/index';

interface Props {
  children: React.ReactNode;
}

export function subtractDaysFromCurrentDate(daysToSubtract = 0) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - daysToSubtract);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

const SegmentLayout: FC<Props> = ({ children }) => {
  const { dynamicSegment, isEdit, segment, selectedBusiness } = useBoundStore();

  const router = useRouter();
  const params = useSearchParams();
  const segmentType = params?.get('segmentType') || 'Dynamic';
  const [error, setError] = useState<string>();
  const [edit, setEdit] = useState<boolean>(false);
  const [openCreateOrUpdateAudienceModal, setOpenCreateOrUpdateAudience] =
    useState<boolean>(false);
  const [createdAudienceId, setCreatedAudienceId] = useState<string>('');
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [modalLoader, setModalLoader] = useState<boolean>(false);
  const [groupName, setGroupname] = useState<string>(
    segment.group_name === '' ? 'New Segment' : segment.group_name,
  );

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 6000);
  }, [error?.length]);

  const setAudienceSegment = async () => {
    try {
      setModalLoader(true);
      const response: any = await API.graphql(
        graphqlOperation(setAudienceSegmentQuery, {
          setAudienceSegmentQueryInput: {
            business_id: selectedBusiness?.id,
            dynamic_query_params: JSON.stringify(dynamicSegment),
            group_name: groupName,
            query_type:
              typeof segmentType === 'string'
                ? segmentType.toLowerCase()
                : undefined,
          },
        } as SetAudienceSegmentQueryMutationVariables),
      );
      if (response && response.data.setAudienceSegmentQuery.data.id) {
        setCreatedAudienceId(response.data.setAudienceSegmentQuery.data.id);
        setOpenCreateModal(true);
        setModalLoader(false);
      }
    } catch (error) {
      console.log('response', error);
      setModalLoader(false);
      setError('Unable to create segment');
    }
  };

  const updateAudienceSegment = async () => {
    try {
      setModalLoader(true);
      const response: any = await API.graphql(
        graphqlOperation(updateAudienceSegmentQueryById, {
          updateAudienceSegmentInput: {
            id: segment.id,
            business_id: selectedBusiness?.id,
            fields: {
              dynamic_query_params: JSON.stringify(dynamicSegment),
              group_name: groupName,
              query_type: segment.type,
              audience: segment.audience,
            } as UpdateAudienceFields,
          } as UpdateAudienceSegmentQueryInput,
        } as UpdateAudienceSegmentQueryByIdMutationVariables),
      );
      if (response) {
        setCreatedAudienceId(segment.id);
        setOpenCreateModal(true);
        setModalLoader(false);
      }
    } catch (error) {
      console.log('response', error);
      setModalLoader(false);
      setError('Unable to update segment');
    }
  };

  const handleAction = async (selectedAudiences: IAudienceItem[]) => {
    try {
      const fields = {} as UpdateAudienceFields;
      setModalLoader(true);

      if (selectedAudiences.length > 0) {
        const mapped = selectedAudiences
          .filter((ad) => ad.checked === true)
          .map((aud) => aud.name)
          .join(',');

        fields['audience'] = mapped;
      }

      const response = (await API.graphql(
        graphqlOperation(updateAudienceSegmentQueryById, {
          updateAudienceSegmentInput: {
            id: createdAudienceId,
            business_id: selectedBusiness?.id,
            fields,
          },
        }),
      )) as GraphQLResult<any>;
      if (
        response.data.updateAudienceSegmentQueryById.message ===
        'Query updated successfully'
      ) {
        setModalLoader(false);
        setOpenCreateOrUpdateAudience(true);
        setTimeout(() => {
          router.push(`/${selectedBusiness?.vanity_name}/audiences`);
        }, 2000);
      }
    } catch (error: any) {
      console.log('error:', error);
      setError('Unable to create audience');
    }
  };

  return (
    <>
      {' '}
      {error?.length ? (
        <Toast notificationState={'failure'} title={error} />
      ) : (
        <></>
      )}
      <div className="">
        <div className="flex bg-white px-8 py-3 border-b border-extraLightColor">
          <div className="flex items-center text-xl">
            <i
              onClick={() => router.back()}
              className="icon-chevron-left text-darkGrade50 text-2xl mr-2 pointer"
            />
            {!edit ? (
              <span className="text-textPrimary font-medium mr-2">
                {groupName}{' '}
              </span>
            ) : (
              <input
                className="text-textPrimary font-medium mr-2"
                onChange={(e) => setGroupname(e.target.value)}
                value={groupName}
              />
            )}

            <i
              className="icon-edit text-darkGrade50 text-2xl pointer"
              onClick={() => setEdit((pre) => !pre)}
            />
          </div>

          {!isEdit ? (
            <button
              className="ml-auto btn w-[152px] px-4 flex items-center justify-center"
              onClick={setAudienceSegment}
            >
              {modalLoader ? (
                <Image
                  className="animate-spin mr-2 color-[#ffffff]"
                  src="/images/spinner-sm-white.svg"
                  alt="refresh"
                  width={20}
                  height={20}
                />
              ) : (
                'Create segment'
              )}
            </button>
          ) : (
            <button
              className="ml-auto btn w-[152px] px-4 flex items-center justify-center"
              onClick={updateAudienceSegment}
            >
              {modalLoader ? (
                <Image
                  className="animate-spin mr-2 color-[#ffffff]"
                  src="/images/spinner-sm-white.svg"
                  alt="refresh"
                  width={20}
                  height={20}
                />
              ) : (
                'Update segment'
              )}
            </button>
          )}
        </div>
        {children}
      </div>
      <TailwindModal
        id="createdAudienceSegment"
        styleDialog={{ maxWidth: '700px' }}
      >
        <CreateActivateSegmentModal
          handleClick={handleAction}
          handleSkip={() => {
            router.push(`/${selectedBusiness?.vanity_name}/audiences`);
          }}
          modalLoader={modalLoader}
          isUpdate={isEdit}
          isCreate={!isEdit}
          audiences={
            isEdit && segment?.audience ? stringToArray(segment?.audience) : []
          }
        />
      </TailwindModal>
      <TailwindModal id="createAudienceModal">
        <Message
          title={isEdit ? 'Audience Updated' : 'Audience Created'}
          type={'success'}
          description="You already can use it on your platforms"
        />
      </TailwindModal>
    </>
  );
};

export default SegmentLayout;

export function stringToArray(
  inputString: string | null | undefined,
): IAudienceItem[] {
  let platformObjects: IAudienceItem[] = [];
  if (inputString) {
    const platformsArray = inputString
      .split(',')
      .map((platform) => platform.trim());
    platformObjects = platformsArray.map((platform) => ({
      name: platform,
      checked: true,
    }));
  }
  return platformObjects;
}
