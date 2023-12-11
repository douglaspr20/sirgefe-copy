import { StateCreator } from 'zustand';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';
import { API, graphqlOperation } from 'aws-amplify';
import { onDataRefreshedForBusiness } from '@graphql/subscriptions';
import { BusinessProfileSlice } from './businessProfileSlice';
import { triggerBusinessDataLongFetchNew } from '@graphql/mutations';

export interface AsyncDataFetchSlice {
  fetchComplete: boolean;
  setFetchComplete: (fetchComplete: boolean) => void;
  asyncFetchLoading: boolean;
  setAsyncFetchLoading: (asyncFetchLoading: boolean) => void;
  displayLoader: boolean;
  setDisplayLoader: (displayLoader: boolean) => void;
  subscriptionHandler: any;
  setSubscriptionHandler: (subscriptionHandler: any) => void;
  listenerCount: number;
  triggerFetch: (
    businessId: string,
    refreshAferFetch?: boolean,
  ) => Promise<void>;
  addListener: () => void;
  removeListener: () => void;
}

export const createAsyncDataFetchSlice: StateCreator<
  AsyncDataFetchSlice & Partial<BusinessProfileSlice>,
  [],
  []
> = (set, get) => ({
  fetchComplete: false,
  setFetchComplete: (fetchComplete) =>
    set((state) => ({ ...state, fetchComplete })),
  asyncFetchLoading: false,
  setAsyncFetchLoading: (asyncFetchLoading) =>
    set((state) => ({ ...state, asyncFetchLoading })),
  displayLoader: false,
  setDisplayLoader: (displayLoader) =>
    set((state) => ({ ...state, displayLoader })),
  subscriptionHandler: undefined,
  setSubscriptionHandler: (subscriptionHandler) =>
    set((state) => ({ ...state, subscriptionHandler })),
  listenerCount: 0,
  triggerFetch: async (businessId: string, refreshAferFetch = true) => {
    try {
      const subscriptionHandler = get().subscriptionHandler;
      if (subscriptionHandler) {
        subscriptionHandler.unsubscribe();
        console.log('unsubscribed');
      }
      set((state) => ({ ...state, asyncFetchLoading: true }));
      set((state) => ({ ...state, displayLoader: true }));
      set((state) => ({ ...state, fetchComplete: false }));

      const subscription = API.graphql(
        graphqlOperation(onDataRefreshedForBusiness, {
          data: businessId,
        }),
      ) as any;

      const selectedBusiness = get().selectedBusiness;

      if (selectedBusiness && !refreshAferFetch) {
        set((state) => ({
          ...state,
          businessList: state?.businessList?.map((business) =>
            business.id === selectedBusiness?.id
              ? {
                  ...business,
                  last_data_refreshed: dayjs().format(),
                }
              : business,
          ),
        }));
      }

      const handler = subscription.subscribe({
        next: async () => {
          console.log('Lambda job complete. ', refreshAferFetch);
          if (selectedBusiness && refreshAferFetch) {
            set((state) => ({
              ...state,
              businessList: state?.businessList?.map((business) =>
                business.id === selectedBusiness?.id
                  ? {
                      ...business,
                      last_data_refreshed: dayjs().format(),
                    }
                  : business,
              ),
            }));
          }
          if (refreshAferFetch)
            set((state) => ({ ...state, fetchComplete: true }));
          if (get().listenerCount <= 0) {
            set((state) => ({
              ...state,
              asyncFetchLoading: false,
              displayLoader: false,
            }));
          }
        },
        error: (error: any) => console.log('Error: ', error),
      });

      set((state) => ({ ...state, subscriptionHandler: handler }));
      await API.graphql({
        ...graphqlOperation(triggerBusinessDataLongFetchNew, {
          triggerBusinessDataLongFetchInput: {
            business_id: businessId,
          },
        }),
      });
    } catch (error) {
      Sentry.captureException(error);
    }
  },
  addListener: () =>
    set((state) => ({ ...state, listenerCount: state.listenerCount + 1 })),
  removeListener: () => {
    set((state) => ({ ...state, listenerCount: state.listenerCount - 1 }));
    if (get().listenerCount === 1) {
      set((state) => ({
        ...state,
        asyncFetchLoading: false,
      }));
    }
  },
});
