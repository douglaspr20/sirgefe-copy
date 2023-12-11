import React, { FC } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const PauseCircleIcon: FC<Props> = ({
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
        d="M10.5 8.25C10.5 7.83579 10.1642 7.5 9.75 7.5C9.33579 7.5 9 7.83579 9 8.25V15.75C9 16.1642 9.33579 16.5 9.75 16.5C10.1642 16.5 10.5 16.1642 10.5 15.75V8.25ZM15 8.25C15 7.83579 14.6642 7.5 14.25 7.5C13.8358 7.5 13.5 7.83579 13.5 8.25V15.75C13.5 16.1642 13.8358 16.5 14.25 16.5C14.6642 16.5 15 16.1642 15 15.75V8.25ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12Z"
        fill={fill}
      />
    </svg>
  );
};

export default PauseCircleIcon;
