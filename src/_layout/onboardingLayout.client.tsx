'use client';
import React, { FC, ReactNode, useMemo, Suspense } from 'react';
import Image from 'next/image';
import { BaseLayout } from './baseLayout.client';
import VideoComponent from '@components/VideoComponent';
import { useBoundStore } from '@store/index';

interface OnboardingLayoutProps {
  children: ReactNode;
}

const OnboardingLayout: FC<OnboardingLayoutProps> = ({ children }) => {
  const { currentStep } = useBoundStore((state) => state);

  const currentVideo = useMemo(() => {
    switch (currentStep) {
      case 'Shopify store':
        return {
          videoUrl:
            'https://sirge-dev.s3.us-west-2.amazonaws.com/videos/onboarding-step-1.mp4',
          subtitle: 'onboarding-step-1.txt',
        };

      case 'Integrations and ad accounts':
        return {
          videoUrl:
            'https://sirge-dev.s3.us-west-2.amazonaws.com/videos/onboarding-step-2.mp4',
          subtitle: 'onboarding-step-2.txt',
        };

      case 'Connect your existing ads':
        return {
          videoUrl:
            'https://sirge-dev.s3.us-west-2.amazonaws.com/videos/onboarding-step-3.mp4',
          subtitle: 'onboarding-step-3.txt',
        };

      default:
        return {
          videoUrl:
            'https://sirge-dev.s3.us-west-2.amazonaws.com/videos/onboarding-step-1.mp4',
          subtitle: 'onboarding-step-1.txt',
        };
    }
  }, [currentStep]);

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/2 h-screen flex items-center justify-center bg-gradient overflow-hidden z-0">
        <Image
          src="/images/sirge-icon.svg"
          alt="sirge icon"
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
        />

        <Suspense fallback={<div />}>
          <VideoComponent
            width={350}
            height={550}
            videoUrl={currentVideo.videoUrl}
            showSubtitles
            subtitleFileUrl={`/videos/${currentVideo.subtitle}`}
            showBg
          />
        </Suspense>
      </div>
      <BaseLayout cssClass="w-1/2">{children}</BaseLayout>
    </div>
  );
};

export default OnboardingLayout;
