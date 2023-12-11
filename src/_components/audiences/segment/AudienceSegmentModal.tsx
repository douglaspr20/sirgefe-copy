'use client';

import { IAudienceItem } from '@interfaces/audiences';

import AudienceComponent from './AudienceComponent';

type Props = {
  isUpdate: boolean;
  handleClick: (a: IAudienceItem[]) => void;
  audiences?: IAudienceItem[];
  modalLoader: boolean;
};

const AudienceSegmentModal: React.FunctionComponent<Props> = ({
  isUpdate,
  handleClick,
  audiences,
  modalLoader,
}) => {
  const getContent = () => {
    const obj = {
      title: 'Create audience',
      description: 'You can create audience and send to your platforms',
      btnTitle: 'Create Audience',
    };
    if (isUpdate === true) {
      obj.title = 'Edit Audience';
      obj.description = 'You can update audience and send to your platforms';
      obj.btnTitle = 'Update Audience';
    }
    return obj;
  };

  return (
    <AudienceComponent
      title={getContent().title}
      desctiption={getContent().description}
      handleClick={handleClick}
      btnTitle={getContent().btnTitle}
      audiences={audiences}
      modalLoader={modalLoader}
    />
  );
};

export default AudienceSegmentModal;
