'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  label: string;
  icon: string;
};

const SettingsLink = ({ href, label, icon }: Props) => {
  const pathname = usePathname();

  const isActive =
    pathname?.includes(label.toLowerCase().replace(/\s+/g, '-')) || false;

  return (
    <Link
      href={href}
      className={`w-full rounded-lg py-2 px-3 inline-flex items-center text-textSecondaryColor transition-all ${
        isActive && 'bg-darkGrade25'
      }`}
    >
      <i
        className={`${icon} text-xl mr-2 leading-5 ${
          isActive ? 'text-darkGrade75' : 'text-darkGrade50'
        }`}
      ></i>
      {label}
    </Link>
  );
};

export default SettingsLink;
