import Image from 'next/image';
import DropdownNav from '@components/navbar/dropdownNav';
import Link from 'next/link';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import BusinessDropdownNav from '@components/navbar/businessDropdownNav';
import { useRouter } from 'next/router';

export const AuthenticatedHeader = () => {
  const router = useRouter();

  const { selectedBusiness } = useBusinessProfileContext();
  return (
    <div className="top-panel flex justify-between items-center px-8 py-3 z-10">
      <div className="flex flex-row justify-center items-center gap-2">
        <Link href={`/${selectedBusiness?.vanity_name}/home`}>
          <Image
            src="/images/logo-full.svg"
            width={114}
            height={46}
            alt="sirge logos"
          />
        </Link>
        {router.pathname === '/inactive-subscription' ? (
          <BusinessDropdownNav />
        ) : (
          <></>
        )}
      </div>

      <DropdownNav />
    </div>
  );
};
