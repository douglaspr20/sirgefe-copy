'use client';
import NextNProgress from 'nextjs-progressbar';

interface Props {
  children: React.ReactNode;
}

const NextNProgressBarProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <NextNProgress options={{ showSpinner: false }} color={'#32C4D4'} />
    </>
  );
};

export default NextNProgressBarProvider;
