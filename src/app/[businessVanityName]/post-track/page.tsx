import React from 'react';
import { Metadata } from 'next';
import { withAuth } from '_auth/withAuth.server';
import PostTrackApp from '@components/postrack/app/PostTrackApp';

import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { headers } from 'next/headers';

dayjs.extend(utc);
dayjs.extend(timezone);

const getData = async () => {
  const cookies = headers().get('cookie');
};

const Page = async () => {
  return <PostTrackApp />;
};

export const metadata: Metadata = {
  title: 'Sirge | Post Track',
};

export default withAuth(Page);
