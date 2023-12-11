import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { optionsRadialBar } from '@utils/optionsChart';
import NoData from '@components/NoData';
import toolTipIcon from '@images/tooltip.svg';
import Image from 'next/image';
import Tooltip from '@components/Tooltip';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PerformingProductProps {
  title: string;
  amount: number;
  percentage: number;
  animationChart: boolean;
  currency: string;
}
interface PerformingProduct {
  animation: boolean;
  productList: object[];
  currency: string;
}
const PerformingProduct: FC<PerformingProductProps> = ({
  title,
  amount,
  percentage,
  animationChart,
  currency,
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-b-extraLightColor last:border-b-0 last:pb-0">
      <div className="inline-flex flex-col">
        <span className="text-textSecondaryColor">{title}</span>
        <span className="font-semibold text-textSecondaryColor">
          {Number(amount)?.toLocaleString('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="chart dot-top">
        <Chart
          options={optionsRadialBar(animationChart)}
          series={[percentage]}
          width={'38px'}
          height={38}
          type="radialBar"
        />
      </div>
    </div>
  );
};

const PerformingProducts: FC<PerformingProduct> = ({
  animation,
  productList,
  currency,
}) => {
  return (
    <div className="widget-container p-5 flex flex-col">
      <div className="text-textSecondaryColor font-semibold mb-1 flex items-center">
        Top Performing Products
        <div className="cursor-pointer ml-2" id="top-performing">
          <Image src={toolTipIcon} alt="tooltip-info" width={13} height={13} />
        </div>
        <Tooltip
          title="The top 5 products by revenue through your shopify store."
          anchorId="top-performing"
        />
      </div>
      {productList && productList.length > 0 ? (
        productList.map((item: any) => (
          <PerformingProduct
            animationChart={animation}
            currency={currency}
            key={item?.product_id}
            title={item?.name}
            percentage={item?.percentage ?? 0}
            amount={item?.totalPrice ?? 0}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default PerformingProducts;
