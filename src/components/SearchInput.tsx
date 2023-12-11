import React, { FC, SetStateAction } from 'react';
import Image from 'next/image';
interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

const SearchInput: FC<Props> = ({
  searchValue,
  setSearchValue,
  placeholder,
}) => {
  return (
    <div className="w-full  mt-3 flex mb-4  search-input white border border-borderLightColor">
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full  focus-visible:outline-0"
        placeholder={placeholder || `Search`}
        type="text"
        value={searchValue}
      />

      {searchValue?.length !== 0 && (
        <div
          className="bg-white transition-all flex items-center pr-2"
          style={{
            width: '5%',
          }}
        >
          <div
            className="cursor-pointer"
            id=""
            onClick={() => {
              setSearchValue('');
            }}
            style={{
              width: '15px',
              height: '15px',
            }}
          >
            <Image
              src="/images/close-icon.svg"
              width={16}
              height={16}
              alt="close"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
