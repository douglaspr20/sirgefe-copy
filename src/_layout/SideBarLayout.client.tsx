'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import BusinessDropdownNav from '_components/businessDropdownNav.client';
import DropdownNav from '_layout/dropdownNav.client';
import InfoIcon from '@assets/icons/InfoIcon';
import {
  IconPathAnalytics,
  IconPathCustomerJourney,
  IconPathFolder,
  IconPathHome,
  IconPathPerformance,
  IconPathPostTrack,
  IconPathSettings,
} from '@assets/icons/sidebar/svg.paths';
import SupportChatIcon from '@assets/icons/SupportChatIcon';
import Calendly from '_components/Calendly.client';
import TailwindModal from '_components/TailwindModal.client';
import Popover from '_components/Popover';
import SidebarItem from '_components/sidebarItem.client';
import { Sidebar } from '@utils/types';
import { usePopper } from 'react-popper';
import { useIntercom } from 'react-use-intercom';
import { useBoundStore } from '@store/index';
import { UserPrisma } from 'API';

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [showNewPerformance, setShowNewPerformance] = useState<boolean>(false);

  const {
    selectedBusiness,
    userProfile,
    isSidebarOpen,
    setIsSidebarOpen,
    facebookConnected,
    tiktokConnected,
    shopifyConnected,
    facebookIntegration,
    googleConnected,
    allSocialMediaAccountsDisconnected,
    allAdsAccountsDisconnected,
    previousConnected,
  } = useBoundStore((state) => state);

  const [hideLinks, setHideLinks] = useState<boolean>(false);
  const [openCalendlyModal, setOpenCalendlyModal] =
    React.useState<boolean>(false);

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {});
  const [chatPopperElement, setChatPopperElement] =
    useState<HTMLElement | null>(null);
  const [chatReferenceElement, setChatReferenceElement] =
    useState<Element | null>(null);
  const [displayChatPopover, setDisplayChatPopover] = useState<boolean>(false);
  const chatPopper = usePopper(chatReferenceElement, chatPopperElement, {});
  const [helpPopperElement, setHelpPopperElement] =
    useState<HTMLElement | null>(null);
  const [helpReferenceElement, setHelpReferenceElement] =
    useState<Element | null>(null);
  const [displayHelpPopover, setDisplayHelpPopover] = useState<boolean>(false);
  const helpPopper = usePopper(helpReferenceElement, helpPopperElement, {});

  const { shutdown, boot, show, isOpen } = useIntercom();

  const bootIntercom = (userProfile?: UserPrisma | null) => {
    isOpen ?? shutdown();
    if (userProfile) {
      boot({
        name: `${userProfile.first_name} ${userProfile.last_name}`,
        email: userProfile.email,
        createdAt: userProfile.created_at,
        customAttributes: {
          posthog_url: `https://posthog.prod.sirge.com/person/${userProfile?.email}`,
        },
      });
    } else {
      boot();
    }
    show();
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setTimeout(() => {
        setHideLinks(false);
      }, 300);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (
      localStorage.getItem('use_new_performance_page') === 'true' &&
      process.env.NEXT_PUBLIC_SHOW_NEW_PERFORMANCE === 'show'
    ) {
      setShowNewPerformance(true);
    } else {
      setShowNewPerformance(false);
    }
  }, [pathname]);

  const navList: Sidebar[] = [
    {
      route: '/home',
      title: 'Home',
      icon: <IconPathHome />,
    },
    // {
    //   route: '/analytics',
    //   title: 'Analytics',
    //   icon: <IconPathAnalytics />,
    // },
    {
      route: showNewPerformance ? '/performance/new' : '/performance/campaigns',
      title: 'Performance',
      icon: <IconPathPerformance />,
    },
    {
      route: '/customer-journey',
      title: 'Customer Journey',
      icon: <IconPathCustomerJourney />,
    },
    {
      route: '/post-track',
      title: 'Post Track',
      icon: <IconPathPostTrack />,
    },
    {
      route: '/audiences',
      title: 'Audiences',
      icon: <IconPathFolder />,
    },

    {
      route: '/settings',
      title: 'Settings',
      icon: <IconPathSettings />,
    },
  ];

  return (
    <div className="flex flex-row max-w-full">
      <div
        className={`sidebar ${
          !isSidebarOpen && 'expanded'
        } flex flex-col h-screen p-4 items-start bg-white relative`}
      >
        <div className="mb-12">
          <Link href="/selector">
            <div className="flex items-center ">
              <div className="w-10 h-10 flex rounded-full flex-shrink-0 justify-center align-middle bg-[#01E4FF] p-2 primary-box-shadow ">
                <Image
                  src="/images/logo.svg"
                  width={13}
                  height={26}
                  alt="logo"
                />
              </div>

              {isSidebarOpen && (
                <Image
                  src="/images/sidebar-logo.svg"
                  width={82}
                  height={33}
                  alt="logo"
                />
              )}
            </div>
          </Link>

          <div
            className="absolute sidebar-arrow -right-2 top-12 border bg-white border-extraLightColor hover:border-borderLightColor w-4 h-8 cursor-pointer rounded"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              localStorage.setItem(
                'openSidebar',
                JSON.stringify(!isSidebarOpen),
              );
              setHideLinks(true);
            }}
          >
            {isSidebarOpen ? (
              <span className="sidebar-arrow-left"></span>
            ) : (
              <span className="sidebar-arrow-right"></span>
            )}
          </div>
        </div>
        <nav className="w-full">
          <ul className="flex flex-col items-start">
            {navList.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <SidebarItem
                    item={item}
                    selectedBusiness={selectedBusiness}
                    isExpanded={isSidebarOpen}
                    hideLinks={hideLinks}
                    isActive={pathname?.includes(item.route)}
                  />
                </React.Fragment>
              );
            })}
          </ul>
        </nav>

        {isSidebarOpen &&
          !hideLinks &&
          !selectedBusiness?.completed_onboarding_call && (
            <div className="mt-auto mb-3">
              <button
                className="btn"
                onClick={() => setOpenCalendlyModal(true)}
                data-bs-toggle="modal"
                data-bs-target="#calendlyModal"
              >
                Book onboarding
              </button>
            </div>
          )}

        <div
          className={`mr-auto mb-6 py-2 px-2 rounded-lg flex items-center text-white z-10 pointer bg-primaryColor ${
            (selectedBusiness?.completed_onboarding_call || hideLinks) &&
            'mt-auto'
          }`}
          onClick={() => bootIntercom(userProfile)}
        >
          <a
            className={`mt-auto mr-auto flex items-center`}
            ref={setChatReferenceElement}
            onMouseEnter={() => setDisplayChatPopover(true)}
            onMouseLeave={() => setDisplayChatPopover(false)}
          >
            <span>
              <SupportChatIcon fill="#FFFFFF" />
            </span>

            {isSidebarOpen && !hideLinks ? (
              <span className="font-medium ml-2 ">{"Let's Chat"}</span>
            ) : (
              <Tooltip
                setPopperElement={
                  setChatPopperElement as unknown as HTMLElement
                }
                displayPopover={displayChatPopover}
                attributes={chatPopper.attributes}
                styles={chatPopper.styles}
                title="Let's Chat"
              />
            )}
          </a>
        </div>
        <Link
          href="https://intercom.help/sirge-b67ffc5ed596/en/"
          legacyBehavior
          passHref={true}
        >
          <a
            target="_blank"
            className="ml-2 mr-auto mb-3 flex items-center text-darkGrade75 hover:text-primaryColor z-10"
            ref={setHelpReferenceElement}
            onMouseEnter={() => setDisplayHelpPopover(true)}
            onMouseLeave={() => setDisplayHelpPopover(false)}
          >
            <span>
              <InfoIcon fill={'#8C9DAD'} />
            </span>

            {isSidebarOpen && !hideLinks ? (
              <span className={`text-textTeriraryColor font-medium ml-2 `}>
                Help Center
              </span>
            ) : (
              <Tooltip
                setPopperElement={
                  setHelpPopperElement as unknown as HTMLElement
                }
                displayPopover={displayHelpPopover}
                attributes={helpPopper.attributes}
                styles={helpPopper.styles}
                title="Visit our Help Center"
              />
            )}
          </a>
        </Link>

        {/**'visually-hidden' */}
        {!isSidebarOpen && (
          <div
            ref={setPopperElement}
            className={`${
              displayPopover ? 'popover visible' : 'popover visually-hidden '
            }`}
            style={{
              ...styles.popper,
              width: 166,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              left: 31,
              top: -26,
            }}
            {...attributes.popper}
          >
            <Popover
              title="Visit our help center"
              customClassPopoverBody={{
                padding: 0,
              }}
              customClassPopoverTitle={{
                fontSize: 14,
                textAlign: 'center',
              }}
            />
          </div>
        )}
      </div>

      <div
        className={`flex flex-col grow content-container  ${
          isSidebarOpen ? 'w-[calc(100vw-232px)]' : ''
        }`}
      >
        <div
          className={`top-panel flex justify-between items-center px-8 py-4 `}
        >
          <div className="flex items-center">
            <div className="dropdown relative">
              <div
                id="dropdownMenuConnectStatus"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="dropdown-toggle w-8 h-8 mr-4 flex rounded-full items-center justify-center bg-greyLight relative user-box-shadow cursor-pointer dropdown"
              >
                {allSocialMediaAccountsDisconnected &&
                allAdsAccountsDisconnected ? (
                  <>
                    <i className="icon-cloud text-darkGrade75 text-sm"></i>
                    <span className="status w-2.5 h-2.5 shrink-0 border-2 border-white rounded-full absolute bg-darkGrade50 left-6 bottom-5"></span>
                  </>
                ) : (
                  <>
                    {[
                      (facebookConnected && facebookIntegration === 'true') ||
                        !previousConnected['facebook'],
                      tiktokConnected || !previousConnected['tiktok'],
                      googleConnected || !previousConnected['google'],
                    ].every((connection) => connection === true) ? (
                      <>
                        <i className="icon-cloud text-darkGrade75 text-sm"></i>
                        <span className="status w-2.5 h-2.5 shrink-0 border-2 border-white rounded-full absolute bg-greenDefault left-6 bottom-5"></span>
                      </>
                    ) : (
                      <>
                        <i className="icon-cloud text-warningColor text-sm drop-shadow-warningShadow"></i>
                        <span className="status w-2.5 h-2.5 shrink-0 border-2 border-white rounded-full absolute bg-warningColor left-6 bottom-5"></span>
                      </>
                    )}
                  </>
                )}
              </div>
              <ul
                className="dropdown-menu min-w-max absolute hidden p-4 bg-white widget-container rounded-lg border border-extraLightColor"
                aria-labelledby="dropdownMenuConnectStatus"
              >
                <li className="flex items-center mb-3">
                  <div className="mr-1.5 inline-flex h-5 items-center"></div>
                  <span className="text-textSecondaryColor font-medium mr-1.5">
                    Facebook
                  </span>

                  {facebookConnected && facebookIntegration === 'true' ? (
                    <span className="tag-small green">Connected</span>
                  ) : (
                    <>
                      <span
                        className={`tag-small ${
                          previousConnected['facebook'] ? 'red' : 'grey'
                        }`}
                      >
                        Disconnected
                      </span>
                      <button
                        className="inline-flex ml-2 text-base text-darkGrade50 hover:text-darkGrade75"
                        onClick={() =>
                          router.push(
                            `/${selectedBusiness?.vanity_name}/settings/connections`,
                          )
                        }
                      >
                        <i className="icon-connect"></i>
                      </button>
                    </>
                  )}
                </li>
                <li className="flex items-center mb-3">
                  <div className="mr-1.5 inline-flex h-5 items-center"></div>
                  <span className="text-textSecondaryColor font-medium mr-1.5">
                    TikTok
                  </span>
                  {tiktokConnected ? (
                    <span className="tag-small green">Connected</span>
                  ) : (
                    <>
                      <span
                        className={`tag-small ${
                          previousConnected['tiktok'] ? 'red' : 'grey'
                        }`}
                      >
                        Disconnected
                      </span>
                      <button
                        className="inline-flex ml-2 text-base text-darkGrade50 hover:text-darkGrade75"
                        onClick={() =>
                          router.push(
                            `/${selectedBusiness?.vanity_name}/settings/connections`,
                          )
                        }
                      >
                        <i className="icon-connect"></i>
                      </button>
                    </>
                  )}
                </li>
                {process.env.NEXT_PUBLIC_SHOW_GOOGLE_INTEGRATION === 'show' && (
                  <li className="flex items-center mb-3">
                    <div className="mr-1.5 inline-flex h-5 items-center"></div>
                    <span className="text-textSecondaryColor font-medium mr-1.5">
                      Google
                    </span>
                    {googleConnected ? (
                      <span className="tag-small green">Connected</span>
                    ) : (
                      <>
                        <span
                          className={`tag-small ${
                            previousConnected['google'] ? 'red' : 'grey'
                          }`}
                        >
                          Disconnected
                        </span>
                        <button
                          className="inline-flex ml-2 text-base text-darkGrade50 hover:text-darkGrade75"
                          onClick={() =>
                            router.push(
                              `/${selectedBusiness?.vanity_name}/settings/connections`,
                            )
                          }
                        >
                          <i className="icon-connect"></i>
                        </button>
                      </>
                    )}
                  </li>
                )}

                <li className="flex items-center">
                  <div className="mr-1.5"></div>
                  <span className="text-textSecondaryColor font-medium mr-1.5">
                    Shopify
                  </span>
                  {shopifyConnected ? (
                    <span className="tag-small green">Connected</span>
                  ) : (
                    <>
                      <span className="tag-small red">Disconnected</span>
                      <button
                        className="inline-flex ml-2 text-base text-darkGrade50 hover:text-darkGrade75"
                        onClick={() =>
                          router.push(
                            `/${selectedBusiness?.vanity_name}/settings/connections`,
                          )
                        }
                      >
                        <i className="icon-connect"></i>
                      </button>
                    </>
                  )}
                </li>
              </ul>
            </div>
            <BusinessDropdownNav />
          </div>

          <DropdownNav />
        </div>
        <div className="max-h-[92vh] overflow-y-auto">{children}</div>
      </div>

      <TailwindModal
        handleCloseUpdate={() => setOpenCalendlyModal(false)}
        setShowDialog={setOpenCalendlyModal}
        showDialog={openCalendlyModal}
        id="calendlyModal"
        styleDialog={{
          maxWidth: '1024px',
          flexDirection: 'row',
        }}
      >
        <Calendly
          setOpenCalendlyModal={() => {
            setOpenCalendlyModal(false);
          }}
          isOnboardingPage={false}
        />
      </TailwindModal>
    </div>
  );
};

function Tooltip({
  setPopperElement,
  displayPopover,
  attributes,
  styles,
  title,
}: {
  setPopperElement: HTMLElement;
  displayPopover: boolean;
  attributes: any;
  styles: any;
  title: string;
}) {
  return (
    <div
      ref={setPopperElement}
      className={`${
        displayPopover ? 'popover visible' : 'popover visually-hidden'
      }`}
      style={{
        ...styles.popper,
        width: 'max-content',
        minWidth: '65px',
        height: 34,
        top: -30,
        left: 49,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...attributes.popper}
    >
      <Popover
        title={title}
        customClassPopoverBody={{
          padding: 0,
        }}
        customClassPopoverTitle={{
          fontSize: 14,
          textAlign: 'center',
        }}
      />
    </div>
  );
}
