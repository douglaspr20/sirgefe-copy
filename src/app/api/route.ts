import awsConfig from '@graphql/aws-config';
import fetchCurrentUserDetails from 'api/fetchCurrentUserDetails';
import amplifySSR from '_auth/amplifySSR.server';
import { Amplify } from 'aws-amplify';
import { NextRequest, NextResponse } from 'next/server';

Amplify.configure({
  ...awsConfig,
  ssr: true,
});

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie');

  const { searchParams } = new URL(request.url);

  const businessVanityName = searchParams.get('businessVanityName');

  const amplify = amplifySSR(cookie as string);

  const userDetails = await fetchCurrentUserDetails(
    amplify,
    businessVanityName as string,
    cookie as string,
  );

  return NextResponse.json(userDetails, {
    status: 200,
  });
}
