import { useState } from 'react';

import { BusinessProfile } from '@interfaces/business';
import Link from 'next/link';
import Image from 'next/image';
import GenerateUtmModal from './generate-utm-modal';

type TrackingtabProps = {
  shopifyConnected: boolean;
  businessProfile: BusinessProfile | null;
  quickSetup?: boolean;
  isTrakingManualTab?: boolean;
};

const Trackingtab: React.FunctionComponent<TrackingtabProps> = ({
  businessProfile,
  shopifyConnected,
  quickSetup = false,
  isTrakingManualTab = false,
}) => {
  const [existingFbCampaign, setExistingFbCampaign] = useState<boolean>(false);

  return (
    <>
      <div className="px-2">
        {!isTrakingManualTab && (
          <>
            {' '}
            {!quickSetup && (
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
                  <span className="tag-small red ml-1.5">No active</span>
                )}
              </div>
            )}
            <div className="mb-4">
              <h5 className="h5 text-textSecondaryColor mb-2">How It Works</h5>

              {!quickSetup ? (
                <p className="text-textTeriraryColor mb-2">
                  Sirge automatically tracks all visitors, campaigns and sources
                  to your website as well as purchases. Currently only campaigns
                  from Facebook, TikTok, and Google will be displayed in the
                  performance dashboard. More integrations will be coming soon.
                </p>
              ) : (
                <p className="text-textTeriraryColor mb-2">
                  Sirge automatically tracks all visitors, campaigns and sources
                  to your website as well as purchases.
                </p>
              )}

              <p className="text-textTeriraryColor">
                For accurate tracking and automated campaign matching, We
                require you to follow a few steps to make sure we display all of
                your Facebook, TikTok, and Google campaigns.
              </p>
            </div>
          </>
        )}

        <div className="mb-2">
          <h6 className="h6 mb-2">If You Are Launching A New Ad</h6>
          <ul className="mb-1">
            <li>1. Select either Facebook or Tiktok or Google.</li>
            <li>2. In the website URL Box, enter the landing page</li>
            <li>
              3. Copy the UTM and paste in the Website URL box in Facebook or
              TikTok or Google Ads manager.
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
            How To Add UTMs In Bulk For Existing Ads On Facebook Ads
          </h6>

          <ul className="mb-1">
            <li className="mb-1">
              1. Click here to access UTMs for existing ads
            </li>
            <li className="mb-1">2. Copy the UTM.</li>
            <li className="mb-1">3. Go to your Facebook Ads Manager.</li>
            <li className="flex">
              <span className="mr-1">4.</span> From here, please go to the
              article tutorial below that says &quot;How to add UTMs in Bulk for
              Existing Ads on Facebook Ads&quot; to get a full setup
              walkthrough.
            </li>
          </ul>
          <div>
            <span
              data-bs-toggle="modal"
              data-bs-target="#generateUTMModal"
              onClick={() => setExistingFbCampaign(true)}
              className="link font-medium inline-flex items-center cursor-pointer"
            >
              <i className="icon-connect text-xl mr-2"></i>Click Here To Access
              UTMs For Existing Ads
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 mx-2 py-3 border rounded-lg border-extraLightColor">
        <div className="mb-2">
          <div className="mb-2">
            <h6 className="h6 mb-4">Help Articles</h6>

            <div className="flex items-center flex-row gap-8">
              <div>
                <Link
                  href="https://intercom.help/sirge-b67ffc5ed596/en/collections/3990703-sirge-onboarding"
                  legacyBehavior
                  passHref={true}
                >
                  <a
                    target="_blank"
                    className="text-md flex items-center text-primaryColor"
                  >
                    Sirge Onboarding
                    <Image
                      src="/images/open-blue.svg"
                      width={15}
                      height={15}
                      alt="link"
                      className="ml-1"
                    />
                  </a>
                </Link>
              </div>

              <div>
                <Link
                  href="https://intercom.help/sirge-b67ffc5ed596/en/articles/7218932-what-is-a-utm-and-how-does-it-work"
                  legacyBehavior
                  passHref={true}
                >
                  <a
                    target="_blank"
                    className="text-md flex items-center text-primaryColor"
                  >
                    How To Link All Of My UTMs
                    <Image
                      src="/images/open-blue.svg"
                      width={15}
                      height={15}
                      alt="link"
                      className="ml-1"
                    />
                  </a>
                </Link>
              </div>

              <div>
                <Link
                  href="https://intercom.help/sirge-b67ffc5ed596/en/articles/7988796-how-to-add-utms-in-bulk-for-existing-ads-on-facebook-ads"
                  legacyBehavior
                  passHref={true}
                >
                  <a
                    target="_blank"
                    className="text-md flex items-center text-primaryColor"
                  >
                    How To Add UTMs In Bulk For Existing Ads On Facebook Ads
                    <Image
                      src="/images/open-blue.svg"
                      width={15}
                      height={15}
                      alt="link"
                      className="ml-1"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GenerateUtmModal
        isExistingFacebookCampaigns={existingFbCampaign}
        business_id={businessProfile?.profilePrisma?.id as string}
        shopify_store_url={
          businessProfile?.profilePrisma?.store?.store_url as string
        }
      />
    </>
  );
};

export default Trackingtab;
