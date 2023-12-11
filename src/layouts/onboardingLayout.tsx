import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import { BaseLayout } from './baseLayout';
import VideoComponent from '@components/VideoComponent';
import { useQuickSetupContext } from '@providers/quickSetupProvider';

interface OnboardingLayoutProps {
  children: ReactNode;
}

const OnboardingLayout: FC<OnboardingLayoutProps> = ({ children }) => {
  const { currentVideo } = useQuickSetupContext();

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/2 h-screen flex items-center justify-center bg-gradient overflow-hidden z-0">
        <Image
          src="/images/sirge-icon.svg"
          alt="sirge icon"
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
        />

        <VideoComponent
          width={350}
          height={550}
          videoUrl={currentVideo.videoUrl}
          showSubtitles
          subtitleFileUrl={`/videos/${currentVideo.subtitle}`}
          showBg
        />
      </div>
      <BaseLayout cssClass="w-1/2">{children}</BaseLayout>
    </div>
  );
};

export default OnboardingLayout;
