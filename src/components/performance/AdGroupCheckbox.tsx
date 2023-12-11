'use client';
import React from 'react';
import { useBoundStore } from '@store/index';
interface Props {
  item: any;
}
const AdGroupCheckbox = ({ item }: Props) => {
  const {
    selectedAdGroupsExplore,
    currentPurchase,
    setselectedAdGroupsExplore,
  } = useBoundStore((state) => state);
  const { selected_ad_set_ids, selected_campaign_ids } =
    selectedAdGroupsExplore ?? {};

  const isChecked =
    currentPurchase === 'Campaigns'
      ? selected_campaign_ids?.includes(item.id)
      : selected_ad_set_ids?.includes(item.id);

  if (currentPurchase === 'Ads') return <></>;

  const handleChange = () => {
    if (!isChecked) {
      if (currentPurchase === 'Ad sets') {
        setselectedAdGroupsExplore({
          ...selectedAdGroupsExplore,
          selected_ad_set_ids: [
            ...selectedAdGroupsExplore.selected_ad_set_ids,
            item.id,
          ],
        });
      } else if (currentPurchase === 'Campaigns') {
        setselectedAdGroupsExplore({
          ...selectedAdGroupsExplore,
          selected_campaign_ids: [
            ...selectedAdGroupsExplore.selected_campaign_ids,
            item.id,
          ],
        });
      }
    } else {
      if (currentPurchase === 'Ad sets') {
        setselectedAdGroupsExplore({
          ...selectedAdGroupsExplore,
          selected_ad_set_ids:
            selectedAdGroupsExplore.selected_ad_set_ids.filter(
              (id) => id !== item.id,
            ),
        });
      } else if (currentPurchase === 'Campaigns') {
        setselectedAdGroupsExplore({
          ...selectedAdGroupsExplore,
          selected_campaign_ids:
            selectedAdGroupsExplore.selected_campaign_ids.filter(
              (id) => id !== item.id,
            ),
        });
      }
    }
  };
  return (
    <td className="text-textSecondaryColor max-w-0 px-2 py-3 border-b border-r align-middle border-extraLightColor last:border-r-0">
      <span className="flex justify-center">
        <label className="checkbox-default">
          <input type="checkbox" checked={isChecked} onClick={handleChange} />
        </label>
      </span>
    </td>
  );
};

export default AdGroupCheckbox;
