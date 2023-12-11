import Popover from '@components/Popover';
import { Business } from '@sirge-io/sirge-types';
import { Sidebar } from '@utils/types';
import Link from 'next/link';
import { useState } from 'react';
import { usePopper } from 'react-popper';

type SidebarProps = {
  item: Sidebar;
  selectedBusiness: Business | null;
  isExpanded: boolean;
  hideLinks: boolean;
  isActive: boolean;
};

const SidebarItem: React.FunctionComponent<SidebarProps> = ({
  item,
  selectedBusiness,
  isExpanded,
  hideLinks,
  isActive,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);
  const [textColor, setTextColor] = useState<string>('text-textTeriraryColor');

  const { styles, attributes } = usePopper(referenceElement, popperElement, {});

  return (
    <>
      <li
        className={`mb-4 ${isExpanded && 'w-full'}`}
        onMouseEnter={() => setTextColor('text-textSecondaryColor')}
        onMouseLeave={() => setTextColor('text-textTeriraryColor')}
      >
        <Link
          href={
            item.route === '/settings'
              ? `/${selectedBusiness?.vanity_name}${item.route}/profile`
              : `/${selectedBusiness?.vanity_name}${item.route} `
          }
          aria-label={item.title}
          className={`
                    ${isActive && 'active'} ${
            isExpanded && !hideLinks && 'w-border'
          } border border-transparent [&.active]:border-extraLightColor rounded-lg py-2 px-2 inline-flex items-center gap-2 w-full`}
          ref={!isActive ? setReferenceElement : null}
        >
          <span
            onMouseEnter={() => setDisplayPopover(true)}
            onMouseLeave={() => setDisplayPopover(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              fill={isActive ? '#32C4D4' : '#8C9DAD' || 'none'}
            >
              {item.icon}
            </svg>
          </span>

          {isExpanded && !hideLinks ? (
            <span
              className={`${
                isActive && 'active'
              } [&.active]:text-primaryColor ${textColor} font-medium`}
            >
              {item.title}
            </span>
          ) : (
            <Tooltip
              setPopperElement={setPopperElement as unknown as HTMLElement}
              displayPopover={displayPopover}
              attributes={attributes}
              styles={styles}
              title={item.title}
            />
          )}
        </Link>
      </li>
    </>
  );
};

export default SidebarItem;

function Tooltip({
  setPopperElement,
  displayPopover,
  attributes,
  styles,
  title,
}: {
  setPopperElement: HTMLElement;
  displayPopover: boolean;
  attributes: any;
  styles: any;
  title: string;
}) {
  return (
    <div
      ref={setPopperElement}
      className={`${
        displayPopover ? 'popover visible' : 'popover visually-hidden'
      }`}
      style={{
        ...styles.popper,
        minWidth: '65px',
        minHeight: '34px',
        top: -38,
        left: 49,
        display: styles.popper?.right === 'auto' ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...attributes.popper}
    >
      <Popover
        title={title}
        customClassPopoverBody={{
          padding: 0,
        }}
        customClassPopoverTitle={{
          fontSize: 14,
          textAlign: 'center',
        }}
      />
    </div>
  );
}
