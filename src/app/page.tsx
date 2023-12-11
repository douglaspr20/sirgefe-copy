import { redirect } from 'next/navigation';
import { getVanityNameFromCookie } from './action';

const Page = async () => {
  const vanityName = await getVanityNameFromCookie();

  redirect(vanityName ? `/${vanityName}/home` : '/login');
  return <></>;
};
export default Page;
