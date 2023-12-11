import dayjs from 'dayjs';
import { useBoundStore } from 'store';
import PlanDetailsActive from './PlanDetailsActive';
import PlanDetailsTrial from './PlanDetailsTrial';

const PlanDetailContainer = () => {
  const { isTrial, setIsTrial, userProfile, selectedBusiness } =
    useBoundStore.getState();

  const subscription = selectedBusiness?.subscriptions[0];

  // Return early if userProfile is null or undefined
  if (!userProfile || !subscription) {
    setIsTrial(false); // Set a default state for isTrial
    return <div>Loading user profile...</div>; // Provide a loading state or other appropriate fallback
  }

  // Make sure trial_end is a number before passing to dayjs.unix()
  const trialEnd = subscription.trial_end
    ? dayjs.unix(Number(subscription.trial_end))
    : null;
  const today = dayjs();

  // Only call setIsTrial if trialEnd is a valid date
  if (trialEnd) {
    setIsTrial(trialEnd.isAfter(today));
  } else {
    // Handle the case where trialEnd is not available
    setIsTrial(false);
  }

  return isTrial ? <PlanDetailsTrial /> : <PlanDetailsActive />;
};

export default PlanDetailContainer;
