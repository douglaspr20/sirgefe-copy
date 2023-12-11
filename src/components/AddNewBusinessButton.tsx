import React, { FC, useState } from 'react';
import { usePopper } from 'react-popper';
import Popover from './Popover';

type PlacementType = 'bottom' | 'top';

interface Props {
  disabled: boolean;
  placement: PlacementType;
  offset?: [number, number];
  popoverContent: {
    title: string;
    content: string;
  };
}
const AddNewBusinessButton: FC<Props> = ({
  disabled,
  placement,
  offset = [10, 10],
  popoverContent,
}) => {
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset,
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top'],
        },
      },
    ],
    placement,
  });

  return (
    <div className="flex justify-center mt-4">
      <div className="flex justify-center max-w-sm w-full">
        <button
          ref={setReferenceElement}
          className={`inline-flex items-center font-medium text-primaryColor ${
            disabled ? 'opacity-50' : 'hover:text-primaryColorHover'
          }`}
          onMouseEnter={() => setDisplayPopover(true)}
          onMouseLeave={() => setDisplayPopover(false)}
          disabled={disabled}
          data-bs-toggle="modal"
          data-bs-target="#createBusinessModal"
        >
          <i className="icon-add-circle mr-2 text-xl"></i> Add new business
        </button>
        {disabled && (
          <div
            ref={setPopperElement}
            className={`w-full ${
              displayPopover ? 'popover visible' : 'popover visually-hidden'
            }`}
            style={styles.popper}
            {...attributes.popper}
          >
            <Popover
              title={popoverContent.title}
              content={popoverContent.content}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewBusinessButton;
