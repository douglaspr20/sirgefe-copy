'use client';
import { useBoundStore } from '@store/index';
import Head from 'next/head';

import SegmentPage from './segmentPage';

function Segment() {
  const { selectedBusiness } = useBoundStore.getState();
  return (
    <>
      <Head>
        <title>Sirge | {`${selectedBusiness?.name} - Segment Builder`}</title>
      </Head>
      <SegmentPage selectedBusiness={selectedBusiness} />
    </>
  );
}

export default Segment;
