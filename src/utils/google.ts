export const getGoogleAccountInfo = async (google_accessToken: string) => {
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v1/userinfo',
    {
      headers: {
        Authorization: `Bearer ${google_accessToken}`,
      },
    },
  );
  const data = await response.json();
  return data;
};
