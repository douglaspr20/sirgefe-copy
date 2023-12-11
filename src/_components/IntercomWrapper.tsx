'use client';
import React, { FC } from 'react';
import { IntercomProvider } from 'react-use-intercom';

interface Props {
  children: React.ReactNode;
}

const IntercomWrapper: FC<Props> = ({ children }) => {
  return (
    <IntercomProvider
      appId={process.env.NEXT_PUBLIC_INTERCOM_ID as string}
      apiBase="https://api-iam.intercom.io"
    >
      {children}
    </IntercomProvider>
  );
};

export default IntercomWrapper;
