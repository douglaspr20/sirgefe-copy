'use client';
import { useBoundStore } from '@store/index';
import { formatSeconds } from '@utils/format';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import Popover from './Popover';

interface Props {
  offset?: [number, number];
  style?: React.CSSProperties;
}

const RefreshDataButton: FC<Props> = ({ style }) => {
  const { triggerFetch, fetchComplete, selectedBusiness } =
    useBoundStore.getState();

  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const business_id = selectedBusiness?.id as string;

  const getLastUpdated = function () {
    return (selectedBusiness as any)?.last_data_refreshed
      ? `${formatSeconds(
          dayjs().diff(
            dayjs((selectedBusiness as any)?.last_data_refreshed),
            'seconds',
          ),
        )} Ago`
      : 'Never';
  };

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-20, 3],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom'],
        },
      },
    ],
    placement: 'left',
  });

  useEffect(() => {
    if (fetchComplete) {
      setDisabled(false);
    }
  }, [fetchComplete]);

  const handleClick = () => {
    setDisplayPopover(false);
    setDisabled(true);
    triggerFetch(business_id);
  };

  return (
    <div className="flex" style={style}>
      <div ref={setReferenceElement} className="ml-auto mb-2 relative z-50">
        <button
          onClick={() => handleClick()}
          onMouseEnter={() => setDisplayPopover(true)}
          onMouseLeave={() => setDisplayPopover(false)}
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            border: '1px solid #DFDFE7',
            borderRadius: '4px 0px 0px 4px',
          }}
          disabled={disabled}
        >
          <i className="icon-arrow-clockwise" style={{ fontSize: '1.2rem' }} />
        </button>

        <div
          ref={setPopperElement}
          className={`${
            displayPopover ? 'popover visible' : 'popover visually-hidden'
          }`}
          style={{ ...styles.popper, width: '200px' }}
          {...attributes.popper}
        >
          <Popover
            title={'Refresh Data'}
            content={`Last Update: ${getLastUpdated()}`}
            customClassPopoverBody={{ padding: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RefreshDataButton;
