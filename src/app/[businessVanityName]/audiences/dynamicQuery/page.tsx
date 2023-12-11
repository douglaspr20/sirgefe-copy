'use client';
import { useBoundStore } from '@store/index';

// import { RedirectZ } from 'app/components/RedirectZ';
import DynamicQueryPage from './dynamicQueryPage';

async function dynamicQuery() {
  const { selectedBusiness } = useBoundStore.getState();

  return (
    <>
      <DynamicQueryPage selectedBusiness={selectedBusiness} />
    </>
  );
}

export default dynamicQuery;
