import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import React, { useState } from 'react';

interface Props {
  setSearchResults: React.Dispatch<React.SetStateAction<any>>;
}

const BusinessSearchBar = ({ setSearchResults }: Props) => {
  const [value, setValue] = useState('');
  const { businessList } = useBusinessProfileContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const query = e.target.value?.toLowerCase();
    const BusinessList = businessList;

    const filteredBusinesses = BusinessList.filter((business: any) =>
      business.business_name.toLowerCase().includes(query),
    );
    setSearchResults(filteredBusinesses);
  };

  const clearSearchInput = () => {
    setSearchResults(null);
    setValue('');
  };

  return (
    <div className="w-full flex mb-4">
      <input
        className="w-full search-input"
        type="text"
        placeholder="Search Businesses"
        onChange={(e) => {
          handleChange(e);
        }}
        value={value}
      />
      {value?.length !== 0 && (
        <div
          className="bg-greyLight transition-all flex items-center pr-2"
          style={{
            width: '5%',
          }}
        >
          <div
            className="cursor-pointer"
            id=""
            onClick={() => {
              clearSearchInput();
            }}
            style={{
              width: '15px',
              height: '15px',
            }}
          >
            <i className="fas fa-times-circle"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessSearchBar;
