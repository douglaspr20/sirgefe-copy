import { useBoundStore } from '@store/index';
import { Metadata } from 'next';
import TailwindModal from '_components/modals/TailwindModal';
import PromoCodeApplied from '_components/modals/tailwindTypes/PromoCodeApplied';
import CancelSubscriptionModal from '_components/settings/billing/CancelSubscriptionModal';
import DiscountCode from '_components/settings/billing/DiscountCode';
import { EarlyAdopter } from '_components/settings/billing/EarlyAdopter';
import PlanDetailContainer from '_components/settings/billing/PlanDetailContainer';
import PlanTiersModal from '_components/settings/billing/PlanTiersModal';

export const metadata: Metadata = {
  title: 'Billing Settings',
  description: 'Manage your billing settings.',
};

const Page = async () => {
  const { businessProfile, dialogOptions } = useBoundStore.getState();

  return businessProfile?.profilePrisma?.subscriptions[0]
    .subscription_plan_code === 'earlyadopter' ||
    process.env.NEXT_PUBLIC_METERED_BILLING_STATUS !== 'active' ? (
    <EarlyAdopter />
  ) : (
    <>
      <div className="grow px-6 py-4">
        <h2 className="h4 mb-4 flex items-center">Billing</h2>
        <div className="max-w-2xl mx-auto">
          <div className="widget-container mb-8 p-4">
            <PlanDetailContainer />
          </div>
          <div className="widget-container mb-8 p-4">
            <DiscountCode />
          </div>
        </div>
        <div className="w-full flex justify-center items-center my-8">
          <button
            className="inline-flex items-center justify-center text-white rounded-lg bg-warningColor px-3 py-3 leading-4 font-semibold transition-all hover:bg-warningHoverColor"
            data-bs-toggle="modal"
            data-bs-target="#cancelSubscriptionModal"
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      <TailwindModal
        id="cancelSubscriptionModal"
        styleDialog={{ maxWidth: '650px' }}
      >
        <CancelSubscriptionModal />
      </TailwindModal>

      <TailwindModal id="exploreTiers" styleDialog={{ maxWidth: '650px' }}>
        <PlanTiersModal />
      </TailwindModal>

      <TailwindModal id="promoCode">
        <PromoCodeApplied
          title={dialogOptions?.message || ''}
          type={dialogOptions?.type || 'success'}
          description={dialogOptions?.messageTwo || ''}
          id="promoCode"
        />
      </TailwindModal>
    </>
  );
};

export default Page;
