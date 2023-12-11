'use client';

import { Auth, Amplify } from 'aws-amplify';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useBoundStore } from '@store/index';
import awsConfig from '@graphql/aws-config';
import {
  initialBusinessProfileSlice,
  initialBusinessConnectionSlice,
} from '@store/slices';

Amplify.configure({
  ...awsConfig,
  ssr: true,
});

const ValidateUser = () => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const validateUser = async () => {
      try {
        const userData = await Auth.currentUserInfo();
        if (!Object.keys(userData).length) {
          throw Error('Not authenticated');
        }

        if (pathname?.includes('login')) {
          router.push('/selector');
        }
      } catch (error) {
        useBoundStore.setState({
          ...initialBusinessProfileSlice,
          ...initialBusinessConnectionSlice,
        });
        router.push('/login');
      }
    };

    validateUser();
  }, [pathname, router]);

  return <div></div>;
};

export default ValidateUser;
