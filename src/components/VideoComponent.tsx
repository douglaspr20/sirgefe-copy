'use client';

import React, { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import PlayIcon from '@assets/icons/PlayIcon';
import { OnProgressProps } from 'react-player/base';
import { parseSubtitles } from '@utils/format';
import { SubtitleFormat } from '@interfaces/subtitle';
import SubtitleComponent from './SubtitleComponent';
import PauseIcon from '@assets/icons/PauseIcon';

interface Props {
  videoUrl: string;
  height?: number | string;
  width?: number | string;
  showSubtitles?: boolean;
  subtitleFileUrl?: string;
  showBg?: boolean;
  stopVideo?: boolean;
}

const VideoComponent: FC<Props> = ({
  videoUrl,
  height = 400,
  width = 600,
  showSubtitles = false,
  subtitleFileUrl,
  showBg = false,
  stopVideo = false,
}) => {
  const [subtitlesFormat, setSubtitlesFormat] = useState<SubtitleFormat[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [playing, setPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const playerRef = React.useRef<any>(null);

  const handleProgress = (progress: OnProgressProps) => {
    const currentSecond = Number(progress.playedSeconds.toFixed(2));

    const currentSubtitle = subtitlesFormat.find(
      (subtitle) =>
        currentSecond >= subtitle.startTime &&
        currentSecond <= subtitle.endTime,
    );

    setCurrentSubtitle(currentSubtitle?.content || '');
  };

  useEffect(() => {
    if (showSubtitles && subtitleFileUrl) {
      fetch(subtitleFileUrl)
        .then((res) => res.text())
        .then((subtitles) => {
          const parsedSubtitles = parseSubtitles(subtitles);

          setSubtitlesFormat(parsedSubtitles);
        });
    }
  }, [showSubtitles, subtitleFileUrl]);

  useEffect(() => {
    if (stopVideo) {
      if (playerRef.current) playerRef.current?.getInternalPlayer()?.pause();
    }
  }, [stopVideo]);

  const handlePlaying = () => {
    setPlaying(!playing);
  };

  const handleVideoEnded = () => {
    if (playerRef.current) playerRef.current?.seekTo(0);
  };

  useEffect(() => setIsClient(true), []);

  return (
    <div
      className={`flex flex-col items-center relative mb-3 ${
        showBg
          ? 'bg-white bg-opacity-[0.4] w-[309px] border-white rounded-md'
          : ''
      }`}
    >
      {isClient && (
        <>
          <ReactPlayer
            width={width}
            height={height}
            ref={playerRef}
            url={videoUrl}
            playing={playing}
            className="custom-player-component "
            onProgress={handleProgress}
            onEnded={() => {
              setPlaying(false);

              handleVideoEnded();
            }}
          />
          <button
            className={`absolute ${
              playing
                ? showBg
                  ? 'top-[13rem]'
                  : 'top-[9rem]'
                : showBg
                ? 'top-[12rem]'
                : 'top-[8rem]'
            } ease-in-out transition-opacity delay-200 ${
              playing === true ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handlePlaying}
          >
            {playing === false ? (
              <PlayIcon width={150} height={150} />
            ) : (
              <PauseIcon width={100} height={100} fill={'#fff'} />
            )}
          </button>

          {/* <div className="h-24">
        {showSubtitles && <SubtitleComponent subtitle={currentSubtitle} />}
      </div> */}
        </>
      )}
    </div>
  );
};

export default VideoComponent;
