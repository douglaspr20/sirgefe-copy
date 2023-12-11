'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// maybe we can use this to revalidate user when selecting a business
export default async function action() {
  revalidateTag('user');
}

export async function saveBusinessVanityNameInCookie(vanityName: string) {
  cookies().set('vanityName', vanityName);
}

export async function getVanityNameFromCookie() {
  const cookieStore = cookies();

  const vanityName = cookieStore.get('vanityName');

  return vanityName ? vanityName.value : null;
}

export async function deleteVanityNameFromCookie() {
  cookies().delete('vanityName');
}
