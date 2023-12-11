import { IntercomChat } from '_IntercomChat';
import { BaseLayout } from '_layout/baseLayout.client';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const layout: FC<Props> = ({ children }) => {
  return (
    <BaseLayout styleClass={{ zIndex: 1 }} cssClass="flex flex-col">
      {children}
      <IntercomChat />
    </BaseLayout>
  );
};

export default layout;
