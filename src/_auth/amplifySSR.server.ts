import { AmplifyClass } from '@aws-amplify/core';
import { withSSRContext } from 'aws-amplify';

const amplifySSR = (cookies: string): AmplifyClass => {
  const req = {
    headers: {
      cookie: '',
    },
  };

  if (cookies) {
    const cookieObj: any = {};

    cookies.split(';').forEach((cookie: any) => {
      let [key, value] = cookie.split('=');
      key = key.trim().replace(/%40/g, '@');
      value = value?.trim();
      cookieObj[key] = value;
    });

    const cookieString = Object.entries(cookieObj)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');

    req.headers.cookie = cookieString;
  }

  return withSSRContext({ req });
};

export default amplifySSR;
