import { APIClass, graphqlOperation } from 'aws-amplify';
import { Observable } from 'zen-observable-ts';

/**
 * Check if an object is an Observable.
 * @param obj - The object to check.
 * @returns True if the object is an Observable, false otherwise.
 */
const isObservable = (obj: any): obj is Observable<any> => {
  return obj && typeof obj.subscribe === 'function';
};

// [NOTE] Does this stream updates from within this file? Or should this be moved to the calling method?
const handleObservable = <R>(observable: Observable<any>): Promise<R> => {
  return new Promise<R>((resolve, reject) => {
    observable.subscribe({
      next: (result) => resolve(result as R),
      error: (err) => reject(err),
    });
  });
};

/**
 * Executes a GraphQL operation using the specified API instance, operation, and input.
 *
 * @param {APIClass} apiInstance - The API instance to execute the operation with. Can be API or SSR.Api.
 * @param {unknown} operation - The GraphQL operation to execute.
 * @param {NonNullable<I> | Record<string, never>} input - The input for the operation.
 * @return {Promise<R>} The result of the GraphQL operation.
 */
export const executeGraphqlOperation = async <I, R>(
  apiInstance: APIClass,
  operation: unknown,
  input: NonNullable<I> | Record<string, never>,
): Promise<R> => {
  try {
    const response = await apiInstance.graphql(
      graphqlOperation(operation, input),
    );

    // Check if the response is an observable
    if (isObservable(response)) {
      return handleObservable(response);
    }

    // Assuming the response is a standard GraphQL response with a 'data' property
    if ('data' in response) {
      return response.data as R;
    }

    throw new Error('Unexpected response type from GraphQL operation');
  } catch (error) {
    throw error;
  }
};
