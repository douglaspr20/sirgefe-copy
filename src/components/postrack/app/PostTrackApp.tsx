'use client';
import Calendar from '@components/Calendar';
import RefreshDataButton from '@components/RefreshDataButton';
import TailwindModal from '@components/modals/TailwindModal';
import CreateCards from '@components/organic-content/CreateCards';
import CreatedModal from '@components/organic-content/CreatedModal';
import DeleteTrackableCopyModal from '@components/organic-content/DeleteTrackableCopyModal';
import LinkModal from '@components/organic-content/LinkModal';
import LinksTable from '@components/organic-content/LinksTable';
import OrdersModal from '@components/organic-content/OrdersModal';
import Toast from '@components/organic-content/Toast';
import {
  createTrackableCopyNew,
  deleteTrackableCopyNew,
  updateTrackableCopyNew,
} from '@graphql/mutations';
import {
  generateTrackableCopyPathNew,
  getTrackableCopiesNew,
  getTrackableCopyTypesNew,
} from '@graphql/queries';
import { ValidTypeSort } from '@interfaces/sort';
import { FieldTrackabelCopySortType } from '@interfaces/trackableCopy';
import { linksColumns } from '@utils/adjustableColumns';
import { API, graphqlOperation } from 'aws-amplify';
import dayjs from 'dayjs';
import React, { FC, useEffect, useRef, useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { useBoundStore } from '@store/index';

function isValidURL(url: string) {
  const res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  return res !== null;
}

interface TrackableCopies {
  data: any[];
  numberPages: number;
}

interface TrackableCopiesTypes {
  data: string[];
  numberPages: number;
}

const PostTrackApp: FC = () => {
  const { selectedBusiness } = useBoundStore.getState();
  const [linkModalActive, setLinkModalActive] = useState<boolean>(false);

  const [editLinkOptions, setEditLinkOptions] = useState<{
    active: boolean;
    id: string;
    short_code: string;
    name: string;
    destination_url: string;
    description: string;
    position: string;
    type: string;
  }>({
    active: false,
    id: '',
    short_code: '',
    name: '',
    destination_url: '',
    description: '',
    position: 'top',
    type: '',
  });

  const [typesSorts, setTypeSorts] = useState<
    Record<FieldTrackabelCopySortType | string, string | ValidTypeSort>
  >({
    clicks: '',
    revenue: '',
    created: 'desc',
    name: '',
    purchases: '',
  });

  const [deleteModalActive, setDeleteModalActive] = useState<boolean>(false);
  const [deleteCopyOptions, setDeleteCopyOptions] = useState<{
    id: string;
    short_code: string;
  }>({
    id: '',
    short_code: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [uniquePath, setUniquePath] = useState<string>('');
  const [trackableCopyName, setTrackableCopyName] = useState<string>('');
  const [destinationURL, setDestinationURL] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [trackableCopiesState, setTrackableCopiesState] = useState<any[]>([]);

  const activeSort = useRef<string | null>('created');
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const [daterange, setDaterange] = useState<DateValueType>({
    startDate: dayjs()
      .tz(selectedBusiness?.store?.timezone || 'America/Los_Angeles')
      .subtract(7, 'days')
      .format('YYYY-MM-DD'),
    endDate: dayjs()
      .tz(selectedBusiness?.store?.timezone || 'America/Los_Angeles')
      .subtract(1, 'day')
      .format('YYYY-MM-DD'),
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [shortURLPosition, setShortURLPosition] = useState('top');
  const [trackableCopyType, setTrackableCopyType] = useState('social-media');
  const [copyNameError, setCopyNameError] = useState<null | string>(null);
  const [copyURLError, setCopyURLError] = useState<null | string>(null);
  const [trackableCopyUsedTypes, setTrackableCopyUsedTypes] = useState<
    string[]
  >([]);

  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    text: string;
  }>({
    type: 'success',
    text: '',
  });

  const [showToast, setShowToast] = useState<boolean>(false);

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const [showOrdersModal, setShowOrdersModal] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedOrdersCount, setSelectedOrdersCount] = useState<number | null>(
    0,
  );
  const [selectedOrdersName, setSelectedOrdersName] = useState<string>('');
  const [activePage, setActivePage] = useState(0);

  const handleResize = (columnIndex: number, newWidth: number) => {
    const newColumnWidths = [...columnWidths];

    newColumnWidths[columnIndex] = newWidth;

    setColumnWidths(newColumnWidths);
  };
  const fetchTrackableCopies = async () => {
    try {
      setIsLoading(true);
      const response: any = await API.graphql(
        graphqlOperation(getTrackableCopiesNew, {
          getTrackableCopiesInput: {
            business_id: selectedBusiness?.id,
            date_from: daterange?.startDate,
            date_to: daterange?.endDate,
            page: currentPage + 1 || 1,
            sortField: activeSort.current,
            sortOrder:
              typesSorts[activeSort.current as FieldTrackabelCopySortType],
          },
        }),
      );

      if (response.data.getTrackableCopiesNew.error) {
        throw new Error(response.data.getTrackableCopiesNew.error.message);
      }

      setTrackableCopiesState(response?.data?.getTrackableCopiesNew?.data);
      setTotalPages(response?.data?.getTrackableCopiesNew?.numberPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBusiness) {
      fetchTrackableCopies();
    }
  }, [daterange, currentPage, typesSorts, selectedBusiness]);

  const genrateUniquePath = async () => {
    const response: any = await API.graphql(
      graphqlOperation(generateTrackableCopyPathNew, {
        generateTrackableCopyParams: {
          business_id: selectedBusiness?.id,
        },
      }),
    );
    if (
      response.data.generateTrackableCopyPathNew.data?.error ||
      response.data.generateTrackableCopyPathNew.error
    ) {
      throw new Error(
        response.data?.generateTrackableCopyPathNew.error.message,
      );
    }

    const path = response?.data?.generateTrackableCopyPathNew?.data?.path;
    setUniquePath(path);
  };

  const fetchTrackableCopyUsedTypes = async () => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(getTrackableCopyTypesNew, {
          getTrackableCopyTypesInput: {
            business_id: selectedBusiness?.id,
          },
        }),
      );

      if (response?.data?.getTrackableCopyTypesNew?.error) {
        throw new Error(response.data.getTrackableCopyTypesNew.error.message);
      }
      setTrackableCopyUsedTypes(response.data.getTrackableCopyTypesNew.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleCreateTrackableCopy = async () => {
    try {
      // check if destinationURL has http or https in it if not add it
      let destinationURLHttps = '';
      if (
        destinationURL.includes('http://') ||
        destinationURL.includes('https://')
      ) {
        destinationURLHttps = destinationURL;
      } else {
        destinationURLHttps = `https://${destinationURL}`;
      }

      const nameExists = trackableCopiesState.find(
        (copy) => copy.name === trackableCopyName,
      );

      if (nameExists) {
        setCopyNameError('Name already in use.');
        return;
      }

      if (
        (trackableCopyName === 'LinkedIn Bio' ||
          trackableCopyName === 'Instagram Bio' ||
          trackableCopyName === 'Facebook Page Description') &&
        trackableCopyType === 'social-media'
      ) {
        setCopyNameError('That name is reserved.');
        return;
      }

      if (!isValidURL(destinationURLHttps)) {
        setCopyURLError('Provided URL is not valid.');
        return;
      }

      setIsLoading(true);
      const response: any = await API.graphql(
        graphqlOperation(createTrackableCopyNew, {
          createTrackableCopyInput: {
            business_id: selectedBusiness?.id,
            short_code: uniquePath,
            destination_url: destinationURLHttps,
            description: description || '',
            name: trackableCopyName,
            url_position: shortURLPosition,
            type: trackableCopyType,
          },
        }),
      );

      if (response.data.createTrackableCopyNew.error) {
        if (response.data.createTrackableCopyNew.error.code === '216') {
          setCopyNameError('Name already in use.');
          setIsLoading(false);
          return;
        }
        throw new Error(response.data.createTrackableCopyNew.error.message);
      }

      setLinkModalActive(true);
      setShowDialog(true);
      fetchTrackableCopyUsedTypes();
      fetchTrackableCopies();
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDeleteCopy = async () => {
    try {
      setIsLoading(true);
      await API.graphql(
        graphqlOperation(deleteTrackableCopyNew, {
          deleteTrackableCopyInput: {
            id: deleteCopyOptions.id,
            short_code: deleteCopyOptions.short_code,
            business_id: selectedBusiness?.id,
          },
        }),
      );

      setDeleteModalActive(true);
      setDeleteCopyOptions({
        id: '',
        short_code: '',
      });
      setShowToast(true);
      setToast({
        ...toast,
        text: 'Post Track Updated',
      });
      fetchTrackableCopyUsedTypes();
      fetchTrackableCopies();
    } catch (error) {
      // console.log(error);
    }
  };

  const handleUpdateTrackableCopy = async () => {
    try {
      let destinationURLHttps = '';
      if (
        editLinkOptions?.destination_url.includes('http://') ||
        editLinkOptions?.destination_url.includes('https://')
      ) {
        destinationURLHttps = editLinkOptions.destination_url;
      } else {
        destinationURLHttps = `https://${editLinkOptions.destination_url}`;
      }

      const nameExists = trackableCopiesState.find(
        (copy) =>
          copy.name === editLinkOptions.name && copy.id !== editLinkOptions.id,
      );

      if (nameExists) {
        setCopyNameError('Name already in use.');
        return;
      }

      if (
        (editLinkOptions.name === 'LinkedIn Bio' ||
          editLinkOptions.name === 'Instagram Bio' ||
          editLinkOptions.name === 'Facebook Page Description') &&
        editLinkOptions.type === 'social-media'
      ) {
        setCopyNameError('That name is reserved.');
        return;
      }

      if (!isValidURL(destinationURLHttps)) {
        setCopyURLError('Provided URL is not valid.');
        return;
      }

      setIsLoading(true);
      const response: any = await API.graphql(
        graphqlOperation(updateTrackableCopyNew, {
          updateTrackableCopyInput: {
            id: editLinkOptions.id,
            business_id: selectedBusiness?.id,
            short_code: editLinkOptions.short_code,
            name: editLinkOptions.name,
            description: editLinkOptions.description,
            destination_url: destinationURLHttps,
            url_position: editLinkOptions.position,
          },
        }),
      );

      if (response.data.updateTrackableCopyNew.error) {
        if (response.data.updateTrackableCopyNew.error.code === '216') {
          setCopyNameError('Name already in use.');
          setIsLoading(false);
          return;
        }
        throw new Error(response.data.updateTrackableCopyNew.error.message);
      }

      setLinkModalActive(true);
      setEditLinkOptions({
        active: false,
        id: '',
        short_code: '',
        name: '',
        destination_url: '',
        description: '',
        position: 'top',
        type: '',
      });
      setCopyNameError(null);
      setShowToast(true);
      setToast({
        ...toast,
        text: 'Post Track Updated',
      });
      setCopyURLError(null);
      fetchTrackableCopies();
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSort = async (
    key: FieldTrackabelCopySortType,
    value: ValidTypeSort,
  ) => {
    activeSort.current = key;

    const updatedTypeSorts: Record<
      FieldTrackabelCopySortType,
      string | ValidTypeSort
    > = {
      clicks: '',
      purchases: '',
      created: 'desc',
      name: '',
      revenue: '',
    };

    updatedTypeSorts[key] = value;

    setTypeSorts(updatedTypeSorts);
  };

  useEffect(() => {
    setColumnWidths(() => linksColumns.map((column) => column.width));
  }, []);

  useEffect(() => {
    if (selectedBusiness) {
      fetchTrackableCopyUsedTypes();
    }
  }, [selectedBusiness]);

  useEffect(() => {
    if (!editLinkOptions.active) {
      if (linkModalActive) {
        genrateUniquePath();
      } else {
        setUniquePath('');
      }
    }
  }, [linkModalActive]);

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);
  return (
    <>
      <div className="absolute right-4 top-24">
        <RefreshDataButton business_id={selectedBusiness?.id as string} />
      </div>
      {showToast && <Toast notificationState={toast.type} text={toast.text} />}
      <div className="flex flex-col">
        <div className="grow px-8 py-8 overflow-y-auto">
          <div className="mx-auto">
            <h2 className="h2 flex items-center">Post Track</h2>
            <p className="text-darkGrade75 mb-5 text-lg mt-2 w-[55rem]">
              Post Track allows you to create links that can track a
              customer&apos;s journey up to and through purchases on your
              website for social media bios, social media posts, influencers,
              and more
            </p>
          </div>
          <CreateCards
            setLinkModalActive={setLinkModalActive}
            setTrackableCopyType={setTrackableCopyType}
            setTrackableCopyName={setTrackableCopyName}
            trackableCopyUsedTypes={trackableCopyUsedTypes}
          />
          <div className="widget-container p-5 max-h-[700px] flex flex-col mb-6 mt-3">
            <div className="flex justify-between items-center mb-5">
              <h5 className="h5">Overview</h5>
              <div className="inline-flex items-center relative">
                <div>
                  <div className="relative">
                    <Calendar
                      value={daterange}
                      onChange={setDaterange}
                      timezone={
                        selectedBusiness?.store?.timezone || 'America/Chicago'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="max-h-full relative">
              <LinksTable
                isLoading={isLoading}
                activeSort={activeSort}
                handleResize={handleResize}
                columnWidths={columnWidths}
                trackableCopies={trackableCopiesState}
                setDeleteCopyOptions={setDeleteCopyOptions}
                setDeleteModalActive={setDeleteModalActive}
                setEditLinkOptions={setEditLinkOptions}
                setLinkModalActive={setLinkModalActive}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                numberPages={totalPages}
                handleSort={handleSort}
                typesSorts={typesSorts}
                setShowOrdersModal={setShowOrdersModal}
                setSelectedSource={setSelectedSource}
                setSelectedOrdersCount={setSelectedOrdersCount}
                setSelectedOrdersName={setSelectedOrdersName}
              />
            </div>
          </div>
        </div>
      </div>
      <TailwindModal
        id="linkModal"
        showDialog={linkModalActive}
        setShowDialog={setLinkModalActive}
        styleDialog={{
          minWidth: '700px',
        }}
        handleCloseUpdate={() => {
          setUniquePath('');
          setTrackableCopyName('');
          setTrackableCopyType('');
          setDestinationURL('');
          setDescription('');
          setEditLinkOptions({
            active: false,
            id: '',
            short_code: '',
            name: '',
            destination_url: '',
            description: '',
            position: 'top',
            type: '',
          });
          setCopyNameError(null);
          setCopyURLError(null);
        }}
      >
        <LinkModal
          linkModalActive={linkModalActive}
          handleCreateTrackableCopy={handleCreateTrackableCopy}
          handleCancel={() => {
            setUniquePath('');
            setTrackableCopyName('');
            setTrackableCopyType('');
            setDestinationURL('');
            setDescription('');
            setEditLinkOptions({
              active: false,
              id: '',
              short_code: '',
              name: '',
              destination_url: '',
              description: '',
              position: 'top',
              type: '',
            });
            setCopyNameError(null);
            setLinkModalActive(true);
            setCopyURLError(null);
          }}
          trackableCopyType={trackableCopyType}
          isLoading={isLoading}
          trackableCopyName={trackableCopyName}
          setTrackableCopyName={setTrackableCopyName}
          destinationURL={destinationURL}
          setDestinationURL={setDestinationURL}
          description={description}
          setDescription={setDescription}
          setUniquePath={setUniquePath}
          path={uniquePath}
          editLinkOptions={editLinkOptions}
          handleUpdateTrackableCopy={handleUpdateTrackableCopy}
          setEditLinkOptions={setEditLinkOptions}
          shortURLPosition={shortURLPosition}
          setShortURLPosition={setShortURLPosition}
          copyNameError={copyNameError}
          setCopyNameError={setCopyNameError}
          copyURLError={copyURLError}
          setCopyURLError={setCopyURLError}
        />
      </TailwindModal>
      <TailwindModal
        id="deleteTrackableCopyModal"
        showDialog={deleteModalActive}
        setShowDialog={setDeleteModalActive}
      >
        <DeleteTrackableCopyModal
          loading={isLoading}
          handleDeleteCopy={handleDeleteCopy}
          setDeleteModalActive={setDeleteModalActive}
          deleteCopyOptions={deleteCopyOptions}
        />
      </TailwindModal>
      <TailwindModal
        id="ordersModal"
        showDialog={showOrdersModal}
        setShowDialog={setShowOrdersModal}
        handleCloseUpdate={() => {
          setSelectedSource('');
          setSelectedOrdersCount(0);
          setSelectedOrdersName('');
          setActivePage(0);
        }}
        styleDialog={{ minWidth: '808px' }}
      >
        <OrdersModal
          setOpenModal={setShowOrdersModal}
          selectedSource={selectedSource}
          selectedDateValue={daterange}
          selectedOrdersCount={selectedOrdersCount}
          selectedOrdersName={selectedOrdersName}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </TailwindModal>
      <TailwindModal
        id="linkCreated"
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      >
        <CreatedModal
          title="Post Track Created"
          type="success"
          id="linkCreated"
        />
      </TailwindModal>
    </>
  );
};

export default PostTrackApp;
