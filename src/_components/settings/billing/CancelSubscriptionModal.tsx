'use client';

import Spinner from '_components/Spinner';
import { cancelShopifySubscriptionNew } from '@graphql/mutations';
import { useBoundStore } from '@store/index';
import { useRouter } from 'next/navigation';
import { API } from 'aws-amplify';
import Image from 'next/image';
import React from 'react';
import * as Sentry from '@sentry/nextjs';
import fetchCurrentUserDetails from 'api/fetchCurrentUserDetails';
import { executeGraphqlOperation } from '_utils/executeGraphqlOperation';
import {
  CancelShopifySubscriptionMutationVariables,
  CancelShopifySubscriptionResponse,
} from 'API';

interface Props {
  dismissCancelSubscriptionModal?: React.MutableRefObject<HTMLButtonElement | null>;
}

const CancelSubscriptionModal = ({ dismissCancelSubscriptionModal }: Props) => {
  const { selectedBusiness, isLoading, setIsLoading, businessProfile } =
    useBoundStore();

  const router = useRouter();

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    debugger;

    try {
      const cancelShopifySubscriptionResponse = await executeGraphqlOperation<
        CancelShopifySubscriptionMutationVariables,
        CancelShopifySubscriptionResponse
      >(API, cancelShopifySubscriptionNew, {
        cancelShopifySubscriptionInput: {
          businessId: selectedBusiness?.id as string,
        },
      });

      debugger;

      if (cancelShopifySubscriptionResponse?.error) {
        const errorMessage =
          cancelShopifySubscriptionResponse?.error.message ||
          'unknown error cancelling subscription';

        Sentry.captureException(new Error(errorMessage));
        throw new Error(errorMessage);
      }

      await fetchCurrentUserDetails(
        businessProfile?.profilePrisma?.vanity_name,
      );

      dismissCancelSubscriptionModal?.current?.click();
      router.push('/inactive-subscription');
    } catch (error) {
      setIsLoading(false);
      dismissCancelSubscriptionModal?.current?.click();
      Sentry.captureException(error);
    }
  };

  return (
    <div className="modal-content px-4 pt-4 pb-5">
      <div className="modal-body">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div>
              <Image
                src="/images/billing.svg"
                alt=""
                height={116}
                width={116}
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-center mt-4">
                <Spinner />
                <p className="text-textSecondaryColor ml-2">
                  Cancelling your subscription...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div>
              <Image
                src="/images/billing.svg"
                alt=""
                height={116}
                width={116}
              />
            </div>

            <h2 className="h2 mb-5">Cancel your subscription</h2>

            <p className="text-textSecondaryColor mb-3 font-medium">
              Proceeding will cancel your subscription and you will no longer be
              able to use Sirge, until you subscribe again.
            </p>

            <div className="flex justify-center gap-4 mt-3">
              <button
                className="btn inline-flex items-center"
                onClick={() => {
                  dismissCancelSubscriptionModal?.current?.click();
                }}
              >
                Dismiss
              </button>
              <button
                className="btn red inline-flex items-center"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;
