import React, { FC } from 'react';

interface Props {
  width?: number;
  height?: number;
}

const TikTokIcon2: FC<Props> = ({ width = 27, height = 28 }) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.8334 14C26.8334 6.63617 20.8639 0.666626 13.5001 0.666626C6.1363 0.666626 0.166748 6.63617 0.166748 14C0.166748 21.3637 6.1363 27.3333 13.5001 27.3333C20.8639 27.3333 26.8334 21.3637 26.8334 14ZM20.4334 9.76808C18.2495 9.62408 16.9935 8.27043 16.7318 5.99996V6.00476H14.1102V15.5619C14.5051 20.6644 9.7567 19.8916 9.39035 17.2803C9.20003 15.9171 9.88517 15.1443 11.0937 14.7314C11.4981 14.5922 11.9406 14.4866 12.3545 14.4194V11.7265C6.921 11.9234 5.88378 16.8339 7.57759 19.6324C10.2135 23.9813 16.7698 22.0853 16.7698 16.0179V11.2417C18.0592 12.029 19.1678 12.4466 20.4334 12.3218V9.76808Z"
        fill="#34404B"
      />
    </svg>
  );
};

export default TikTokIcon2;