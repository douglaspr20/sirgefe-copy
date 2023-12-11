import Spinner from '@components/Spinner';
import Image from 'next/image';
import React from 'react';

interface Props {
  loading: boolean;
  handleCancelSubscription: () => void;
  dismissCancelSubscriptionModal: React.MutableRefObject<HTMLButtonElement | null>;
}

const CancelSubscriptionModal = ({
  loading,
  handleCancelSubscription,
  dismissCancelSubscriptionModal,
}: Props) => {
  return (
    <div className="modal-content px-4 pt-4 pb-5">
      <div className="modal-body">
        {loading ? (
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
