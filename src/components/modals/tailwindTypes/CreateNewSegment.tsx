'use client';
import React, { useState } from 'react';
import ArrowSyncCircleFilledIcon from '@assets/icons/ArrowSyncCircleFilledIcon';
import PauseCircleFilledIcon from '@assets/icons/PauseCircleFilledIcon';
import SegmentOption from '_components/audiences/SegmentOption';
import { useRouter } from 'next/navigation';
import { SegmentTypes } from '@interfaces/audiences';
import { format } from 'url';
import { useBoundStore } from '@store/index';
import { initialRule, initialRuleSegment } from '@store/slices';
import { BusinessPrisma } from 'API';

type CreateNewSegmentProps = {
  selectedBusiness: BusinessPrisma | null | undefined;
};

const CreateNewSegment = ({ selectedBusiness }: CreateNewSegmentProps) => {
  const router = useRouter();
  const { setDynamicSegment, setSegment, setIsEdit } = useBoundStore();
  const [selectedOption, setSelectedOption] = useState<SegmentTypes>();

  const emptyStore = () => {
    setIsEdit(false);
    setSegment(initialRule);
    setDynamicSegment(initialRuleSegment);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between relative">
          <h3 className="h3" onClick={emptyStore}>
            Create new segment
          </h3>
          <button
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>

        <span className="mt-2 text-textTeriraryColor text-sm font-light">
          Choose the type of segment
        </span>

        <div className="flex justify-between mt-4 px-2">
          <SegmentOption
            icon={
              <ArrowSyncCircleFilledIcon
                width={28}
                height={28}
                fill={'#32C4D4'}
              />
            }
            title="Dynamic segment"
            description="Embrace real-time audience updates, reflecting daily actions. Automate campaign adaptability to engage with ever-evolving customer interests"
            onClick={() => setSelectedOption(SegmentTypes.DYNAMIC)}
            recommended
            selected={selectedOption === SegmentTypes.DYNAMIC}
          />

          <SegmentOption
            icon={
              <PauseCircleFilledIcon width={28} height={28} fill={'#32C4D4'} />
            }
            title="Static segment"
            description="Create a stable audience list with fixed criteria. Ideal for focused campaigns, ensuring consistent targeting of specific customer groups"
            onClick={() => setSelectedOption(SegmentTypes.STATIC)}
            selected={selectedOption === SegmentTypes.STATIC}
          />
        </div>

        <div className="w-full mt-2">
          {selectedOption && (
            <button
              className="btn btn-primary w-full h-12 rounded-md mt-4 font-medium text-sm"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                emptyStore();
                const formattedUrl = format({
                  pathname: `/${selectedBusiness?.name}/audiences/segment`,
                  query: {
                    segmentType: selectedOption,
                  },
                });
                router.push(formattedUrl);
              }}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateNewSegment;
