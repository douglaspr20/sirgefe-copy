'use client';

import ArrowSyncCircleIcon from '@assets/icons/ArrowSyncCircleIcon';
import FacebookIcon from '@assets/icons/FacebookIcon';
import MoreVerticalicon from '@assets/icons/MoreVerticalicon';
import PauseCircleIcon from '@assets/icons/PauseCircleIcon';
import TikTokIcon2 from '@assets/icons/TikTokIcon2';
import {
  IAudienceItem,
  SegmentStatus,
  SegmentTypes,
} from '@interfaces/audiences';
import { moneyFormatter } from '@utils/format';
import useClickOutside from '_utils/outsideHook';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import ErrorImage from '../../../public/images/error.png';
import Tooltip from '_components/Tooltip';
import { BusinessPrisma } from 'API';

interface Props {
  status: SegmentStatus;
  segmentName: string;
  segmentType: SegmentTypes;
  customers?: number | null;
  revenue?: number | null;
  socialMedia?: IAudienceItem[];
  segmentId: string;
  setSelectedSegmentId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSegmentAudiences: React.Dispatch<
    React.SetStateAction<IAudienceItem[] | undefined>
  >;
  setSelectedSegmentName: React.Dispatch<React.SetStateAction<string>>;
  handleCreateAudiene?: () => void;
  handleActivate: () => void;
  handleDeactivate: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleDuplicate: () => void;
  selectedBusiness: BusinessPrisma | null | undefined;
}

const GroupRow: FC<Props> = ({
  status,
  segmentName,
  segmentType,
  customers,
  revenue,
  socialMedia,
  setSelectedSegmentId,
  setSelectedSegmentAudiences,
  setSelectedSegmentName,
  segmentId,
  handleCreateAudiene,
  handleActivate,
  handleDeactivate,
  handleDelete,
  handleEdit,
  handleDuplicate,
  selectedBusiness,
}) => {
  const { ref, open, setOpen } = useClickOutside(false);
  const router = useRouter();

  const navigateToResults = () => {
    router.push(
      `/${selectedBusiness?.vanity_name}/audiences/dynamicQuery?segmentId=${segmentId}`,
    );
  };

  return (
    <tr key={segmentId} className="py-2 px-4 border-t border-b border-gray-300 cursor-pointer">
      <td className="px-6 py-4 w-10 whitespace-nowrap">
        <div className="relative inline-block text-left" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <MoreVerticalicon />
          </button>
          {open && (
            <div
              className="z-10 left-0 absolute mt-2 w-[180px] rounded-lg shadow-lg bg-white border border-borderLightColor"
              role="menu"
              aria-orientation="vertical"
              style={{ left: '-10px' }}
            >
              <div className="py-1" role="none">
                <a
                  className="cursor-pointer text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  onClick={handleEdit}
                >
                  Edit
                </a>
                <a
                  className="cursor-pointer text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  onClick={() => {
                    setOpen(!open);
                    handleDuplicate();
                  }}
                >
                  Duplicate
                </a>
                <a
                  className="cursor-pointer text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  onClick={() => {
                    setOpen(!open);
                    setSelectedSegmentId(segmentId);
                    if (setSelectedSegmentName)
                      setSelectedSegmentName(segmentName);
                    if (setSelectedSegmentAudiences) {
                      setSelectedSegmentAudiences(socialMedia);
                    }
                    if (
                      status === SegmentStatus.INACTIVE ||
                      status === SegmentStatus.CREATED
                    ) {
                      handleActivate();
                    }
                    if (status === SegmentStatus.ACTIVE) {
                      handleDeactivate();
                    }
                  }}
                >
                  {status === SegmentStatus.ACTIVE ? 'Deactivate' : 'Activate'}
                </a>
                <a
                  className="cursor-pointer text-warningColor block px-4 py-2 text-sm"
                  role="menuitem"
                  // data-bs-toggle="modal"
                  // data-bs-target="#deleteSegment"
                  onClick={() => {
                    setOpen(!open);
                    if (setSelectedSegmentId) setSelectedSegmentId(segmentId);
                    if (setSelectedSegmentName)
                      setSelectedSegmentName(segmentName);
                    if (handleDelete) handleDelete();
                  }}
                >
                  Delete
                </a>
              </div>
            </div>
          )}
        </div>
      </td>

      <td
        className="px-6 py-4 w-20 whitespace-nowrap capitalize"
        onClick={navigateToResults}
      >
        <span
          className={`tag ${status === SegmentStatus.ACTIVE
              ? 'green'
              : status === SegmentStatus.INACTIVE
                ? 'yellow'
                : 'blue'
            }`}
        >
          {status}
        </span>
      </td>

      <td
        className="px-6 py-4 w-60 whitespace-nowrap"
        onClick={navigateToResults}
      >
        <div className="inline-flex flex-col">
          <div className="font-semibold mb-0.5">{segmentName}</div>
          <div className="flex items-center">
            {segmentType === SegmentTypes.DYNAMIC ? (
              <ArrowSyncCircleIcon />
            ) : (
              <PauseCircleIcon />
            )}

            <span className="text-textTeriraryColor font-light ml-1">
              {segmentType}
            </span>
          </div>
        </div>
      </td>

      <td
        className="px-6 py-4 w-40 whitespace-nowrap"
        onClick={navigateToResults}
      >
        <div className="inline-flex flex-col">
          <div className="font-semibold mb-0.5">{customers}</div>
          <span className="text-textTeriraryColor font-light">Customers</span>
        </div>
      </td>

      <td
        className="px-6 py-4 w-40 whitespace-nowrap"
        onClick={navigateToResults}
      >
        <div className="inline-flex flex-col">
          <div className="font-semibold mb-0.5">
            {revenue && moneyFormatter.format(revenue)}
          </div>
          <span className="text-textTeriraryColor font-light">
            Added revenue
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        {socialMedia && socialMedia?.length ? (
          <div className="flex items-center border max-w-[130px] justify-around p-1 border-borderLightColor rounded-lg ml-auto">
            {socialMedia.map((item, i) => {
              if (item.name.toLowerCase() === 'facebook')
                return (
                  <div style={{ position: 'relative' }}>
                    {item?.error && item?.error.length && (
                      <div>
                        <Image
                          src={ErrorImage}
                          alt="error-image"
                          id={`FacebookTooltip${segmentId + i}`}
                          style={{
                            position: 'absolute',
                            height: '10px',
                            width: '10px',
                            right: '-2px',
                            top: '0px',
                          }}
                        />

                        <Tooltip
                          title={item.error}
                          anchorId={`FacebookTooltip${segmentId + i}`}
                        />
                      </div>
                    )}

                    <FacebookIcon width={24} height={24} />
                  </div>
                );

              if (item.name.toLowerCase() === 'tiktok')
                return (
                  <div style={{ position: 'relative' }}>
                    {item?.error && item?.error.length && (
                      <div>
                        <Image
                          src={ErrorImage}
                          alt="error-image"
                          id={`Tiktoktooltip-${segmentId + i}`}
                          style={{
                            position: 'absolute',
                            height: '10px',
                            width: '10px',
                            right: '-5px',
                            top: '0px',
                          }}
                        />

                        <Tooltip
                          title={item.error}
                          anchorId={`Tiktoktooltip-${segmentId + i}`}
                        />
                      </div>
                    )}

                    <TikTokIcon2 width={22} height={22} />
                  </div>
                );

              if (item.name.toLowerCase() === 'google')
                return (
                  <div style={{ position: 'relative' }}>
                    {item?.error && item?.error.length && (
                      <div>
                        <Image
                          src={ErrorImage}
                          alt="error-image"
                          id={`GoogleTooltip${segmentId + i}`}
                          style={{
                            position: 'absolute',
                            height: '10px',
                            width: '10px',
                            right: '-5px',
                            top: '0px',
                          }}
                        />

                        <Tooltip
                          title={item.error}
                          anchorId={`GoogleTooltip${segmentId + i}`}
                        />
                      </div>
                    )}

                    <Image
                      src="/images/google.svg"
                      width={24}
                      height={24}
                      alt="google"
                    />
                  </div>
                );
            })}

            <i
              className="icon-edit-fill text-darkGrade50 text-xl"
              data-bs-toggle="modal"
              data-bs-target="#audienceSegmentModal"
              onClick={() => {
                if (setSelectedSegmentAudiences && socialMedia) {
                  setSelectedSegmentAudiences(socialMedia);
                } else if (setSelectedSegmentAudiences) {
                  setSelectedSegmentAudiences([]);
                }
                if (setSelectedSegmentId) {
                  setSelectedSegmentId(segmentId);
                }
              }}
            />
          </div>
        ) : (
          <div className="flex ml-auto">
            <button
              className="link ml-auto flex items-center"
              onClick={() => {
                if (setSelectedSegmentId) {
                  setSelectedSegmentId(segmentId);
                }
                if (handleCreateAudiene) {
                  handleCreateAudiene();
                }
                if (setSelectedSegmentAudiences && socialMedia) {
                  setSelectedSegmentAudiences(socialMedia);
                } else if (setSelectedSegmentAudiences) {
                  setSelectedSegmentAudiences([]);
                }
              }}
              data-bs-toggle="modal"
              data-bs-target="#audienceSegmentModal"
            >
              <i className="icon-add-circle mr-2 text-xl" /> Create Audience
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default GroupRow;
