'use client';

import { UserDetails } from '@interfaces/userDetails';
import { appUserDetailsStore } from '@utils/zustand';
import { useRef } from 'react';

interface Props {
  userDetails: UserDetails;
}

// initialize the user details store on the client side
export default function CreateUserStoreClientSide(props: Props) {
  const ref = useRef({
    initialize: false,
  });

  if (!ref.current.initialize) {
    appUserDetailsStore.setState({
      userDetails: props.userDetails,
    });
    ref.current.initialize = true;
  }

  return <></>;
}
