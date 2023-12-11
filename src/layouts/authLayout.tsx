import { ReactNode } from 'react';
import { GuestHeader } from '@components/headers/guestHeader';

type AuthLayoutProps = { children: ReactNode };

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <GuestHeader />

      {children}
    </div>
  );
};
