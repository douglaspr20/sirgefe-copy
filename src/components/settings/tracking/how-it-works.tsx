import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  shopifyConnected: boolean;
  setExistingFbCampaign: Dispatch<SetStateAction<boolean>>;
  show: () => void;
};

const HowItWorksTab: React.FunctionComponent<Props> = ({
  setExistingFbCampaign,
  shopifyConnected,
  show,
}) => {
  return (
    <div className="p-5 pt-4">
      <div className="border rounded p-3.5 mb-2 border-extraLightColor bg-layoutQuarteryColor flex items-center justify-center">
        <div className="mr-1.5 flex-shrink-0 w-5 h-5">
          <Image
            src="/images/shopify_BW.svg"
            alt="shopify"
            width={50}
            height={50}
          />
        </div>
        <span className="text-textSecondaryColor font-medium">
          Shopify Connection
        </span>
        {shopifyConnected ? (
          <span className="tag-small green ml-1.5">Active</span>
        ) : (
          <span className="tag-small red ml-1.5">No Active</span>
        )}
      </div>
      <div className="mb-4">
        <h5 className="h5 text-textSecondaryColor mb-2">How It Works</h5>
        <p className="text-textTeriraryColor mb-2">
          Sirge automatically tracks all visitors, campaigns and sources to your
          website as well as purchases. Currently only campaigns from Facebook
          will be displayed in the performance dashboard. More integrations
          coming soon.
        </p>
        <p className="text-textTeriraryColor">
          We understand your need for accurate tracking and automated campaign
          matching, that is why we require you to follow a few steps to make
          sure we display all of your Facebook campaigns.
        </p>
      </div>

      <div className="rounded-none">
        <div className="px-4 py-3 border rounded-lg border-extraLightColor">
          <div>
            <div>
              <div className="mb-2">
                <div className="border-b border-extraLightColor mb-2">
                  <span className="h5">Track Campaigns</span>
                </div>
                <h6 className="h6 mb-2">If You Are Launching A New Ad</h6>
                <ul className="mb-1">
                  <li>1. Select either Facebook or Tiktok.</li>
                  <li>2. In the website URL Box, enter the landing page.</li>
                  <li>
                    3. Copy the UTM and paste in the Website URL box in Facebook
                    or TikTok Ads manager.
                  </li>
                </ul>
                <div>
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#generateUTMModal"
                    onClick={() => setExistingFbCampaign(false)}
                    className="link font-medium inline-flex items-center cursor-pointer"
                  >
                    <i className="icon-connect text-xl mr-2"></i>UTM For New Ad
                  </span>
                </div>
              </div>
              <div>
                <h6 className="h6 mb-2">
                  How to Add UTMs In Bulk For Existing Ads On Facebook Ads
                </h6>

                <ul className="mb-1">
                  <li className="mb-1">
                    1. Click here to access UTMs for existing ads
                  </li>
                  <li className="mb-1">2. Copy the UTM.</li>
                  <li className="mb-1">3. Go to your Facebook Ads Manager.</li>
                  <li className="flex">
                    <span className="mr-1">4.</span> From here, please go to the
                    article tutorial below that says &quot;How to add UTMs in
                    Bulk for Existing Ads on Facebook Ads&quot; to get a full
                    setup walkthrough
                  </li>
                </ul>
                <div>
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#generateUTMModal"
                    onClick={() => setExistingFbCampaign(true)}
                    className="link font-medium inline-flex items-center cursor-pointer"
                  >
                    <i className="icon-connect text-xl mr-2"></i>Click here to
                    access UTMs for existing Ads
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex items-center mt-5">
        <div className="shrink-0 w-5 h-5 mr-2">
          <Image
            src="/images/chat.svg"
            width={20}
            height={21}
            alt="chat-icon"
            className="drop-shadow-blueShadow"
          />
        </div>
        <p className="font-medium">
          For Additional Help Please{' '}
          <span onClick={() => show()} className="cursor-pointer">
            Contact Us
          </span>{' '}
          Via The Live Chat.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksTab;
