import DisconnectClip from '@assets/icons/DisconnectClip';
import Spinner from '@components/Spinner';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

type Props = {
  google_ad_accessToken: boolean;
  loading: boolean;
  handleLogin: (data: any) => void;
};

const GoogleLoginButton: React.FunctionComponent<Props> = ({
  handleLogin,
  google_ad_accessToken,
  loading,
}) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => handleLogin(tokenResponse),
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/adwords',
  });

  return (
    <>
      {google_ad_accessToken ? (
        <button
          className="link inline-flex items-center font-medium"
          data-bs-toggle="modal"
          data-bs-target="#disconnectGoogleModal"
        >
          <DisconnectClip />
          Disconnect
        </button>
      ) : (
        <>
          <button
            className="inline-flex items-center font-semibold text-textSecondaryColor shadow-md p-2 rounded"
            onClick={() => login()}
            disabled={loading}
          >
            {!loading ? (
              <>
                <Image
                  src="/images/google.svg"
                  width={27}
                  height={27}
                  alt="google"
                />
                <span className="ml-4">Sign in with Google</span>
              </>
            ) : (
              <Spinner />
            )}
          </button>
        </>
      )}
    </>
  );
};

export default GoogleLoginButton;
