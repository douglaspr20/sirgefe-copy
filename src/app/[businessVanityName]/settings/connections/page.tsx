import { Metadata } from 'next';
import TrackingSetup from '_components/quickSetup/TrackingSetup';
import TikTokConnection from '_components/settings/connections/TikTokConnection';
import { useBoundStore } from 'store';
import dynamic from 'next/dynamic';

const FacebookConnectionDynamic = dynamic(
  () => import('_components/settings/connections/FacebookConnection'),
  { ssr: false },
);

const GoogleConnectionDynamic = dynamic(
  () => import('_components/settings/connections/GoogleConnection'),
  { ssr: false },
);

export const metadata: Metadata = {
  title: 'Connections Settings',
  description: 'Manage your billing settings.',
};

const Page = async () => {
  const { selectedBusiness } = useBoundStore.getState();

  return (
    <div className="grow px-6 py-4">
      <h2 className="h4 mb-4 flex items-center">Connections</h2>
      <div className="max-w-2xl mx-auto">
        <div className="widget-container mb-8 p-4">
          <FacebookConnectionDynamic />
        </div>

        <div className="widget-container mb-8 p-4">
          <TikTokConnection />
        </div>

        {process.env.NEXT_PUBLIC_SHOW_GOOGLE_INTEGRATION === 'show' && (
          <div className="widget-container mb-8 p-4">
            <GoogleConnectionDynamic />
          </div>
        )}

        <div className="widget-container">
          <TrackingSetup
            isSettingsPage
            onboardingPath={`/${selectedBusiness?.vanity_name}/home`}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
