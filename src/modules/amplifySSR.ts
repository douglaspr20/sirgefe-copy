import { AmplifyClass } from '@aws-amplify/core';
import { withSSRContext } from 'aws-amplify';

type Context = {
  req?: any;
  modules?: any[];
};

const amplifySSR = (context: Context): AmplifyClass => {
  const { req } = context;

  /**
   * On the server side because of some glitch '@' is replaced by %40 so fixing that here.
   */
  const cookies = req?.headers?.cookie;

  if (cookies) {
    const cookieObj: any = {};

    cookies.split(';').forEach((cookie: any) => {
      let [key, value] = cookie.split('=');
      key = key.trim().replace(/%40/g, '@');
      value = value.trim();
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
