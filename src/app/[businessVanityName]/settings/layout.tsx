import SettingsLink from '_components/settings/SettingsLink';
import { useBoundStore } from 'store';
import { withAuth } from '_auth/withAuth.server';

type LayoutProps = {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: LayoutProps) => {
  const { businessProfile } = useBoundStore.getState();

  const businessVanityName = businessProfile?.profilePrisma?.vanity_name;

  const links = [
    {
      href: `/${businessVanityName}/settings/profile`,
      label: 'Profile',
      icon: 'icon-person',
    },
    {
      href: `/${businessVanityName}/settings/connections`,
      label: 'Connections',
      icon: 'icon-integration',
    },
    {
      href: `/${businessVanityName}/settings/my-store`,
      label: 'My Store',
      icon: 'icon-building-retai-more',
    },
    {
      href: `/${businessVanityName}/settings/users`,
      label: 'Users',
      icon: 'icon-people-settings',
    },
    {
      href: `/${businessVanityName}/settings/billing`,
      label: 'Billing',
      icon: 'icon-wallet',
    },
  ];

  return (
    <div className="flex flex-row">
      <div className="flex flex-col px-8 min-w-[225px] w-100 border-right-darkgrey h-screen">
        <h2 className="h3 mb-4 ml-2 mt-[30px]">Settings</h2>

        <ul>
          {links.map(({ href, label, icon }, i) => (
            <li key={i}>
              <SettingsLink href={href} label={label} icon={icon} />
            </li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
};

export default withAuth(SettingsLayout);
