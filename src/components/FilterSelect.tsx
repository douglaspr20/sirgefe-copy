import React, { FC } from 'react';
type Select = {
  name?: string;
  dateRange: string;
  handleDateRangeChange: React.ChangeEventHandler<HTMLSelectElement>;
};
const SelectFilter: FC<Select> = ({
  name,
  dateRange,
  handleDateRangeChange,
}) => {
  return (
    <select
      name={name}
      value={dateRange}
      onChange={handleDateRangeChange}
      className="select light"
    >
      <option value="daily">Today</option>
      <option value="weekly">Last 7 days</option>
      <option value="monthly">Last 30 days</option>
    </select>
  );
};

export default SelectFilter;
