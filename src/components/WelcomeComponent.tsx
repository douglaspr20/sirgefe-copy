/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';
import VideoComponent from './VideoComponent';
import Link from 'next/link';
import OpenLink from '@assets/icons/OpenLink';
import { useRouter } from 'next/router';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import TailwindModal from './modals/TailwindModal';
import Calendly from './calendly';

const sohneBreit = localFont({
  src: [
    {
      path: '../fonts/TestSöhneBreit-Fett.otf',
      weight: '700', // Font weight: Bold (700)
    },
  ],
  variable: '--font-sohne-breit',
});

const WelcomeComponent = () => {
  const router = useRouter();
  const [firstLogin, setFirstLogin] = useState(false);

  const { userProfile, selectedBusiness } = useBusinessProfileContext();

  const [openCalendlyModal, setOpenCalendlyModal] =
    React.useState<boolean>(false);

  const [showWelcomeView, setShowWelcomeView] = useState(false);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboarding-completed');

    if (
      onboardingComplete === 'false' &&
      router.pathname === '/[businessVanityName]/home'
    ) {
      setFirstLogin(true);
    }
  }, [router.isReady, router.pathname]);

  const businessVanityName = selectedBusiness?.vanity_name as string;

  if (!firstLogin) return <></>;

  return (
    <>
      <div
        className={`w-full h-screen flex items-center justify-center bg-gradient overflow-hidden fixed duration-500 ease-in-out transition-opacity ${
          firstLogin ? 'opacity-100  z-20' : 'opacity-0'
        }`}
      >
        <Image src="/images/sirge-icon.svg" alt="hola" fill className="z-0" />

        <div className={`flex flex-col justify-center `}>
          <div
            className={`mt-3 flex flex-col text-center max-w-[750px] ease-in-out transition-opacity duration-400  ${
              !showWelcomeView ? 'opactity-100 z-10' : 'opacity-0'
            }`}
          >
            <VideoComponent
              videoUrl="https://sirge-dev.s3.us-west-2.amazonaws.com/videos/welcome.mp4"
              stopVideo={showWelcomeView}
            />
            <span className={`text-black text-2xl ${sohneBreit.className}`}>
              Welcome, {userProfile?.first_name}! We're pulling in your data now
            </span>

            <span className="text-darkGrade100 text-center max-w-[750px] mt-3">
              As part of the setup process, Sirge will be pulling in your
              information from across your store and ad platforms. Please give
              us 24 hours to fully aggregate and compile all of your data. You
              can get started on the platform right away - just be advised the
              information you see might not be completely accurate until we've
              been able to pull in everything.
            </span>

            <div className="flex justify-center mt-5">
              <Link
                href="https://help.sirge.io/"
                target="_blank"
                className="flex text-darkGrade75 font-medium mr-5"
              >
                <span className="mr-2">Sirge Help Center</span>{' '}
                <OpenLink width={22} height={22} fill="#525D67" />
              </Link>

              <Link
                href="https://www.youtube.com/@sirge1912"
                target="_blank"
                className="flex text-darkGrade75 font-medium mr-5"
              >
                <span className="mr-2"> Sirge YouTube channel</span>{' '}
                <OpenLink width={22} height={22} fill="#525D67" />
              </Link>

              <Link
                href="https://www.instagram.com/sirge.official/"
                target="_blank"
                className="flex text-darkGrade75 font-medium"
              >
                <span className="mr-2"> Instagram</span>{' '}
                <OpenLink width={22} height={22} fill="#525D67" />
              </Link>
            </div>

            <div className="flex items-center justify-around">
              <button
                className={`flex items-center justify-center bg-black font-semibold text-white rounded-full py-5 w-[160px]  mt-5`}
                onClick={() => setOpenCalendlyModal(true)}
                data-bs-toggle="modal"
                data-bs-target="#calendlyModal"
              >
                Book onboarding
              </button>

              <button
                className={`flex items-center justify-center bg-black font-semibold text-white rounded-full py-5 w-[160px]   mt-5`}
                onClick={() => {
                  setShowWelcomeView(true);
                }}
              >
                Got it
                <i className="icon-chevron-right text-xl" />
              </button>
            </div>
          </div>

          <div
            className={`flex flex-col ease-in-out transition-opacity delay-500 duration-400 absolute ${
              showWelcomeView ? 'opactity-100 z-10' : 'opacity-0'
            }`}
          >
            <span
              className={`text-black text-[132px] leading-[160px] ${sohneBreit.className}`}
            >
              WELCOME
            </span>

            <span
              className={`text-darkGrade100 text-center max-w-[750px] text-[27px]`}
            >
              let’s multiply your profit to 10x
            </span>

            <button
              className={`flex items-center justify-center bg-black font-semibold text-white rounded-full py-5 px-10 w-[160px] ml-auto mr-auto mt-5`}
              onClick={() => {
                localStorage.setItem('onboarding-completed', 'true');
                router.push(`/${businessVanityName}/home`);
              }}
            >
              LET’S GO
            </button>
          </div>
        </div>
      </div>

      <TailwindModal
        handleCloseUpdate={() => setOpenCalendlyModal(false)}
        showDialog={openCalendlyModal}
        id="calendlyModal"
        styleDialog={{
          maxWidth: '1024px',
          flexDirection: 'row',
        }}
      >
        <Calendly isOnboardingPage />
      </TailwindModal>
    </>
  );
};

export default WelcomeComponent;
