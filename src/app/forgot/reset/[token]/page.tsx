import { Metadata } from 'next';
import { headers } from 'next/headers';
import { graphqlOperation } from 'aws-amplify';
import ResetPasswordApp from '@components/forgot/reset/app/ResetApp';
import amplifySSR from '_auth/amplifySSR.server';
import { verifyTwoFactor } from '@graphql/mutations';

export const metadata: Metadata = {
  title: 'Sirge | Reset Your Password',
};

const verifyToken = async (token: string) => {
  try {
    const cookies = headers().get('cookie');

    const SSR = amplifySSR(cookies as string);

    const response: any = await SSR.API.graphql({
      ...graphqlOperation(verifyTwoFactor, {
        verifyTwoFactorInput: {
          two_factor_id: token,
          email_confirm: false,
        },
      }),
      authMode: 'API_KEY',
    });

    if (response.data?.verifyTwoFactor?.error?.message) {
      return {
        isValid: false,
      };
    }

    return {
      isValid: true,
    };
  } catch (error) {
    return {
      isValid: false,
    };
  }
};

async function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { isValid } = await verifyToken(params.token);
  return <ResetPasswordApp isValid={isValid} />;
}

export default ResetPasswordPage;
