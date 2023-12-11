"use client";
import { useBoundStore } from '@store/index';

import AudiencesPage from './audiencesPage';

function Audiences() {
  const { selectedBusiness, userProfile } = useBoundStore();

  return (
    <>
      <AudiencesPage
        selectedBusiness={selectedBusiness}
        userProfile={userProfile}
      />
    </>
  );
}

export default Audiences;
