'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';

type Props = {
  isOnboardingPage: boolean;
  setOpenCalendlyModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Calendly: React.FunctionComponent<Props> = ({
  isOnboardingPage,
  setOpenCalendlyModal,
}) => {
  const router = useRouter();
  const [showCloseButton, setShowCloseButton] = React.useState<boolean>(false);

  useCalendlyEventListener({
    onEventScheduled: () => setShowCloseButton(true),
  });

  return (
    <div className="App">
      <InlineWidget
        url="https://calendly.com/sirge-demo/sirge-support"
        styles={{
          height: 700,
        }}
      />

      {showCloseButton && (
        <div className="text-center mt-3 mb-6">
          {!isOnboardingPage ? (
            <button
              className="btn"
              data-bs-dismiss="modal"
              aria-label="Close"
              data-bs-target={`#calendlyModal`}
              onClick={() => {
                if (setOpenCalendlyModal) setOpenCalendlyModal(false);
              }}
            >
              Close
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                router.push('/selector');
              }}
            >
              Go to platform
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendly;
