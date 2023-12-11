import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useBoundStore } from '@store/index';

const BusinessDropdownNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const visitorId = searchParams?.get('visitorId') as string;
  const { businessList, setSelectedBusiness } = useBoundStore.getState();

  return (
    <div className="inline-flex dropdown relative">
      <div
        id="dropdownMenuCompany"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="dropdown-toggle inline-flex items-center cursor-pointer text-darkGrade50 [&.show]:text-darkGrade100"
      >
        <div className="rounded-full inline-flex overflow-hidden flex-shrink-0 border mr-2 border-extraLightColor w-8 h-8 user-box-shadow">
          <Image
            src={
              businessList?.[0]?.logo &&
              businessList?.[0]?.logo.toUpperCase() !== 'NULL'
                ? businessList?.[0]?.logo
                : '/images/business-default-icon.svg'
            }
            alt=""
            width={50}
            height={50}
            loading="lazy"
          />
        </div>
        <span className="font-medium text-sm inline-flex items-center">
          {businessList?.[0]?.name}
          <i className="icon-arrow-down ml-1"></i>
        </span>
      </div>
      <ul
        className="dropdown-menu min-w-[200px] max-h-[630px] overflow-y-auto absolute hidden p-3 bg-white widget-container rounded-lg border border-extraLightColor"
        aria-labelledby="dropdownMenuCompany"
      >
        {businessList?.map((business) => {
          return (
            <li
              key={business.id}
              className="inline-flex items-center mb-4 last:mb-0 cursor-pointer text-textSecondaryColor hover:text-darkGrade100 w-full"
              onClick={() => {
                setSelectedBusiness(business);

                router.push(
                  `${pathname}?businessVanityName=${business.vanity_name}&visitorId=${visitorId}`,
                );
              }}
            >
              <div className="rounded-full inline-flex overflow-hidden flex-shrink-0 border mr-2 border-extraLightColor w-6 h-6">
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
              <div className="truncate max-w-[120px]">{business.name}</div>
              <i className="icon-checkmark-circle text-greenDefault ml-auto"></i>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BusinessDropdownNav;
