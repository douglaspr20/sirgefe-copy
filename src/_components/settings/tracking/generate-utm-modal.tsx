import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import UtmImage from '@assets/img/utm-img.svg';
import HowUtmWorkImage from '@assets/img/how-utm-work.svg';
import HotToInstallImage from '@assets/img/how-to-install.svg';
import CheckIcon from '@assets/img/check-mark.svg';

import {
  facebookUTM,
  tikTokUTM,
  urlPatten,
  googleUTM,
} from '@utils/settingsCodes';
import { API, graphqlOperation } from 'aws-amplify';
import { updateShopifyStoreUrl } from '@graphql/mutations';
import Link from 'next/link';
import { addHttpsURL } from '@utils/format';

type GenerateUtmModalProps = {
  isExistingFacebookCampaigns: boolean;
  business_id: string;
  shopify_store_url: string;
};

export type Tab = 'fb' | 'tiktok' | 'google';

const GenerateUtmModal: React.FunctionComponent<GenerateUtmModalProps> = ({
  isExistingFacebookCampaigns,
  business_id,
  shopify_store_url,
}) => {
  const toggleBtn = useRef<HTMLDivElement | null>(null);
  const toggleContainer = useRef<HTMLDivElement | null>(null);

  const [shopUrl, setShopUrl] = useState<string>('');
  const [tab, setTab] = useState<Tab>('fb');
  const [copyUtmText, setCopyUtmText] = useState<boolean>(false);

  const handleStoreURl = useCallback(async () => {
    await API.graphql(
      graphqlOperation(updateShopifyStoreUrl, {
        updateShopifyStoreUrlInput: {
          business_id,
          shopify_url: shopUrl,
        },
      }),
    );
  }, [business_id, shopUrl]);

  const utmTextUrl = useMemo(() => {
    if (isExistingFacebookCampaigns) {
      return tab === 'fb'
        ? facebookUTM
        : tab === 'tiktok'
        ? tikTokUTM
        : tab === 'google'
        ? googleUTM
        : '';
    }
    return `${addHttpsURL(
      shopUrl || shopify_store_url || 'https://example.com',
    )}${
      shopUrl !== '' || shopify_store_url !== '' || 'https://example.com'
        ? '?'
        : ''
    }${
      tab === 'fb'
        ? facebookUTM
        : tab === 'tiktok'
        ? tikTokUTM
        : tab === 'google'
        ? googleUTM
        : ''
    }`;
  }, [isExistingFacebookCampaigns, shopUrl, shopify_store_url, tab]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const regex = new RegExp(urlPatten);
      if (shopify_store_url !== shopUrl) {
        if (shopUrl.length >= 3 && shopUrl.match(regex)) {
          handleStoreURl();
        }
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [shopUrl, handleStoreURl, shopify_store_url]);

  const handleCopyUtmText = (utmText: string) => {
    setCopyUtmText(true);

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(tab === 'tiktok' ? `?${utmText}` : utmText);
    }

    setTimeout(() => {
      setCopyUtmText(false);
    }, 2000);
  };

  const utmParameterTitle = useMemo(() => {
    if (tab === 'fb') {
      return 'Add The Following UTM To The URL Parameters Box.';
    } else if (tab === 'tiktok') {
      return 'Add The Following UTM To The Website URL Box.';
    } else {
      return 'Add The Following UTM To The Tracking Script Box.';
    }
  }, [tab]);

  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="generateUTMModal"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog max-w-max relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="flex relative">
            <div
              id="togglePopup"
              className="popup-toggle"
              ref={toggleBtn}
              onClick={() => {
                toggleBtn.current?.classList.toggle('active');
                toggleContainer.current?.classList.toggle('hidden');
              }}
            >
              <i className="icon-caret"></i> How it works
            </div>
            <div className="p-4 utm-w-modal">
              <div className="flex items-center justify-between relative mb-3">
                <h3 className="h3">
                  Generate UTM{' '}
                  {isExistingFacebookCampaigns
                    ? 'For Existing Ad'
                    : 'For New Ads'}{' '}
                </h3>
                <button
                  type="button"
                  className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setTab('fb');
                  }}
                >
                  <i className="icon-dismiss-circle"></i>
                </button>
              </div>
              <div className="mb-3 pb-3 border-b border-b-extraLightColor">
                <div className="p-1.5 rounded-md inline-flex items-center justify-center bg-greyLight logic-switcher">
                  <div className="logic-switcher__item mr-1 last:mr-0">
                    <input
                      type="radio"
                      id="facebook"
                      name="soc-switcher"
                      checked={tab === 'fb'}
                      onClick={() => setTab('fb')}
                    />
                    <label htmlFor="facebook">Facebook</label>
                  </div>

                  <div className="logic-switcher__item mr-1 last:mr-0">
                    <input
                      type="radio"
                      id="tiktok"
                      name="soc-switcher"
                      checked={tab === 'tiktok'}
                      onClick={() => setTab('tiktok')}
                    />
                    <label htmlFor="tiktok">TikTok</label>
                  </div>

                  {process.env.NEXT_PUBLIC_SHOW_GOOGLE_INTEGRATION ===
                    'show' && (
                    <div className="logic-switcher__item mr-1 last:mr-0">
                      <input
                        type="radio"
                        id="google"
                        name="soc-switcher"
                        checked={tab === 'google'}
                        onClick={() => setTab('google')}
                      />
                      <label htmlFor="google">Google</label>
                    </div>
                  )}
                </div>
              </div>
              {!isExistingFacebookCampaigns && (
                <>
                  <p className="font-semibold text-darkGrade100 mb-3">
                    Enter Your Desired Landing Page Link Bellow
                  </p>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="url">
                      Website URL*
                    </label>
                    <div>
                      <input
                        className="input"
                        placeholder="https//:example.com"
                        type="text"
                        id="url"
                        defaultValue={shopify_store_url || ''}
                        onChange={(e) => {
                          setShopUrl(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-row items-center justify-between">
                {isExistingFacebookCampaigns ? (
                  <div className="flex flex-col">
                    <p className="font-semibold text-darkGrade100 mb-1">
                      {utmParameterTitle}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <p className="font-semibold text-darkGrade100 mb-1">
                      Add The Following Link In The “
                      {tab === 'google' ? 'tracking script' : 'website url'}”
                      Box
                    </p>
                  </div>
                )}
                <button
                  className="relative flex items-center font-medium text-primaryColor hover:text-primaryColorHover cursor-pointer disabled:opacity-50"
                  onClick={() => handleCopyUtmText(utmTextUrl)}
                >
                  <i className="icon-copy text-xl mr-2"></i>Copy
                  <div
                    className={`${
                      !copyUtmText && 'hidden'
                    } inline-flex items-center bg-white border rounded-md border-extraLightColor px-4 py-2 shadow-lg whitespace-nowrap absolute min-w-[225px] -top-11 z-40 left-[50%] -translate-x-[50%] `}
                  >
                    <span className="inline-flex items-center justify-center mr-1.5 flex-shrink-0">
                      <Image src={CheckIcon} alt="check-icon" />
                    </span>
                    <span className="text-textSecondaryColor font-semibold">
                      Copied to clipboard
                    </span>
                  </div>
                </button>
              </div>

              <div className="relative flex flex-col">
                {tab === 'tiktok' && isExistingFacebookCampaigns ? (
                  <div
                    className="flex input pt-3 pb-11 resize-none min-h-[120px]   bg-greyLight"
                    style={{ width: 644, wordBreak: 'break-word' }}
                  >
                    <span>?</span>
                    <span className="break-words">{utmTextUrl}</span>
                  </div>
                ) : (
                  <textarea
                    className="input pt-3 pb-11 resize-none min-h-[120px]"
                    placeholder="Enter Website URL To Generate UTM "
                    disabled
                    value={utmTextUrl}
                  ></textarea>
                )}
              </div>
            </div>
            <div
              className="max-w-[402px] flex-col flex hidden"
              id="info-container"
              ref={toggleContainer}
            >
              <div className="px-4 my-4 flex-1 border-l border-l-extraLightColor">
                <div
                  id="carouselExampleCaptions"
                  className="carousel slide relative flex flex-col h-full"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner relative overflow-hidden">
                    <div className="carousel-item active relative float-left w-full">
                      <h4 className="h4 mb-1">What is a UTM</h4>
                      <p className="text-xs text-textTeriraryColor mb-3">
                        UTM codes are specifically used for tracking data on
                        traffic coming to your website or landing page from
                        external sources.
                      </p>
                      <div>
                        <Image src={UtmImage} alt="utm-img" />
                      </div>
                    </div>
                    <div className="carousel-item relative float-left w-full">
                      <h4 className="h4 mb-1">How does a UTM work</h4>
                      <p className="text-xs text-textTeriraryColor mb-3">
                        UTM codes are snippets of text added to the end of a URL
                        to help you track where website traffic comes from if
                        users click a link to this URL.
                      </p>
                      <div>
                        <Image src={HowUtmWorkImage} alt="how-utm-work" />
                      </div>
                    </div>
                    <div className="carousel-item relative float-left w-full">
                      <h4 className="h4 mb-1">How to install a UTM</h4>
                      <p className="text-xs text-textTeriraryColor mb-11">
                        Use our help center to get instructions on how to
                        install UTMs
                      </p>
                      <div className="mb-4 drop-shadow-blueShadow">
                        <Image src={HotToInstallImage} alt="how-to-install" />
                      </div>
                      <div className="text-center text-textSecondaryColor inline-flex items-center justify-center w-full mb-2">
                        Track Facebook campaigns
                        <Link
                          className="ml-2 text-base text-darkGrade50 hover:text-darkGrade75 inline-flex"
                          href="https://help.sirge.io/en/articles/5799789-track-facebook-campaigns"
                        >
                          <i className="icon-open"></i>
                        </Link>
                      </div>
                      <div className="text-center text-textSecondaryColor inline-flex items-center justify-center w-full mb-2">
                        Track TikTok campaigns
                        <a
                          className="ml-2 text-base text-darkGrade50 hover:text-darkGrade75 inline-flex"
                          href="#"
                        >
                          <i className="icon-open"></i>
                        </a>
                      </div>
                      <div className="text-center text-textSecondaryColor inline-flex items-center justify-center w-full">
                        <i className="icon-connect text-xl mr-2"></i>UTM
                        Generator
                        <Link
                          className="ml-2 text-base text-darkGrade50 hover:text-darkGrade75 inline-flex"
                          href="https://help.sirge.io/en/articles/5799743-utm-generator"
                        >
                          <i className="icon-open"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <button
                      className="inline-flex text-2xl text-darkGrade50 hover:text-darkGrade100"
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide="prev"
                    >
                      <i className="icon-chevron-left"></i>
                    </button>

                    <div className="carousel-indicators flex justify-center items-center">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="0"
                        className="active carousel-indicators__item"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        className="carousel-indicators__item"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        className="carousel-indicators__item"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>

                    <button
                      className="inline-flex text-2xl text-darkGrade50 hover:text-darkGrade100"
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide="next"
                    >
                      <i className="icon-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateUtmModal;
