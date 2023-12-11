import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useBoundStore } from '@store/index';
import SirgeSpinner from '@components/loader/SirgeSpinner';

const BusinessDropdownNav = () => {
  const router = useRouter();
  const { businessList, setSelectedBusiness, selectedBusiness, isLoading } =
    useBoundStore.getState();
  const pathName = usePathname();
  const searchParams = useSearchParams();

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
              selectedBusiness?.logo &&
              selectedBusiness?.logo.toUpperCase() !== 'NULL'
                ? selectedBusiness?.logo
                : '/images/business-default-icon.svg'
            }
            alt=""
            width={50}
            height={50}
            loading="lazy"
          />
        </div>
        <span className="font-medium text-sm inline-flex items-center">
          {businessList[0]?.name}
          <i className="icon-arrow-down ml-1"></i>
        </span>

        {isLoading ? <SirgeSpinner size="small" className="ml-2" /> : <></>}
      </div>
      <ul
        className="dropdown-menu min-w-[200px] max-h-[630px] overflow-y-auto absolute hidden p-3 bg-white widget-container rounded-lg border border-extraLightColor"
        aria-labelledby="dropdownMenuCompany"
      >
        {businessList.map((business) => {
          return (
            <li
              key={business.id}
              className="inline-flex items-center mb-4 last:mb-0 cursor-pointer text-textSecondaryColor hover:text-darkGrade100 w-full"
              onClick={() => {
                setSelectedBusiness(business);
                let newPath =
                  pathName + '?businessVanityName' + business.vanity_name;
                if (searchParams?.has('visitorId')) {
                  newPath = '&visitorId=' + searchParams.get('visitorId');
                }

                router.push(newPath);
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
