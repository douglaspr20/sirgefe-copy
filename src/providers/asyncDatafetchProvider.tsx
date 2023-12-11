'use client';
import AsyncDataFetchLoader from '@components/AsyncDataFetchLoader';
import * as Sentry from '@sentry/nextjs';
import { triggerBusinessDataLongFetchNew } from '@graphql/mutations';
import { onDataRefreshedForBusiness } from '@graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useBusinessProfileContext } from './businessProfileProvider';
import dayjs from 'dayjs';
import { Business } from '@sirge-io/sirge-types';

type AsyncDataFetchContextType = {
  fetchComplete: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  triggerFetch: (
    businessId: string,
    refreshAferFetch?: boolean,
  ) => Promise<void>;
  addListener: () => void;
  removeListener: () => void;
};

const AsyncDataFetchContext = createContext({} as AsyncDataFetchContextType);

export const useAsyncDataFetchContext = () => useContext(AsyncDataFetchContext);

type AsyncDataFetchProviderProps = {
  children: ReactNode;
};

export const AsyncDataFetchProvider = ({
  children,
}: AsyncDataFetchProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [listenerCount, setListenerCount] = useState(0);

  const [subscriptionHandler, setSubscriptionHandler] = useState<any>();

  const { selectedBusiness, updateBusinessAdAccount } =
    useBusinessProfileContext();

  const businessRef = useRef<Business | null>(null);

  useEffect(() => {
    businessRef.current = selectedBusiness;
  }, [selectedBusiness]);

  const triggerFetch = async (businessId: string, refreshAferFetch = true) => {
    try {
      if (subscriptionHandler) {
        subscriptionHandler.unsubscribe();
        console.log('unsubscribed');
      }

      setLoading(true);
      setDisplayLoader(true);
      setFetchComplete(false);

      const subscription = API.graphql(
        graphqlOperation(onDataRefreshedForBusiness, {
          data: businessId,
        }),
      ) as any;

      if (selectedBusiness && !refreshAferFetch) {
        updateBusinessAdAccount(businessId as string, {
          last_data_refreshed: dayjs().format(),
        });
      }

      const handler = subscription.subscribe({
        next: async () => {
          console.log('Lambda job complete. ', refreshAferFetch);
          if (selectedBusiness && refreshAferFetch) {
            updateBusinessAdAccount(businessId as string, {
              last_data_refreshed: dayjs().format(),
            });
          }

          if (refreshAferFetch) setFetchComplete(true);

          if (listenerCount <= 0) {
            setLoading(false);
            setDisplayLoader(false);
          }
        },
        error: (error: any) => console.log('Error: ', error),
      });

      setSubscriptionHandler(handler);

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
  };

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoading(false);
        setDisplayLoader(false);
      }, 500);
    }

    /**
     * Timout after 10s and stop displaying the loader
     */
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        setDisplayLoader(false);
      }, 10000);
    }
  }, [loading]);

  useEffect(() => {
    return () => {
      if (subscriptionHandler) subscriptionHandler.unsubscribe();
    };
  }, []);

  function addListener() {
    setListenerCount((count) => count + 1);
  }

  function removeListener() {
    setListenerCount((count) => count - 1);
    if (listenerCount === 1) {
      setLoading(false);
    }
  }

  return (
    <AsyncDataFetchContext.Provider
      value={{
        triggerFetch,
        fetchComplete,
        addListener,
        removeListener,
        setLoading,
      }}
    >
      {children}
      {<AsyncDataFetchLoader loading={loading} displayLoader={displayLoader} />}
    </AsyncDataFetchContext.Provider>
  );
};
