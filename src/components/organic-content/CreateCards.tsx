import FacebookIcon from '@assets/icons/FacebookIcon';
import InstagramIcon from '@assets/icons/InstagramIcon';
import LinkedInIcon from '@assets/icons/LinkedInIcon';
import PlusRoundIcon from '@assets/icons/PlusRoundIcon';
import SocialMediaIcon from '@assets/icons/SocialMediaIcon';
import Tooltip from '@components/Tooltip';
import React, { FC } from 'react';

interface Props {
  setLinkModalActive: (value: boolean) => void;
  setTrackableCopyType: (value: string) => void;
  setTrackableCopyName: (value: string) => void;
  trackableCopyUsedTypes: string[];
}

const CreateCards: FC<Props> = ({
  setLinkModalActive,
  setTrackableCopyType,
  setTrackableCopyName,
  trackableCopyUsedTypes,
}) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-4 relative">
        <div className="widget-container p-5">
          {trackableCopyUsedTypes?.includes('linkedin') && (
            <Tooltip
              title="LinkedIn Bio already created, please create a Social Media type instead."
              anchorId="linkedin"
              place="top"
            />
          )}
          <div
            id="linkedin"
            className={`${
              trackableCopyUsedTypes?.includes('linkedin') ? 'opacity-60' : ''
            } flex items-center justify-between h-full`}
          >
            <div className="flex items-center gap-2">
              <LinkedInIcon />
              <p className="text-textSecondaryColor font-semibold">
                LinkedIn Bio
              </p>
            </div>
            <button
              className="disabled:cursor-not-allowed link inline-flex items-center font-medium gap-1"
              onClick={() => {
                setLinkModalActive(true);
                setTrackableCopyType('linkedin');
                setTrackableCopyName('LinkedIn Bio');
              }}
              disabled={trackableCopyUsedTypes?.includes('linkedin')}
            >
              <PlusRoundIcon />
              Create
            </button>
          </div>
        </div>
        <div className="widget-container p-5">
          {trackableCopyUsedTypes?.includes('instagram') && (
            <Tooltip
              title="Instagram Bio already created, please create a Social Media type instead."
              anchorId="instagram"
              place="top"
            />
          )}
          <div
            id="instagram"
            className={`${
              trackableCopyUsedTypes?.includes('instagram') ? 'opacity-60' : ''
            } flex items-center justify-between h-full`}
          >
            <div className="flex items-center gap-2">
              <InstagramIcon />
              <p className="text-textSecondaryColor font-semibold">
                Instagram Bio
              </p>
            </div>
            <button
              className="disabled:cursor-not-allowed link inline-flex items-center font-medium gap-1"
              onClick={() => {
                setLinkModalActive(true);
                setTrackableCopyType('instagram');
                setTrackableCopyName('Instagram Bio');
              }}
              disabled={trackableCopyUsedTypes?.includes('instagram')}
            >
              <PlusRoundIcon />
              Create
            </button>
          </div>
        </div>
        <div className="widget-container p-5">
          {trackableCopyUsedTypes?.includes('facebook') && (
            <Tooltip
              title="Facebook Page Description already created, please create a Social Media type instead."
              anchorId="facebook"
              place="top"
            />
          )}
          <div
            id="facebook"
            className={`${
              trackableCopyUsedTypes?.includes('facebook') ? 'opacity-60' : ''
            } flex items-center justify-between h-full`}
          >
            <div className="flex items-center gap-2">
              <FacebookIcon />
              <p className="text-textSecondaryColor font-semibold">
                Facebook Page Description
              </p>
            </div>
            <button
              className="disabled:cursor-not-allowed link inline-flex items-center font-medium gap-1"
              onClick={() => {
                setLinkModalActive(true);
                setTrackableCopyType('facebook');
                setTrackableCopyName('Facebook Page Description');
              }}
              disabled={trackableCopyUsedTypes?.includes('facebook')}
            >
              <PlusRoundIcon />
              Create
            </button>
          </div>
        </div>
        <div className="widget-container p-5">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <SocialMediaIcon />
              <p className="text-textSecondaryColor font-semibold">
                Social Media
              </p>
            </div>
            <button
              className="link inline-flex items-center font-medium gap-1"
              onClick={() => {
                setLinkModalActive(true);
                setTrackableCopyType('social-media');
              }}
            >
              <PlusRoundIcon />
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCards;
