import Image from 'next/image';
import DropdownNav from '_layout/dropdownNav.client';
import Link from 'next/link';

export const AuthenticatedHeader = () => {
  return (
    <div className="top-panel flex justify-between items-center px-8 py-3 z-10">
      <Link href="/selector">
        <Image
          src="/images/logo-full.svg"
          width={114}
          height={46}
          alt="sirge logos"
        />
      </Link>

      <DropdownNav />
    </div>
  );
};
