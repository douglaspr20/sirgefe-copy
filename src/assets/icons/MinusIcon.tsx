import React, { FC } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const MinusIcon: FC<Props> = ({
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
      fill={fill}
    >
      <path
        d="M12.5012 11H19.7543C20.1685 11 20.5043 11.3358 20.5043 11.75C20.5043 12.1297 20.2221 12.4435 19.8561 12.4932L19.7543 12.5H12.5012C11.5 12.5 12 12.4932 11.0012 12.5H3.7522C3.33798 12.5 3.0022 12.1642 3.0022 11.75C3.0022 11.3703 3.28435 11.0565 3.65043 11.0068L3.7522 11H11.0012C12 11 12 11 12.5012 11Z"
        fill={fill}
      />
    </svg>
  );
};

export default MinusIcon;
