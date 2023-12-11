import { Metadata } from 'next';
import UpdateBusinessForm from '_components/settings/my-store/updateBusinessForm';

export const metadata: Metadata = {
  title: 'Store Settings',
  description: 'Manage your billing settings.',
};

const Page = async () => {
  return (
    <div className="grow px-6 py-4">
      <h2 className="h4 mb-4 flex items-center">My Store</h2>
      <div className="max-w-2xl mx-auto">
        <UpdateBusinessForm />
      </div>
    </div>
  );
};

export default Page;
