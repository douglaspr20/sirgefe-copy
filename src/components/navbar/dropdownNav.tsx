import { Auth } from 'aws-amplify';
import { initialName } from 'utils/initialName';
import { useRouter } from 'next/router';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import posthog from 'posthog-js';
import Image from 'next/image';
import LogOutIcon from '@assets/icons/LogOutIcon';
import Link from 'next/link';
import { userDetailsStore } from '@utils/zustand';
import Tooltip from '@components/Tooltip';
import { useCookies } from 'react-cookie';

interface Props {
  className?: string;
}

const DropdownNav = ({ className }: Props) => {
  const router = useRouter();
  const [_, setCookie, removeCookie] = useCookies(['post_hog_user_id']);

  const { userProfile, selectedBusiness, setSelectedBusiness } =
    useBusinessProfileContext();

  const signOut = async () => {
    try {
      userDetailsStore.setState({ userDetails: undefined });
      setSelectedBusiness(null);
      await Auth.signOut();
      router.push('/login');
      posthog.reset();
      removeCookie('post_hog_user_id');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <div
      className={`dropdown flex items-center relative cursor-pointer ${className}`}
    >
      <Link
        href={
          router.pathname.includes('inactive-subscription')
            ? '#'
            : `/${selectedBusiness?.vanity_name}/settings/profile`
        }
        className="flex items-center"
      >
        <span className="text-sm text-darkGrade50 font-medium">
          {`${userProfile?.first_name} ${userProfile?.last_name}`}
        </span>

        {!userProfile?.profile_photo ? (
          <span className="bg-white ml-2 user-box-shadow text-violetColor border border-violetLightColor font-semibold text-sm uppercase inline-flex w-8 h-8 flex-shrink-0 rounded-full items-center justify-center">
            {initialName(
              `${userProfile?.first_name} ${userProfile?.last_name}`,
            )}
          </span>
        ) : (
          <Image
            src={userProfile?.profile_photo}
            width={32}
            height={32}
            alt="user-avatar"
            className="rounded-full ml-1"
          />
        )}
      </Link>

      <div className="inline-flex items-center dropdown-toggle">
        <button
          className="relative px-3.5 py-2 inline-flex items-center text-textSecondaryColor transition-all"
          id="logout"
          onClick={() => signOut()}
        >
          <Tooltip title={'Log Out'} anchorId={'logout'} />

          <div>
            <LogOutIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default DropdownNav;
