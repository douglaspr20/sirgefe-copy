import { API, graphqlOperation } from 'aws-amplify';
import { getUserFacebookAccount } from '@graphql/queries';

export const getAccountInfo = async (facebook_accessToken: string) => {
  const fbAccountResponse: any = await API.graphql(
    graphqlOperation(getUserFacebookAccount, {
      getUserFacebookAccountInput: {
        facebook_accessToken: facebook_accessToken,
      },
    }),
  );

  const fbAccountData = fbAccountResponse.data.getUserFacebookAccount;

  if (fbAccountData.error) {
    return '';
  }

  return fbAccountData.data.name;
};
