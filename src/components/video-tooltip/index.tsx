import * as HoverCard from '@radix-ui/react-hover-card';
import Image from 'next/image';
import toolTipIcon from '@images/tooltip.svg';
import { RefObject, useRef } from 'react';

type Props = {
  title: string;
  content?: string;
  children?: any;
  isBreakRoas?: boolean;
};

const TooltipVideo: React.FunctionComponent<Props> = ({
  children,
  title,
  content,
  isBreakRoas = false,
}) => {
  const videoRef: RefObject<HTMLVideoElement> = useRef(null);

  const handleLoadedData = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleLeavePiP = () => {
        videoElement.pause();
      };

      videoElement.onleavepictureinpicture = handleLeavePiP;
    }
  };

  return (
    <>
      <HoverCard.Root>
        {!isBreakRoas ? (
          <>
            <div>{children}</div>
            <HoverCard.Trigger asChild>
              <div className="flex items-center">
                <Image
                  src={toolTipIcon}
                  alt="tooltip-info"
                  width={13}
                  height={13}
                  className=" cursor-pointer"
                />
              </div>
            </HoverCard.Trigger>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <div className="text-darkGrade100 font-semibold">
                Break-Even ROAS Goals
              </div>

              <span className="ml-1 cursor-pointer">
                <HoverCard.Trigger asChild>
                  <Image
                    src={toolTipIcon}
                    alt="tooltip-info"
                    width={13}
                    height={13}
                  />
                </HoverCard.Trigger>
              </span>
            </div>
            <button
              data-bs-toggle="modal"
              data-bs-target="#roasGoalModal"
              className="text-xl text-darkGrade50 hover:text-darkGrade75"
            >
              <i className="icon-settings-line"></i>
            </button>
          </>
        )}
        <HoverCard.Portal>
          <HoverCard.Content
            className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[350px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
            sideOffset={5}
          >
            <div className="flex flex-col gap-[7px]">
              <video
                className="w-[350px] h-[270px]"
                controls
                controlsList="nodownload"
                ref={videoRef}
                onLoadedData={handleLoadedData}
                disablePictureInPicture
                src="https://sirge-dev.s3.us-west-2.amazonaws.com/videos/ROAS.mp4"
              ></video>

              <div className="text-center mt-3">
                <span
                  style={{
                    color: '#5F666D',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {title}
                </span>

                <div className="mt-2">
                  <span
                    style={{
                      color: '#5F666D',
                      fontSize: '0.875rem',
                      fontWeight: '400',
                    }}
                  >
                    {content}
                  </span>
                </div>
              </div>
            </div>

            <HoverCard.Arrow className="fill-white" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </>
  );
};

export default TooltipVideo;
