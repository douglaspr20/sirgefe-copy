'use client';

import { usePathname } from 'next/navigation';
import { User } from '@sirge-io/sirge-types';
import { useLayoutEffect } from 'react';
import { useIntercom } from 'react-use-intercom';
import { useBoundStore } from '@store/index';
import { UserPrisma } from 'API';

export const IntercomChat = () => {
  const pathname = usePathname();
  const { shutdown, boot } = useIntercom();
  const { userProfile } = useBoundStore.getState();

  useLayoutEffect(() => {
    if (['/login', '/selector'].includes(pathname as string)) shutdown();

    bootIntercom(userProfile ? userProfile : null);
  }, [boot, userProfile]);

  const bootIntercom = (userProfile?: UserPrisma | null) => {
    if (userProfile) {
      boot({
        name: `${userProfile.first_name} ${userProfile.last_name}`,
        email: userProfile.email,
        createdAt: userProfile.created_at,
        customAttributes: {
          posthog_url: `https://posthog.prod.sirge.com/person/${userProfile?.email}`,
        },
      });
    } else {
      boot();
    }
  };

  return <></>;
};
