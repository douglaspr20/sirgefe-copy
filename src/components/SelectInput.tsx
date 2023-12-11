import Image from 'next/image';
import { useState } from 'react';

interface Props {
  className?: string;
  options?: Item[];
  onSelect?: (item: Item) => void;
  placeholder?: string;
}

type Item = {
  name: string;
  value: string;
};

const SelectInput = ({ className, options, onSelect, placeholder }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="dropdown relative cursor-pointer">
      <div
        className="inline-flex items-center dropdown-toggle"
        id="selectInputDropDown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div
          className={` ${
            selectedItem ? 'text-gray-700' : 'text-textTeriraryColor'
          } inline-flex bg-gray-500 rounded-md border border-greyLight border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${className}`}
        >
          {selectedItem?.name ?? placeholder ?? ''}
        </div>
        <Image
          className="relative right-5"
          src="/images/chevron-down.svg"
          alt="dropdown"
          width={12}
          height={12}
        />
      </div>
      <ul
        className={`dropdown-menu flex flex-col min-w-[185px] absolute pr-7 hidden pt-1 pb-1 bg-white widget-container rounded-lg border border-extraLightColor max-h-96 overflow-x-auto ${className}`}
        aria-labelledby="selectInputDropDown"
      >
        <div className="text-justify">
          {options?.map((item) => (
            <li
              key={item.value}
              className="dropdown-menu__item p-3 hover:text-primaryColor "
              onClick={() => {
                if (onSelect) {
                  setSelectedItem(item);
                  onSelect(item);
                }
              }}
            >
              {item.name}
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default SelectInput;
