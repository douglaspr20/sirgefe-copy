import { PropertyNames } from '@utils/dynamic-query-builder-types';
import React from 'react';

const PropertyNamesLable = {
  property: 'Customer Who have',
  action: 'Customer Who did',
  in_not_in: 'Customers who are in/not in',
};

type CustomerTypeSegmentProps = {
  handleChange: (e: any) => void;
  properties: any;
};

const CustomerTypeSegment = ({
  handleChange,
  properties,
}: CustomerTypeSegmentProps) => {
  const newProperties = [
    {
      name: PropertyNames.CUSTOMER_WHO_HAVE,
      label: PropertyNamesLable[PropertyNames.CUSTOMER_WHO_HAVE],
    },
    {
      name: PropertyNames.CUSTOMER_WHO_DID,
      label: PropertyNamesLable[PropertyNames.CUSTOMER_WHO_DID],
    },
    {
      name: PropertyNames.CUSTOMER_WHO_ARE_IN_NOT_IN,
      label: PropertyNamesLable[PropertyNames.CUSTOMER_WHO_ARE_IN_NOT_IN],
    },
  ];

  return (
    <div className="pr-1 mr-4 relative after:content-[''] after:block after:absolute after:h-5 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
      <select
        id="select1"
        name="select1"
        className="border-none"
        onChange={handleChange}
      >
        {newProperties.map((property: any) => (
          <option key={property.name} value={property.name}>
            {property.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerTypeSegment;
