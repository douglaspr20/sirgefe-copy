import { ItemSocialMediaIntegration } from 'API';
import { FC } from 'react';

interface TabProps {
  id: string;
  searchValue: string;
  arrayAds: ItemSocialMediaIntegration[];
  arrayAdsSelected: ItemSocialMediaIntegration[];
  handleSelectAd: (selectedAd: any) => void;
  firstActive?: boolean;
}

const AdsTabPanel: FC<TabProps> = ({
  id,
  arrayAds,
  arrayAdsSelected,
  handleSelectAd,
  firstActive,
}) => {
  return (
    <div
      className={`tab-pane fade min-h-full overflow-y-auto custom-select-list-h ${
        firstActive ? 'show active' : ''
      }`}
      id={id}
      role="tabpanel"
      aria-labelledby="tabs-facebook-tab"
    >
      {arrayAds.map((ad) => {
        return (
          <label
            key={ad.id}
            htmlFor={`custom-checkbox-${ad.name}`}
            className="checbox-default flex my-3 items-center"
          >
            <input
              id={`custom-checkbox-${ad.name}`}
              type="checkbox"
              className="w-4 h-4"
              checked={arrayAdsSelected.some((ads) => ads.id === ad.id)}
              onChange={() => handleSelectAd(ad)}
            />

            <span className="text-darkGrade75 font-medium leading-4 ml-2 flex">
              {ad.name}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default AdsTabPanel;
