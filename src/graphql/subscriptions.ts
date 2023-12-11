/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onDataRefreshedForBusiness = /* GraphQL */ `subscription OnDataRefreshedForBusiness($data: String!) {
  onDataRefreshedForBusiness(data: $data) {
    data
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDataRefreshedForBusinessSubscriptionVariables,
  APITypes.OnDataRefreshedForBusinessSubscription
>;
