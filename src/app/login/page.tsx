import LoginApp from '_components/login/app/LoginApp';
import { Metadata } from 'next';

async function LoginPage() {
  return <LoginApp />;
}

export const metadata: Metadata = {
  title: 'Sirge | Login',
};

export default LoginPage;
