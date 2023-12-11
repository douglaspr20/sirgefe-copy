import React, { FC } from 'react';
import OnboardingLayout from '_layout/onboardingLayout.client';
import ValidateUser from '_auth/ValidateUser.client';

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <OnboardingLayout>
      {children}
      <ValidateUser />
    </OnboardingLayout>
  );
};

export default Layout;
