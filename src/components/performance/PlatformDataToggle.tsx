import { MarketingPlatforms } from '@enums/marketingPlatforms';
import React from 'react';

interface Props {
  facebookConnected: boolean;
  tiktokConnected: boolean;
  googleConnected?: boolean;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentPlatform: MarketingPlatforms;
}
const PlatformDataToggle = ({
  facebookConnected,
  tiktokConnected,
  googleConnected,
  checked,
  onChange,
  currentPlatform,
}: Props) => {
  if (currentPlatform === MarketingPlatforms.ALLPLATFORMS) return <></>;
  if (currentPlatform === MarketingPlatforms.FACEBOOK && !facebookConnected)
    return <></>;

  if (currentPlatform === MarketingPlatforms.TIKTOK && !tiktokConnected)
    return <></>;

  if (currentPlatform === MarketingPlatforms.GOOGLE && !googleConnected)
    return <></>;

  const title =
    currentPlatform === MarketingPlatforms.FACEBOOK
      ? 'Facebook Generated Data'
      : currentPlatform === MarketingPlatforms.TIKTOK
      ? 'TikTok Generated Data'
      : 'Google Generated Data';

  return (
    <div className="inline-flex items-center pr-4 mr-4 relative first:pl-0 last:pr-0 after:content-[''] after:block after:absolute after:h-6 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
      <span className="mr-2 font-medium text-darkGrade50">{title}</span>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default PlatformDataToggle;
