import ForgotPasswordApp from '@components/forgot/app/ForgotPasswordApp';
import { Metadata } from 'next';

async function ForgotPasswordPage() {
  return <ForgotPasswordApp />;
}

export const metadata: Metadata = {
  title: 'Sirge | Forgot Password',
};

export default ForgotPasswordPage;
