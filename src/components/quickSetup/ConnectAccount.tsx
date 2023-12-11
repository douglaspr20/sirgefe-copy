import ConnectClip from '@assets/icons/ConnectClip';
import SocialButton from '@components/Integrations/SocialButton';
import Image from 'next/image';
import { AccountType } from './IntegrationsAndAdAccounts';

type Props = {
  title: string;
  icon: string;
  handleConnect: (facebookResponse?: any) => void | Promise<void>;
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccountType>>;
};

const ConnectAccount: React.FunctionComponent<Props> = ({
  handleConnect,
  title,
  icon,
  setSelectedAccount,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-10">
        <Image
          src={`/images/${icon}`}
          width={33}
          height={33}
          alt="fb"
          className="mb-5"
        />

        <div className="mb-4">
          <h3>Connect your {title} account</h3>
        </div>

        {title === 'Facebook' ? (
          <SocialButton
            className="btn flex py-2"
            provider="facebook"
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
            onLoginSuccess={handleConnect}
            onLoginFailure={(error) => console.log(error)}
            autoLoad={false}
            fields="name"
            scope="public_profile,ads_read,ads_management"
          >
            <ConnectClip fill="#fff" width={20} height={20} />

            <span className="ml-1">Connect</span>
          </SocialButton>
        ) : title === 'Google' ? (
          <button
            className="inline-flex items-center font-semibold text-textSecondaryColor shadow-md p-2 rounded"
            onClick={() => handleConnect()}
          >
            <>
              <Image
                src="/images/google.svg"
                width={27}
                height={27}
                alt="google"
              />
              <span className="ml-4">Sign in with Google</span>
            </>
          </button>
        ) : (
          <button className="btn flex py-2" onClick={() => handleConnect()}>
            <ConnectClip fill="#fff" width={20} height={20} />

            <span className="ml-1">Connect</span>
          </button>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button className="btn light" onClick={() => setSelectedAccount(false)}>
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default ConnectAccount;
