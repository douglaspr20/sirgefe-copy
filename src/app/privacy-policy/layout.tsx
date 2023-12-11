import { GuestHeader } from '_components/headers/guestHeader';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <GuestHeader />

      {children}
    </div>
  );
};

export default Layout;
