import { Metadata } from 'next';
import UsersWidget from '_components/settings/users/usersWidget';

export const metadata: Metadata = {
  title: 'Users Settings',
  description: 'Manage your user settings.',
};

const Page = async () => {
  return (
    <>
      <div className="grow px-6 py-4">
        <h2 className="h4 mb-4 flex  items-center">Users</h2>
        <div className="max-w-2xl mx-auto">
          <div className="widget-container p-4 mb-4">
            <h5 className="h5 mb-2">User Accounts</h5>
            <p className="mb-4 pb-4 border-b border-extraLightColor text-textSecondaryColor">
              Create a user account to give others access your business. Click
              any available user accounts below to manage permissions. For
              security, only one user account per device can access Sirge.
            </p>

            <UsersWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
