import React, { FC } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const PauseIcon: FC<Props> = ({
  width = 10,
  height = 10,
  fill = '#A1B3C3',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Pause">
        <path
          id="Shape"
          d="M2.39421 1.25C1.9915 1.25 1.66504 1.57646 1.66504 1.97917V8.02083C1.66504 8.42354 1.9915 8.75 2.39421 8.75H3.85254C4.25525 8.75 4.58171 8.42354 4.58171 8.02083V1.97917C4.58171 1.57646 4.25525 1.25 3.85254 1.25H2.39421ZM6.14421 1.25C5.7415 1.25 5.41504 1.57646 5.41504 1.97917V8.02083C5.41504 8.42354 5.7415 8.75 6.14421 8.75H7.60254C8.00525 8.75 8.33171 8.42354 8.33171 8.02083V1.97917C8.33171 1.57646 8.00525 1.25 7.60254 1.25H6.14421Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default PauseIcon;
