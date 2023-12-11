import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { useRouter } from 'next/router';
import { User } from '@sirge-io/sirge-types';
import { useEffect, useLayoutEffect } from 'react';
import { useIntercom } from 'react-use-intercom';

export const IntercomChat = () => {
  const router = useRouter();
  const { shutdown, boot } = useIntercom();
  const { userProfile } = useBusinessProfileContext();

  useLayoutEffect(() => {
    if (['/login'].includes(router.pathname)) shutdown();

    bootIntercom(userProfile ?? null);
  }, [boot, userProfile]);

  const bootIntercom = (userProfile?: User | null) => {
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
