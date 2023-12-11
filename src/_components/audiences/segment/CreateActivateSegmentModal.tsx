'use client';

import Image from 'next/image';

import SuccessIcon from '@assets/img/success-icon.svg';
import { IAudienceItem } from '@interfaces/audiences';

import AudienceComponent from './AudienceComponent';

type Props = {
  isUpdate: boolean;
  handleClick: (a: IAudienceItem[]) => void;
  audiences?: IAudienceItem[];
  handleSkip: () => void;
  isCreate?: boolean;
  modalLoader: boolean;
};

const CreateActivateSegmentModal: React.FunctionComponent<Props> = ({
  isUpdate,
  handleClick,
  handleSkip,
  audiences,
  isCreate,
  modalLoader,
}) => {
  const getContent = () => {
    const obj = {
      title: 'Create audience',
      description: 'You can create audience and send to your platforms',
      btnTitle: 'Create Audience',
    };
    if (isUpdate === true && audiences?.length) {
      obj.title = 'Update Audience';
      obj.description = 'You can update audience and send to your platforms';
      obj.btnTitle = 'Update Audience';
    }
    return obj;
  };
  const selectSegment = () => {
    if (isUpdate) {
      return 'Updated';
    } else if (isCreate) {
      return 'Created';
    } else {
      return 'Activated';
    }
  };

  return (
    <>
      <div className="p-5 bg-white mb-3 rounded-md">
        <h5 className="text-center capitalize flex items-center justify-center">
          <Image
            src={SuccessIcon}
            width={32}
            height={32}
            alt="error-warning"
            className="mr-2"
          />
          Segment {selectSegment()}
        </h5>
      </div>
      <AudienceComponent
        title={getContent().title}
        desctiption={getContent().description}
        handleClick={handleClick}
        btnTitle={getContent().btnTitle}
        audiences={audiences}
        handleSkip={handleSkip}
        modalLoader={modalLoader}
      />
    </>
  );
};

export default CreateActivateSegmentModal;
