'use client';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AudienceDataTable from '_components/audiences/audienceTable';
import { API, graphqlOperation } from 'aws-amplify';
import {
  getAudienceSegmentQueryById,
  getDynamicQueryResults,
} from '@graphql/queries';
import Toast from '@components/Toast';
import {
  BusinessPrisma,
  DeleteAudienceSegmentInput,
  DeleteAudienceSegmentResponse,
  GetDynamicQueryResultInput,
  Segments,
  SetAudienceSegmentQueryMutationVariables,
  UpdateAudienceFields,
} from 'API';
import { IAudienceItem, SegmentStatus } from '@interfaces/audiences';
import Image from 'next/image';
import {
  deleteAudienceSegmentQueryById,
  updateAudienceSegmentQueryById,
  setAudienceSegmentQuery,
} from '@graphql/mutations';
import TailwindModal from '_components/TailwindModal.client';
import SegmentAlertModal from '_components/audiences/segment/SegmentAlertModal';
import { initialRuleSegment } from '@store/slices';
import { useBoundStore } from '@store/index';

type StatusType = {
  title: string;
  color: string;
};
type StatusColorObj = {
  [key: string]: StatusType;
  active: StatusType;
  inactive: StatusType;
  created: StatusType;
};

const statusColorObj: StatusColorObj = {
  active: { title: 'Activate', color: '#52CF80' },
  inactive: { title: 'Deactivate', color: '#EECD5F' },
  created: { title: 'Created', color: '#32C4D4' },
};

export type AudienceTableDataType = {
  customer_id: string;
  average_conversion_value: number;
  email_address: string;
  customer_name: string;
  city: string;
  country: string;
  first_order_date: string;
  id: string;
  insight_date: string;
  ninety_day_order_count: number;
  ninety_day_order_total: number;
  price: number;
  product_id: string;
  quantity: number;
  state: string;
  thirty_day_order_count: number;
  thirty_day_order_total: number;
  title: string;
  zip: number;
  customer_order_id: string;
  deleted_at: string;
  updated_at: string;
  created_at: string;
};
type DynamicQueryPageProps = {
  selectedBusiness: BusinessPrisma | null;
};
const DynamicQueryComponent = ({ selectedBusiness }: DynamicQueryPageProps) => {
  const params = useSearchParams();
  const router = useRouter();
  const segmentID = params?.get('segmentId');
  const { setDynamicSegment, setSegment, setIsEdit } = useBoundStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<AudienceTableDataType>>([]);
  const [record, setRecord] = useState<number>(0);
  const [audienceSegment, setAudienceSegment] = useState<
    Segments | undefined
  >();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [statusNotificationLoader, setStatusNotificationLoader] =
    useState<boolean>(false);
  const [openDeActivateSegmentModal, setOpenDeActivateSegmentModal] =
    useState<boolean>(false);
  const [openDeleteSegmentModal, setOpenDeleteSegmentModal] =
    useState<boolean>(false);
  const [notificationState, setNotificationState] = useState<{
    title: string;
    status: string;
    desc?: string;
  }>({ title: '', status: '' });

  useEffect(() => {
    if (segmentID) {
      getAudienceSegmentResult();
    }
  }, [currentPage]);

  useEffect(() => {
    if (segmentID) {
      fetchAudiences();
    }
  }, [segmentID]);

  const getAudienceSegmentResult = async () => {
    try {
      setIsLoading(true);
      const response: any = await API.graphql(
        graphqlOperation(getDynamicQueryResults, {
          getDynamicQueryResultInput: {
            segment_id: segmentID,
            business_id: selectedBusiness?.id,
            // limit: 10,
            page: currentPage + 1,
          } as GetDynamicQueryResultInput,
        }),
      );
      if (response && response.data.getDynamicQueryResults.data) {
        setData(response.data.getDynamicQueryResults.data);
        setRecord(response.data.getDynamicQueryResults.total_records);
      } else {
        setNotificationState({
          title: `Unable to fetch data`,
          status: 'failure',
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log('response', error);
      setIsLoading(false);
      setNotificationState({
        title: `Unable to perform action due to ${error.message}`,
        status: 'failure',
      });
    }
  };

  const fetchAudiences = async () => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(getAudienceSegmentQueryById, {
          getAudienceSegmentInput: {
            id: segmentID,
            business_id: selectedBusiness?.id,
          },
        }),
      );
      if (
        response.data &&
        response.data.getAudienceSegmentQueryById &&
        response.data.getAudienceSegmentQueryById.data
      ) {
        setAudienceSegment(response.data.getAudienceSegmentQueryById.data);
      }
    } catch (error) {
      console.log('error in fetching audeiences', error);
    }
  };

  const handleActionOnSegment = async (
    selectedAudiences: IAudienceItem[],
    actionType: string,
  ) => {
    try {
      let title = '';
      const fields = {} as UpdateAudienceFields;
      setStatusNotificationLoader(true);
      if (selectedAudiences.length > 0) {
        const mapped = selectedAudiences
          .filter((ad) => ad.checked === true)
          .map((aud) => aud.name)
          .join(',');

        fields['audience'] = mapped;
      }

      if (actionType === 'active') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fields['status'] = SegmentStatus.ACTIVE;
        title = 'Segment Activated Successfully';
      } else if (actionType === 'inactive') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fields['status'] = SegmentStatus.INACTIVE;
        title = 'Segment Deactivated Successfully';
      } else if (actionType === 'update') {
        title = 'Audience Updated Successfully';
      } else if (actionType === 'create') {
        title = 'Audience Created Successfully';
      }

      const response = (await API.graphql(
        graphqlOperation(updateAudienceSegmentQueryById, {
          updateAudienceSegmentInput: {
            id: audienceSegment?.id,
            business_id: selectedBusiness?.id,
            fields,
          },
        }),
      )) as any;

      if (
        response &&
        response.data &&
        response.data.updateAudienceSegmentQueryById &&
        response.data.updateAudienceSegmentQueryById.data &&
        response.data.updateAudienceSegmentQueryById.data.success === true
      ) {
        if (actionType === 'active') {
          setNotificationState({
            title: 'Segment Activated',
            status: 'success',
          });
        } else if (actionType === 'inactive') {
          setNotificationState({
            title: 'Segment Deactivated',
            status: 'success',
          });
        }
        setOpenDeActivateSegmentModal(false);
        await fetchAudiences();
      }

      // }
    } catch (error: any) {
      console.log('error:', error, actionType);
      setNotificationState({
        title: `Unable to perform action due to ${error.message} `,
        status: 'failure',
      });
    }
  };

  const handleDeleteSegment = async () => {
    if (audienceSegment?.id) {
      try {
        setStatusNotificationLoader(true);
        const deleteAudienceSegmentInput: DeleteAudienceSegmentInput = {
          id: audienceSegment?.id || '',
          business_id: selectedBusiness?.id || '',
        };

        const response = (await API.graphql<DeleteAudienceSegmentResponse>(
          graphqlOperation(deleteAudienceSegmentQueryById, {
            deleteAudienceSegmentInput,
          }),
        )) as any;

        if (
          response &&
          response.data &&
          response?.data?.deleteAudienceSegmentQueryById.data.success
        ) {
          router.push(`/${selectedBusiness?.vanity_name}/audiences`);
          setNotificationState({
            title: `Segment  deleted`,
            status: 'success',
          });
        }
      } catch (error: any) {
        // console.log('error:', error);
        setNotificationState({
          title: `Unable to delete segment due to ${error.message} `,
          status: 'failure',
        });
      }
    }
  };

  const duplicateSegment = async () => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(setAudienceSegmentQuery, {
          setAudienceSegmentQueryInput: {
            business_id: selectedBusiness?.id,
            dynamic_query_params: audienceSegment?.dynamic_query_params
              ? JSON.parse(audienceSegment?.dynamic_query_params)
              : '',
            group_name: audienceSegment?.group_name,
            query_type: audienceSegment?.type,
            audience: audienceSegment?.audience || null,
          },
        } as SetAudienceSegmentQueryMutationVariables),
      );
      if (response && response.data.setAudienceSegmentQuery.data.id) {
        setNotificationState({
          title: 'Segment duplicated',
          desc: 'You can find it in segments list',
          status: 'success',
        });
      }
    } catch (error) {
      console.log('response', error);
      setNotificationState({
        title: 'Unable to Duplicate segment',
        status: 'failure',
      });
    }
  };

  const handleEdit = () => {
    setSegment(audienceSegment);
    setIsEdit(true);
    try {
      const parsedData = audienceSegment?.dynamic_query_params
        ? JSON.parse(JSON.parse(audienceSegment?.dynamic_query_params))
        : undefined;

      // Set the parsed data directly
      setDynamicSegment(parsedData);
    } catch (error) {
      console.error('Error parsing stored segment data:', error);

      // Handle the error, potentially setting a default value or returning initialRule
      const defaultValue = audienceSegment?.dynamic_query_params
        ? JSON.parse(audienceSegment?.dynamic_query_params)
        : initialRuleSegment;

      // Set the default value directly
      setDynamicSegment(defaultValue);
    }
    router.push(
      `/${selectedBusiness?.vanity_name}/audiences/segment?segmentType=${
        audienceSegment?.type === 'dynamic' ? 'Dynamic' : 'Static'
      }`,
    );
  };

  return (
    <>
      <div className={`flex flex-col overflow-x-hidden relative`}>
        <div className="px-8 py-8">
          <div className="mx-auto">
            <div className="flex items-center justify-between my-7">
              <div className="flex items-center justify-center">
                <Image
                  src={'/images/arrow-left.svg'}
                  alt={'back'}
                  width={9}
                  height={16}
                  onClick={() => router.back()}
                  className={'cursor-pointer'}
                />
                <h2 className="text-2xl flex items-center px-2">
                  {audienceSegment?.group_name}
                </h2>
                <div className="relative w-[10rem]">
                  <div
                    className={`onStatusHover w-[22px] h-[22px] border-2 border-solid border-[${
                      statusColorObj[audienceSegment?.status || 'created'].color
                    }] border-opacity-30 rounded-3xl flex items-center justify-center`}
                  >
                    <div
                      className={`w-[10px] h-[10px] bg-[${
                        statusColorObj[audienceSegment?.status || 'created']
                          .color
                      }] rounded-3xl`}
                    ></div>
                  </div>
                  <div className="status-shadow font-semibold p-2 absolute top-[-50px] right-[42%] w-[10rem] bg-white flex items-center justify-center">
                    {audienceSegment?.status === 'created'
                      ? 'Created segment'
                      : audienceSegment?.status === 'inactive'
                      ? 'Inactive segment'
                      : 'Active segment'}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center">
                <div
                  className="flex items-center mr-1"
                  onClick={() => handleEdit()}
                >
                  <Image
                    src={'/images/edit-gray.svg'}
                    alt={'edit'}
                    width={20}
                    height={20}
                  />
                  <a
                    className="cursor-pointer text-[#A1B3C3] block px-2 py-2 text-sm"
                    role="menuitem"
                  >
                    Edit
                  </a>
                </div>
                <div className="flex items-center mr-1">
                  <Image
                    src={'/images/duplicate-gray.svg'}
                    alt={'edit'}
                    width={20}
                    height={20}
                  />
                  <a
                    className="cursor-pointer text-[#A1B3C3] block px-2 py-2 text-sm"
                    role="menuitem"
                    onClick={duplicateSegment}
                  >
                    Duplicate
                  </a>
                </div>
                <div
                  className="flex items-center mr-1"
                  onClick={() => setOpenDeActivateSegmentModal(true)}
                >
                  <Image
                    src={'/images/deactive-gray.svg'}
                    alt={'edit'}
                    width={20}
                    height={20}
                  />
                  <a
                    className="cursor-pointer text-[#A1B3C3] block px-2 py-2 text-sm"
                    role="menuitem"
                  >
                    Deactivate
                  </a>
                </div>
                <div
                  className="flex items-center mr-1"
                  onClick={() => setOpenDeleteSegmentModal(true)}
                >
                  <Image
                    src={'/images/del-gray.svg'}
                    alt={'edit'}
                    width={20}
                    height={20}
                  />
                  <a
                    className="cursor-pointer text-warningColor block px-2 py-2 text-sm"
                    role="menuitem"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
            <div className="relative widget-container max-h-full flex flex-col min-h-[33rem] mb-8">
              {data?.length || isLoading ? (
                <AudienceDataTable
                  data={data}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  record={record}
                  isLoading={isLoading}
                />
              ) : (
                <p className="text-center p-6"> Nothing to show</p>
              )}
            </div>
          </div>
        </div>
        {notificationState.title ? (
          <Toast
            notificationState={notificationState.status}
            title={notificationState.title}
            desc={notificationState.desc}
          />
        ) : (
          <></>
        )}
      </div>

      <TailwindModal
        id="deactivateSegment"
        styleDialog={{ maxWidth: '420' }}
        showDialog={openDeActivateSegmentModal}
        setShowDialog={setOpenDeActivateSegmentModal}
      >
        <SegmentAlertModal
          segmentName={audienceSegment?.group_name || ''}
          title="Deactivate segment"
          icon="error-icon"
          type="deactivate"
          description={
            audienceSegment?.status === 'active'
              ? 'It will be removed from all connected platforms'
              : ''
          }
          handleDelete={() => {
            handleActionOnSegment([], 'inactive');
          }}
          handleDecline={() => setOpenDeActivateSegmentModal(false)}
        />
      </TailwindModal>

      <TailwindModal
        id="deleteSegment"
        styleDialog={{ maxWidth: '420px' }}
        showDialog={openDeleteSegmentModal}
        setShowDialog={setOpenDeleteSegmentModal}
      >
        <SegmentAlertModal
          segmentName={audienceSegment?.group_name || ''}
          icon="error-circle"
          title="Delete segment"
          type="delete"
          description="It will
          be removed from all connected platforms and from Sirge"
          handleDelete={handleDeleteSegment}
          handleDecline={() => setOpenDeleteSegmentModal(false)}
        />
      </TailwindModal>
    </>
  );
};

export default DynamicQueryComponent;
