import React from 'react';
import Image from 'next/image';

const ShopifyBusinessSelected = () => {
  return (
    <div className="px-4 py-10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col"></div>
        <Image
          src="/images/checkmark-circle.svg"
          width={32}
          height={32}
          alt="tickcheckbox"
        />
        <h4>Business selected</h4>
        <span className="text-gray-400 opacity-70">
          Redirecting back to Shopify...
        </span>
      </div>
    </div>
  );
};

export default ShopifyBusinessSelected;
