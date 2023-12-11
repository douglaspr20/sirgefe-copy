import React, { FC, useState } from 'react';
import Image from 'next/image';
import Spinner from '@components/Spinner';
import * as Sentry from '@sentry/nextjs';
interface Props {
  handler: () => Promise<void>;
  type: 'facebook' | 'tik_tok' | 'google';
  connectionStatus: boolean;
}

const DisconnectIntegration: FC<Props> = ({
  handler,
  type,
  connectionStatus,
}) => {
  const [loading, setLoading] = useState(false);

  const integrationName =
    type === 'facebook' ? 'Facebook' : type === 'tik_tok' ? 'TikTok' : 'Google';

  const onDisconnect = async () => {
    try {
      setLoading(true);
      await handler();
    } catch (error) {
      Sentry.captureException(new Error(error as any));
    } finally {
      setLoading(false);
    }
  };

  if (!connectionStatus) {
    return (
      <div className="px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-1 capitalize">
            <Image
              src="/images/success-icon.svg"
              width="28"
              height="28"
              alt=""
            />
          </div>
          <h4>{integrationName} Account Disconnected</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-5 pb-4">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="mb-1">
          <Image src="/images/warning-icon.svg" width="28" height="25" alt="" />
        </div>
        <h4>Disconnect {integrationName} Account</h4>
        <p className="text-textSecondaryColor">
          If You Disconnect This Account, Tracking Will Stop.
        </p>
        <div className="mt-4 flex items-center justify-center">
          {loading ? (
            /**
             * TODO: Replace with LoadingButton from Will's PR
             */
            <Spinner />
          ) : (
            <button
              type="button"
              className="btn ml-3 min-w-[120px] !bg-primaryColor "
              onClick={onDisconnect}
            >
              Disconnect
            </button>
          )}
          <button
            type="button"
            className="btn light ml-3 min-w-[120px]"
            data-bs-dismiss="modal"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisconnectIntegration;
