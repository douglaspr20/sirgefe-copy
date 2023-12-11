import React, { useState } from 'react';
import { PageView } from '@sirge-io/sirge-types';
import Link from 'next/link';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { useBoundStore } from '@store/index';

dayjs.extend(timezone);

interface Props {
  visitor: PageView;
}
const VisitorItem = ({ visitor }: Props) => {
  const { selectedBusiness } = useBoundStore.getState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const date = dayjs(String(visitor?.created)).tz(
    selectedBusiness?.store?.timezone ?? 'America/Los_Angeles',
  );
  return (
    <tr>
      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
        <span className="inline-flex items-center">
          {visitor.visitor_name ? visitor.visitor_name : '-'}

          <Link
            className="text-xl ml-1 text-darkGrade50 hover:text-darkGrade75 inline-flex items-center relative"
            target="_blank"
            data-bs-toggle="popover"
            data-bs-placement="bottom"
            data-bs-title="Some info title"
            data-bs-trigger="hover focus"
            href={{
              pathname: `/${selectedBusiness?.vanity_name}/visitors/${visitor?.visitor_id}/profile`,
            }}
          >
            <svg
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
              className="visitors_performance_link"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="icon"
                d="M5.20827 3.75C4.40287 3.75 3.74997 4.40292 3.74997 5.20833V14.7917C3.74997 15.5971 4.40287 16.25 5.20827 16.25H14.7914C15.5968 16.25 16.2497 15.5971 16.2497 14.7917V11.4583C16.2497 11.1132 16.5295 10.8333 16.8746 10.8333C17.2198 10.8333 17.4996 11.1132 17.4996 11.4583V14.7917C17.4996 16.2874 16.2871 17.5 14.7914 17.5H5.20827C3.71253 17.5 2.5 16.2874 2.5 14.7917V5.20833C2.5 3.71256 3.71253 2.5 5.20827 2.5H8.54152C8.88668 2.5 9.1665 2.77982 9.1665 3.125C9.1665 3.47018 8.88668 3.75 8.54152 3.75H5.20827ZM10.8331 3.125C10.8331 2.77982 11.1129 2.5 11.4581 2.5H16.875C17.2202 2.5 17.5 2.77982 17.5 3.125V8.54167C17.5 8.88684 17.2202 9.16667 16.875 9.16667C16.5298 9.16667 16.25 8.88684 16.25 8.54167V4.63395L11.9 8.98363C11.6559 9.2277 11.2602 9.22768 11.0162 8.98359C10.7721 8.7395 10.7721 8.34377 11.0162 8.0997L15.3662 3.75H11.4581C11.1129 3.75 10.8331 3.47018 10.8331 3.125Z"
                fill="#A1B3C4"
              />
            </svg>
            <div
              className={`${
                !isPopoverOpen && 'hidden'
              } items-center bg-white border rounded-md border-extraLightColor px-[12px] py-2 shadow-lg whitespace-nowrap absolute  -top-[55px] -translate-x-14 z-[150]`}
            >
              <span className="text-textSecondaryColor text-sm font-semibold">
                View user profile
              </span>
            </div>
          </Link>
        </span>
      </td>
      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
        {visitor.purchases_count}
      </td>
      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
        $
        <NumericFormat
          displayType="text"
          value={visitor.conversion_value}
          allowLeadingZeros={true}
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator=","
        />
      </td>
      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
        {date.format('MMMM DD, YYYY HH:mm A')}
      </td>
    </tr>
  );
};

export default VisitorItem;
