import { AuthenticatedHeader } from '@components/headers/authenticatedHeader';
import { ReactNode } from 'react';

type BaseLayoutProps = {
  children: ReactNode;
  cssClass?: string;
  styleClass?: any;
};

export const BaseLayout = ({
  children,
  cssClass,
  styleClass,
}: BaseLayoutProps) => {
  return (
    <div
      className={`h-screen overflow-hidden ${cssClass ? cssClass : ''}`}
      style={styleClass}
    >
      <AuthenticatedHeader />

      {children}
    </div>
  );
};
