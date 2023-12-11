'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { API, graphqlOperation } from 'aws-amplify';
import dayjs from 'dayjs';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import Calendar from '_components/Calendar';
import timezone from 'dayjs/plugin/timezone';
import { FieldVisitorsSortType } from '@interfaces/visitor';
import AudienceCard from '_components/audiences/AudienceCard';
import GroupRow from '_components/audiences/GroupRow';
import Pagination from '_components/pagination';
import TailwindModal from '_components/TailwindModal.client';
import CreateNewSegment from '@components/modals/tailwindTypes/CreateNewSegment';
import SegmentAlertModal from '_components/audiences/segment/SegmentAlertModal';
import Toast from '_components/Toast';

import CreateActivateSegmentModal from '_components/audiences/segment/CreateActivateSegmentModal';
import Message from '_components/modals/tailwindTypes/Message';

import {
  getAllAudienceSegmentQueries,
  getSuggestedSegmentsStats,
} from '@graphql/queries';

import {
  BusinessPrisma,
  DeleteAudienceSegmentInput,
  DeleteAudienceSegmentResponse,
  Segments,
  SetAudienceSegmentQueryMutationVariables,
  UpdateAudienceFields,
  UserPrisma,
} from '../../../API';
import { User } from '@sirge-io/sirge-types';
import {
  IAudienceItem,
  SUGGESTED_SEGMENT_TYPES,
  SegmentStatus,
  SegmentTypes,
  IAudienceType,
} from '@interfaces/audiences';
import AudienceSegmentModal from '_components/audiences/segment/AudienceSegmentModal';
import {
  deleteAudienceSegmentQueryById,
  setAudienceSegmentQuery,
  updateAudienceSegmentQueryById,
  createSuggestedSegments,
} from '@graphql/mutations';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@store/index';
import SirgeSpinner from '@components/loader/SirgeSpinner';

dayjs.extend(timezone);

const getStatus = (status: string | null | undefined) => {
  switch (status) {
    case 'active':
      return SegmentStatus.ACTIVE;
    case 'inactive':
      return SegmentStatus.INACTIVE;
    default:
      return SegmentStatus.CREATED;
  }
};

const getType = (type: string | null | undefined) => {
  switch (type) {
    case 'dynamic':
      return SegmentTypes.DYNAMIC;
    default:
      return SegmentTypes.STATIC;
  }
};

type SegmentStats = {
  no_of_customers: number;
  query_type: string;
};

type AudiencesPageProps = {
  userProfile: UserPrisma | null;
  selectedBusiness?: BusinessPrisma | null;
};

const AudiencesPage = ({
  selectedBusiness,
  userProfile,
}: AudiencesPageProps) => {
  const { setDynamicSegment, setSegment, setIsEdit } = useBoundStore();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total_record, setRecord] = useState<number>(0);
  const activeSort = useRef<FieldVisitorsSortType | null>('last_visit');
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('');
  const [modalLoader, setModalLoader] = useState<boolean>(false);
  const [segmentStats, setSegmentStats] = useState<Array<SegmentStats>>();
  const [selectedSegmentAudiences, setSelectedSegmentAudiences] = useState<
    IAudienceItem[] | []
  >();
  const [selectedSegmentName, setSelectedSegmentName] = useState<string>('');
  const [audienceData, setAudienceData] = useState<Array<Segments>>([]);

  const [statusNotificationLoader, setStatusNotificationLoader] =
    useState<boolean>(false);
  const [notificationState, setNotificationState] = useState<{
    title: string;
    status: string;
  } | null>(null);

  const [openCreateOrUpdateAudienceModal, setOpenCreateOrUpdateAudience] =
    useState<boolean>(false);

  const [openActivateSegmentModal, setOpenActivateSegmentModal] =
    useState<boolean>(false);

  const [openDeActivateSegmentModal, setOpenDeActivateSegmentModal] =
    useState<boolean>(false);

  const [openDeleteSegmentModal, setOpenDeleteSegmentModal] =
    useState<boolean>(false);

  const [daterange, setDaterange] = useState<DateValueType>({
    startDate: dayjs()
      .tz(userProfile?.timezone || 'America/Los_Angeles')
      .subtract(7, 'days')
      .format('YYYY-MM-DD'),
    endDate: dayjs()
      .tz(userProfile?.timezone || 'America/Los_Angeles')
      .subtract(1, 'day')
      .format('YYYY-MM-DD'),
  });

  useEffect(() => {
    const fetchGetAllAudience = async () => {
      await fetchAudiences();
    };

    fetchGetAllAudience();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  useEffect(() => {
    getSuggestedAudienceSegmentCustomers();
  }, []);

  useEffect(() => {
    if (
      statusNotificationLoader === true &&
      notificationState &&
      notificationState?.title.length > 0
    ) {
      setTimeout(() => {
        setStatusNotificationLoader(false);
        setNotificationState({
          title: '',
          status: 'sucess',
        });
      }, 5000);
    }
  }, [statusNotificationLoader, notificationState]);

  const handleCalendarValueChange = async (newValue: DateValueType) => {
    if (!activeSort?.current) {
      activeSort.current = 'last_visit';
    }
    setDaterange(newValue);
  };

  const fetchAudiences = async () => {
    try {
      setIsLoading(true);
      const response: any = await API.graphql(
        graphqlOperation(getAllAudienceSegmentQueries, {
          getAllAudienceSegmentQueryInput: {
            limit: 10,
            page: currentPage + 1,
            business_id: selectedBusiness?.id,
          },
        }),
      );
      if (
        response.data &&
        response.data.getAllAudienceSegmentQueries &&
        response.data.getAllAudienceSegmentQueries.data &&
        response.data.getAllAudienceSegmentQueries.data.length > 0
      ) {
        setAudienceData(response.data.getAllAudienceSegmentQueries.data);
        setRecord(response.data.getAllAudienceSegmentQueries.total_records);
      }
      else {
        setNotificationState({
          title: `Unable to fetch data`,
          status: 'failure',
        });
      }
      setIsLoading(false);


    } catch (error: any) {
      setIsLoading(false);
      console.log('error in fetching audeiences', error);
      setNotificationState({
        title: `Unable to perform action due to ${error.message} `,
        status: 'failure',
      });
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
      setModalLoader(true);
      if (selectedAudiences.length > 0) {
        const mapped = selectedAudiences
          .filter((ad) => ad.checked === true)
          .map((aud) => aud.name.toLowerCase())
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
            id: selectedSegmentId,
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
          setOpenActivateSegmentModal(true);
        } else if (actionType === 'inactive') {
          setOpenDeActivateSegmentModal(false);
        } else if (actionType === 'create' || actionType === 'update') {
          setOpenCreateOrUpdateAudience(true);
        }
        setNotificationState({
          title,
          status: 'success',
        });
        await fetchAudiences();
        setModalLoader(false);
      } else {
        setModalLoader(false);
        setStatusNotificationLoader(true);
        setNotificationState({
          title: `Unable to perform action due to error response `,
          status: 'failure',
        });
      }
    } catch (error: any) {
      console.log('error:', error);
      setModalLoader(false);
      setNotificationState({
        title: `Unable to perform action due to ${error.message} `,
        status: 'failure',
      });
    }
  };

  const handleDeleteSegment = async () => {
    if (selectedSegmentId && selectedBusiness) {
      try {
        setStatusNotificationLoader(true);
        const deleteAudienceSegmentInput: DeleteAudienceSegmentInput = {
          id: selectedSegmentId,
          business_id: selectedBusiness?.id || '',
        };

        const response = (await API.graphql<DeleteAudienceSegmentResponse>(
          graphqlOperation(deleteAudienceSegmentQueryById, {
            deleteAudienceSegmentInput,
          }),
        )) as any;
        setOpenDeleteSegmentModal(false);

        if (
          response?.data?.deleteAudienceSegmentQueryById.message ===
          'Audience Segment Query Deleted Successfully'
        ) {
          await fetchAudiences();
          setNotificationState({
            title: 'Audience Segment Query Deleted Successfully',
            status: 'sucess',
          });
        }
      } catch (error: any) {
        setStatusNotificationLoader(true);
        setNotificationState({
          title: `Unable to delete segment due to ${error.message} `,
          status: 'failure',
        });
      }
    }
  };

  const handleEdit = (segmentData: Segments) => {
    setIsEdit(true);
    setSegment(segmentData);

    try {
      const parsedData = JSON.parse(
        JSON.parse(segmentData.dynamic_query_params),
      );
      setDynamicSegment(parsedData);
    } catch (error) {
      console.error('Error parsing stored segment data:', error);
      const defaultValue = JSON.parse(segmentData.dynamic_query_params);
      setDynamicSegment(defaultValue);
    }
    router.push(
      `/${selectedBusiness?.vanity_name}/audiences/segment?segmentType=${segmentData.type === 'dynamic' ? 'Dynamic' : 'Static'
      }`,
    );
  };

  const createSuggestedAudienceSegment = async (
    type: SUGGESTED_SEGMENT_TYPES,
  ) => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(createSuggestedSegments, {
          createSuggestedSegmentsInput: {
            business_id: selectedBusiness?.id,
            query_type: type,
          },
        }),
      );

      if (response && response.data.createSuggestedSegments.data.id) {
        await fetchAudiences();
        setStatusNotificationLoader(true);
        setNotificationState({
          title: 'Segment Created',
          status: 'success',
        });
      }
    } catch (error) {
      console.log('response', error);
      setStatusNotificationLoader(true);
      setNotificationState({
        title: 'Unable to Create segment',
        status: 'failure',
      });
    }
  };

  const getSuggestedAudienceSegmentCustomers = async () => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(getSuggestedSegmentsStats, {
          getSuggestedSegmentsStatsInput: {
            business_id: selectedBusiness?.id,
          },
        }),
      );

      if (response && response.data.getSuggestedSegmentsStats.data) {
        setSegmentStats(response.data.getSuggestedSegmentsStats.data);
      }
    } catch (error) {
      console.log('response', error);
    }
  };

  const duplicateSegment = async (audienceSegment: Segments) => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(setAudienceSegmentQuery, {
          setAudienceSegmentQueryInput: {
            business_id: selectedBusiness?.id,
            dynamic_query_params: audienceSegment?.dynamic_query_params || '',
            group_name: audienceSegment?.group_name,
            query_type: audienceSegment?.type,
            audience: audienceSegment?.audience || null,
          },
        } as SetAudienceSegmentQueryMutationVariables),
      );
      if (
        response &&
        response.data.setAudienceSegmentQuery.message ===
        'Audience segment query created successfully'
      ) {
        await fetchAudiences();
        setNotificationState({
          title: 'Segment duplicated',
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

  const getAudience = (audience: string | null | undefined) => {
    const aud: IAudienceItem[] = [];
    if (audience && audience.length > 0) {
      if (audience.length > 0) {
        const parsedAudience = JSON.parse(audience) as IAudienceType;
        if (parsedAudience && parsedAudience.facebook) {
          aud.push({
            name: 'facebook',
            checked: true,
            error: parsedAudience.facebook?.error?.message.length
              ? parsedAudience.facebook.error.message
              : '',
          });
        }
        if (parsedAudience && parsedAudience.tiktok) {
          aud.push({
            name: 'tiktok',
            checked: true,
            error: parsedAudience.tiktok.error?.message.length
              ? parsedAudience.tiktok.error.message
              : '',
          });
        }
        if (parsedAudience && parsedAudience.google) {
          aud.push({
            name: 'google',
            checked: true,
            error: parsedAudience.google.error?.message.length
              ? parsedAudience.google.error.message
              : '',
          });
        }
      }
    }

    return aud;
  };
  const handleCurrentPage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  return (
    <>
      <div className={`flex flex-col overflow-x-hidden relative`}>
        <div className="px-8 py-8 pb-16">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2 flex items-center">Audience Segment</h2>
            </div>
            <div className="mb-6 pt-4 grid w-full grid-cols-2 xl:grid-cols-4  gap-x-6 gap-y-6">
              <AudienceCard
                title="Latest Repeat shoppers"
                description="Customers who had two orders in the last 30 days"
                handleCreateSegment={() =>
                  createSuggestedAudienceSegment(
                    SUGGESTED_SEGMENT_TYPES.REPEAT_SHOPPERS,
                  )
                }
                no_of_customers={
                  segmentStats?.find(
                    (item) =>
                      item.query_type ===
                      SUGGESTED_SEGMENT_TYPES.REPEAT_SHOPPERS,
                  )?.no_of_customers
                }
              />
              <AudienceCard
                title="Big Buyers"
                description="Customers whose AOV is in the top 20th percentile of all customers"
                handleCreateSegment={() =>
                  createSuggestedAudienceSegment(
                    SUGGESTED_SEGMENT_TYPES.BIG_BUYERS,
                  )
                }
                no_of_customers={
                  segmentStats?.find(
                    (item) =>
                      item.query_type === SUGGESTED_SEGMENT_TYPES.BIG_BUYERS,
                  )?.no_of_customers
                }
              />
              <AudienceCard
                title="Customers from Best Source"
                description="Customers whose first-click ad is from the source with the cumulative highest AOV"
                handleCreateSegment={() =>
                  createSuggestedAudienceSegment(
                    SUGGESTED_SEGMENT_TYPES.BEST_SOURCE,
                  )
                }
                no_of_customers={
                  segmentStats?.find(
                    (item) =>
                      item.query_type === SUGGESTED_SEGMENT_TYPES.BEST_SOURCE,
                  )?.no_of_customers
                }
              />
              <AudienceCard
                title="Dormant customers"
                description="Customers who have not made any orders in the past 90 days"
                handleCreateSegment={() =>
                  createSuggestedAudienceSegment(
                    SUGGESTED_SEGMENT_TYPES.DORMANT,
                  )
                }
                no_of_customers={
                  segmentStats?.find(
                    (item) =>
                      item.query_type === SUGGESTED_SEGMENT_TYPES.DORMANT,
                  )?.no_of_customers
                }
              />
            </div>

            <div className="widget-container p-5 max-h-[700px] flex flex-col mb-6">
              <div className="flex justify-between items-center mb-5">
                <h5 className="h5">My Groups</h5>
                <div className="inline-flex items-center relative">
                  <div className="relative mr-4">
                    <Calendar
                      value={daterange}
                      onChange={handleCalendarValueChange}
                      timezone={userProfile?.timezone || 'America/Chicago'}
                    />
                  </div>
                  <button
                    className="inline-flex items-center btn"
                    data-bs-toggle="modal"
                    data-bs-target="#crateNewSegment"
                  >
                    <i className="icon-add-circle mr-2 text-md"></i>Create new
                    segment
                  </button>
                  {/* <FilterColumn
                    columns={[
                      { label: 'Visitor Name', value: 'visitor_name' },
                      { label: 'Page Views', value: 'total_pageviews' },
                      { label: 'Purchases', value: 'total_purchases' },
                    ]}
                    setFilters={setFilters}
                  /> */}
                </div>
              </div>
              <div className="max-h-full relative overflow-y-auto">
                <div className="w-full">
                  {audienceData && audienceData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-5">
                      <Image
                        width="161"
                        height="160"
                        src="/images/no-account-connected.svg"
                        alt="no-account-connected"
                      />
                      <h5 className="h5 mb-3 text-textSecondaryColor">
                        There Is No Data
                      </h5>

                      <span className="text-textTeriraryColor text-sm">
                        Here will be your links
                      </span>
                    </div>
                  ) : (
                    <div className="overflow-x-auto min-h-[500px]">
                      <table className="min-w-full border-collapse">
                        <tbody>
                          {audienceData && !isLoading ?
                            audienceData.map((audience) => (
                              <GroupRow
                                key={audience.id}
                                status={getStatus(audience.status)}
                                segmentName={audience.group_name}
                                segmentType={getType(audience.type)}
                                customers={audience.no_of_customers}
                                revenue={audience.added_revenue}
                                socialMedia={getAudience(audience.audience)}
                                setSelectedSegmentId={setSelectedSegmentId}
                                segmentId={audience.id}
                                handleEdit={() => handleEdit(audience)}
                                setSelectedSegmentAudiences={
                                  setSelectedSegmentAudiences
                                }
                                setSelectedSegmentName={
                                  setSelectedSegmentName
                                }
                                handleActivate={() => {
                                  handleActionOnSegment([], 'active');
                                }}
                                selectedBusiness={selectedBusiness}
                                handleDeactivate={() => {
                                  setOpenDeActivateSegmentModal(true);
                                }}
                                handleDuplicate={() =>
                                  duplicateSegment(audience)
                                }
                                handleDelete={() => {
                                  setOpenDeleteSegmentModal(true);
                                }}
                              />
                            )) :
                            <div className="min-h-[400px] w-full grid place-items-center">
                              <SirgeSpinner />
                            </div>
                          }
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {!!total_record && (<div className="flex items-center justify-center py-4 sticky bottom-0 bg-white">
                  <Pagination
                    currentPage={currentPage}
                    onChangeCurrentPage={(page) => handleCurrentPage(page)}
                    numberPages={Math.ceil(total_record / 10)}
                  />
                </div>)}
              </div>
            </div>
          </div>
        </div>
        {statusNotificationLoader === true &&
          notificationState &&
          notificationState.title.length > 0 && (
            <Toast
              title={notificationState?.title}
              notificationState={notificationState?.status}
            />
          )}
      </div>


      <TailwindModal id="crateNewSegment" styleDialog={{ maxWidth: '700px' }}>
        <CreateNewSegment selectedBusiness={selectedBusiness} />
      </TailwindModal>

      <TailwindModal
        id="activateSegment"
        styleDialog={{ maxWidth: '582px' }}
        showDialog={openActivateSegmentModal}
        setShowDialog={setOpenActivateSegmentModal}
      >
        <CreateActivateSegmentModal
          modalLoader={modalLoader}
          handleClick={(selectedAudiences: IAudienceItem[]) => {
            handleActionOnSegment(selectedAudiences, 'active');
          }}
          isUpdate={
            selectedSegmentAudiences && selectedSegmentAudiences.length > 0
              ? true
              : false
          }
          audiences={selectedSegmentAudiences}
          handleSkip={() => setOpenActivateSegmentModal(false)}
        />
      </TailwindModal>

      <TailwindModal
        id="deactivateSegment"
        styleDialog={{ maxWidth: '420' }}
        showDialog={openDeActivateSegmentModal}
        setShowDialog={setOpenDeActivateSegmentModal}
      >
        <SegmentAlertModal
          segmentName={selectedSegmentName}
          title="Deactivate segment"
          icon="error-icon"
          type="deactivate"
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
          segmentName={selectedSegmentName}
          icon="error-circle"
          title="Delete segment"
          type="delete"
          description="It will
          be removed from all connected platforms and from Sirge"
          handleDelete={handleDeleteSegment}
          handleDecline={() => setOpenDeleteSegmentModal(false)}
        />
      </TailwindModal>

      <TailwindModal id="audienceSegmentModal">
        <AudienceSegmentModal
          isUpdate={
            selectedSegmentAudiences && selectedSegmentAudiences.length > 0
              ? true
              : false
          }
          audiences={selectedSegmentAudiences}
          handleClick={(sl: IAudienceItem[]) => {
            const type =
              selectedSegmentAudiences && selectedSegmentAudiences.length > 0
                ? 'update'
                : 'create';
            handleActionOnSegment(sl, type);
          }}
          modalLoader={modalLoader}
        />
      </TailwindModal>

      <TailwindModal
        id="createOrUpdateAudience"
        showDialog={openCreateOrUpdateAudienceModal}
        setShowDialog={setOpenCreateOrUpdateAudience}
      >
        <Message
          title={
            selectedSegmentAudiences && selectedSegmentAudiences.length > 0
              ? 'Audience Updated'
              : 'Audience Created'
          }
          type={'success'}
          description="You already can use it on your platforms"
        />
      </TailwindModal>
    </>
  );
};

export default AudiencesPage;
