import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';

import UtmImage from '@assets/img/utm-img.svg';
import HowUtmWorkImage from '@assets/img/how-utm-work.svg';
import HotToInstallImage from '@assets/img/how-to-install.svg';
import CheckIcon from '@assets/img/check-mark.svg';
import { ArrowTopIcon } from '@assets/icons/performance';
import { facebookUTM, googleUTM, tikTokUTM } from '@utils/settingsCodes';
import { MarketingSources } from '@sirge-io/sirge-types';

type GenerateUtmProps = {
  shopifyStoreUrl: string;
};

const GenerateUtm = ({ shopifyStoreUrl }: GenerateUtmProps) => {
  const [copyclipBoard, setcopyclipBoard] = useState(false);
  const toggleBtn = useRef<HTMLDivElement | null>(null);
  const toggleContainer = useRef<HTMLDivElement | null>(null);

  const [shopUrl, setShopUrl] = useState<string>('');
  const [tab, setTab] = useState<MarketingSources>(MarketingSources.FACEBOOK);

  useEffect(() => {
    setShopUrl(shopifyStoreUrl);
  }, [shopifyStoreUrl]);

  const utmTextUrl = useMemo(() => {
    return `${
      tab === MarketingSources.FACEBOOK
        ? facebookUTM
        : tab === MarketingSources.TIKTOK
        ? `?${tikTokUTM}`
        : tab === MarketingSources.GOOGLE
        ? googleUTM
        : ''
    }`;
  }, [shopUrl, tab]);

  const CopyClipBorad = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Browser don't have support for native clipboard.");
      }
      const copyText: any = document.getElementById('CopyClipBoard')?.innerHTML;
      const decodedCode = copyText.replace(/&amp;/g, '&');
      await navigator.clipboard.writeText(decodedCode);

      setcopyclipBoard(true);

      setTimeout(() => {
        setcopyclipBoard(false);
      }, 2000);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="generateUTM"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog max-w-max relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="flex relative">
              <div
                id="togglePopup"
                className="popup-toggle active"
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
                  <h3 className="h3">Add UTMs For Existing Ads</h3>
                  <button
                    type="button"
                    className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
                    data-bs-dismiss="modal"
                    aria-label="Close"
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
                        defaultChecked={MarketingSources.FACEBOOK === tab}
                        onClick={() => setTab(MarketingSources.FACEBOOK)}
                      />
                      <label htmlFor="facebook">Facebook</label>
                    </div>
                    <div className="logic-switcher__item mr-1 last:mr-0">
                      <input
                        type="radio"
                        id="tiktok"
                        name="soc-switcher"
                        defaultChecked={MarketingSources.TIKTOK === tab}
                        onClick={() => setTab(MarketingSources.TIKTOK)}
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
                          defaultChecked={MarketingSources.GOOGLE === tab}
                          onClick={() => setTab(MarketingSources.GOOGLE)}
                        />
                        <label htmlFor="google">Google</label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <p className="font-semibold text-darkGrade100 mb-1">
                      {tab === MarketingSources.FACEBOOK
                        ? 'Copy The Following Parameters Into The URL Parameters Box In Facebook Ad Manager'
                        : tab === MarketingSources.TIKTOK
                        ? 'Add The Following Parameters To The End Of The URL Inside The Website URL Box In TikTok Ad Manager'
                        : ''}
                    </p>
                  </div>
                  <button
                    className="flex items-center font-medium text-primaryColor hover:text-primaryColorHover cursor-pointer disabled:opacity-50"
                    onClick={() => CopyClipBorad()}
                  >
                    <i className="icon-copy text-xl mr-2"></i>Copy
                  </button>
                </div>
                <div className="relative flex flex-col">
                  <textarea
                    className="input pt-3 pb-11 resize-none min-h-[120px]"
                    placeholder="Enter website URL to generate UTM "
                    value={utmTextUrl}
                    id="CopyClipBoard"
                    readOnly
                  ></textarea>

                  <div
                    className={`${
                      !copyclipBoard && 'hidden'
                    } inline-flex items-center bg-white border rounded-md border-extraLightColor px-4 py-2 shadow-lg whitespace-nowrap absolute min-w-[225px] left-1/2 -translate-x-1/2 -top-7 z-40`}
                  >
                    <span className="inline-flex items-center justify-center mr-1.5 flex-shrink-0">
                      <Image src={CheckIcon} alt="check-icon" />
                    </span>
                    <span className="text-textSecondaryColor font-semibold">
                      Link copied to clipboard
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="max-w-[402px] flex-col flex"
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
                          UTM codes are snippets of text added to the end of a
                          URL to help you track where website traffic comes from
                          if users click a link to this URL.
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
                          <a
                            className="ml-2 text-base text-darkGrade50 hover:text-darkGrade75 inline-flex"
                            href="https://help.sirge.io/en/articles/5799789-track-facebook-campaigns"
                          >
                            <ArrowTopIcon />
                          </a>
                        </div>
                        <div className="text-center text-textSecondaryColor inline-flex items-center justify-center w-full mb-2">
                          Track TikTok campaigns
                          <a
                            className="ml-2 text-base text-darkGrade50 hover:text-darkGrade75 inline-flex"
                            href="#"
                          >
                            <ArrowTopIcon />
                          </a>
                        </div>
                        <div className="text-center text-textSecondaryColor inline-flex items-center justify-center w-full">
                          <i className="icon-connect text-xl mr-2"></i>UTM
                          Geneartor
                          <a
                            className="ml-2 text-base text-darkGrade50 hover:text-darkGrade75 inline-flex"
                            href="https://help.sirge.io/en/articles/5799743-utm-generator"
                          >
                            <ArrowTopIcon />
                          </a>
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
    </>
  );
};

export default GenerateUtm;
