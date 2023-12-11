import React, { FC } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const PlayIcon: FC<Props> = ({ width = 25, height = 24, fill = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 229 229"
      fill="none"
    >
      <path
        d="M157 105.34C163.667 109.189 163.667 118.811 157 122.66L100 155.569C93.3333 159.418 85 154.607 85 146.909L85 81.091C85 73.393 93.3333 68.5818 100 72.4308L157 105.34Z"
        fill={fill}
      />
    </svg>
  );
};

export default PlayIcon;
