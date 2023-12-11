import React, { FC } from 'react';
import { typeValues } from '@utils/format';
import { capitalizeWords } from '../modules/capitalizeWords';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>;
  period: string;
  analytics? : boolean;
}

const SelectPeriod: FC<Props> = ({ onChange, period, analytics=false }) => {
  const options = Object.keys(typeValues(analytics)).map((option) => ({
    value: option,
    label: capitalizeWords(option.replace(/_/g, ' ')),
  }));

  return (
    <select className="select light" onChange={onChange} value={period}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectPeriod;
