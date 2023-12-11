import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import validator from 'validator';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';

type GenerateUTMProps = {
  openUtmDialog: boolean;
  setOpenUtmDialog: Dispatch<SetStateAction<boolean>>;
};

const GenerateUTM = ({ openUtmDialog, setOpenUtmDialog }: GenerateUTMProps) => {
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    setValue(newValue);
  };
  // let facebookUTM = `utm_source={{site_source_name}}&utm_campaign={{campaign.name}}&utm_medium={{adset.name}}&utm_content={{ad.name}}&sirge_campaign_id={{campaign.id}}&sirge_adset_id={{adset.id}}&sirge_ad_id={{ad.id}}`;
  // let tikTokUTM =
  // 'utm_source=tiktok&utm_campaign=__CAMPAIGN_NAME__&utm_medium=__AID_NAME__&utm_content=__CID_NAME__&sirge_campaign_id=__CAMPAIGN_ID__&sirge_adset_id=__AID__&sirge_ad_id=__CID__';

  const changeUrl = (url: string) => {
    if (validator.isURL(url)) {
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }

    setWebsiteUrl(url);
  };

  const cancelUtmDialog = () => {
    setWebsiteUrl('');
    setOpenUtmDialog(false);
  };

  return <></>;
};

type TabPanelProps = {
  children: ReactNode;
  value: number;
  index: number;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export default GenerateUTM;
