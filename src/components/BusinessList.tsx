import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Business } from '@sirge-io/sirge-types';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { getCampaignCount } from '@utils/business';

interface Props {
  data: Business[];
  emptyListMessage: string;
  setFirstLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const BusinessList = ({ data, emptyListMessage, setFirstLogin }: Props) => {
  const [, setPopoverElement] = useState<HTMLElement | null>(null);

  const { setSelectedBusiness } = useBusinessProfileContext();

  // TBD - Once UTM disconnect part is done
  // const [popoverContent, setPopoverContent] = useState<{
  //   title: string;
  //   content: string;
  // }>({
  //   title: "",
  //   content: "",
  // });

  // useEffect(() => {
  //   setPopoverContent({
  //     title: `1 of UTM disconected`,
  //     content: "Tracking stopped please fix to continue trackingr",
  //   });
  // }, []);

  const businessPath = (vanity_name: string) => {
    return `/${vanity_name}/home`;
  };

  return (
    <>
      {data?.length <= 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-textSecondaryColor mb-3 font-medium">
            {emptyListMessage}
          </p>
          <div className="mb-3">
            <Image
              src="/images/welcome-img.svg"
              alt=""
              height={116}
              width={116}
            />
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col ${
            data?.length >= 4 && 'max-h-[300px] overflow-y-auto'
          }`}
        >
          {data?.map((business: any, index: number) => (
            <Link
              key={index}
              href={businessPath(business.vanity_name)}
              onClick={(e) => {
                const onboardingComplete = localStorage.getItem(
                  'onboarding-completed',
                );

                if (onboardingComplete === 'false') {
                  e.preventDefault();
                  setFirstLogin(true);
                }
                setSelectedBusiness(business);
              }}
            >
              <div className="px-4 py-3 mb-3 rounded border border-borderLightColor flex items-center">
                <div className="edit-image relative flex items-center justify-center border w-8 h-8 rounded-full border-borderLightColor bg-greyLight overflow-hidden">
                  <Image
                    src={
                      business?.logo && business?.logo.toUpperCase() !== 'NULL'
                        ? business?.logo
                        : '/images/business-default-icon.svg'
                    }
                    alt=""
                    width={50}
                    height={50}
                    loading="lazy"
                  />
                </div>
                <div
                  ref={setPopoverElement}
                  className="flex flex-col mr-2 ml-2"
                >
                  <span className="text-textSecondaryColor font-semibold leading-4 mb-[2px] inline-flex items-center capitalize">
                    {business?.business_name}
                    {/* {!isDisconnected && (
                      <>
                        <span
                          ref={setRefElement}
                          className="w-4 ml-1 cursor-pointer"
                          onMouseEnter={() => setDisplayPopover(true)}
                          onMouseLeave={() => setDisplayPopover(false)}
                        >
                          <Image
                            src={WarningIcon}
                            alt="warning"
                            width={13.33}
                            height={13.33}
                          />
                        </span>
                        <div
                          ref={setPopoverElement}
                          className={`${
                            displayPopover ? "visible" : "visually-hidden"
                          }`}
                          style={styles.popper}
                          {...attributes.popper}
                        >
                          <Popover
                            title={"1 of UTM disconected"}
                            content={
                              "Tracking stopped please fix to continue trackingr"
                            }
                          />
                        </div>
                      </>
                    )} */}
                  </span>
                  {/* <span className={`tag-small ${business.status === "active" ? "green" : "red"} ml-1.5`}>{business.status === "active" ? "Active":"Inactive"}</span> */}
                  {/* Yet to be done */}
                  <span className="text-textTeriraryColor leading-4">
                    {getCampaignCount(business)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default BusinessList;
