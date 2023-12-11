'use client';

import { appUserDetailsStore } from '@utils/zustand';
import { useEffect } from 'react';

export default function UserDetailsClient() {
  const user = appUserDetailsStore.getState().userDetails;

  useEffect(() => {
    console.log(123, user, 67);
  }, []);

  return <div>{JSON.stringify(user)}</div>;
}
