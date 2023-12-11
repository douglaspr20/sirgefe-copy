import React, { FC } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const PauseCircleFilledIcon: FC<Props> = ({
  width = 24,
  height = 24,
  fill = '#8C9DAD',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10.5 8.25V15.75C10.5 16.1642 10.1642 16.5 9.75 16.5C9.33579 16.5 9 16.1642 9 15.75V8.25C9 7.83579 9.33579 7.5 9.75 7.5C10.1642 7.5 10.5 7.83579 10.5 8.25ZM15 8.25V15.75C15 16.1642 14.6642 16.5 14.25 16.5C13.8358 16.5 13.5 16.1642 13.5 15.75V8.25C13.5 7.83579 13.8358 7.5 14.25 7.5C14.6642 7.5 15 7.83579 15 8.25Z"
        fill={fill}
      />
    </svg>
  );
};

export default PauseCircleFilledIcon;
