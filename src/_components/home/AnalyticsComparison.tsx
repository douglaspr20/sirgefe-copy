import Link from 'next/link';
import React, { FC, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Placeholder from '@assets/img/Image_Placeholder_Day.svg';
import { formatMoneyWithDecimals } from '@utils/format';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import AnalyticsComparisonTooltip from './AnalyticsComparisonTooltip';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  name: string;
  id: string;
  status: string;
  total_amount_spent: number;
  purchases: string | number;
  images: string[];
  roas: string | number;
  source: string;
  impact?: number;
  comparation: string;
  total_conversion_value: number;
  comparisonIndex: number;
}

const AnalyticsComparison: FC<Props> = ({
  name,
  id,
  status,
  total_amount_spent,
  purchases,
  images,
  roas,
  source,
  impact,
  comparation,
  total_conversion_value,
  comparisonIndex,
}) => {
  const { userProfile, businessProfile, selectedBusiness } =
    useBusinessProfileContext();
  const carouselRef = useRef<Carousel>(null);

  const impactStars = new Array(4).fill(0).map((_, index) => {
    const colorClass =
      impact === 4
        ? 'text-greenDefault'
        : impact === 3
        ? 'text-primaryColor'
        : impact === 2
        ? 'text-yellowColor'
        : 'text-warningColor';
    const countStars = impact ? impact : 0;
    const isActive = index < countStars;
    const className = `icon-star ${
      isActive ? colorClass : `${colorClass} opacity-50`
    }`;
    return <i key={index} className={className}></i>;
  });
  const [comparasionImages, setComparasionImages] = useState([
    ...(images || []).flat(Infinity),
    ...Array(Math.max(4 - (images || []).length, 0)).fill(null),
  ]);
  const [stars, setStars] = useState(impactStars);

  useEffect(() => {
    setComparasionImages([
      ...(images || []).flat(Infinity),
      ...Array(Math.max(4 - (images || []).length, 0)).fill(null),
    ]);
    setStars(impactStars);
  }, [images]);

  const handleImageError = (index: number) => {
    setComparasionImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = Placeholder;
      return newImages;
    });
  };

  return (
    <div className="relative rounded-lg border border-extraLightColor p-3 max-h-[420px] select-none">
      <div
        className={` image-wrapper ${comparation !== 'ads' && 'carousel'}`}
        onMouseLeave={() => {
          if (carouselRef?.current) carouselRef.current.moveTo(0);
        }}
      >
        <div
          className={` ${
            comparation !== 'ads' ? 'flex' : 'grid'
          } mb-3 relative`}
        >
          <div className="inline-flex items-center backdrop-blur-sm bg-darkGrade100/50 text-white h-7 px-2 rounded absolute left-3 top-3 z-50">
            <span className="inline-flex font-medium text-xs ">{source}</span>
          </div>

          {comparation !== 'ads' && (
            <Carousel
              ref={carouselRef}
              showIndicators={false}
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              emulateTouch
              width={350}
              infiniteLoop={false}
            >
              {comparasionImages
                .slice(0, 4)
                .map((item: string, index: number) => (
                  <div
                    key={index}
                    className="aspect-square rounded-sm overflow-hidden"
                  >
                    <Image
                      src={item === null ? Placeholder : item}
                      alt={item || ''}
                      width={350}
                      height={350}
                      onError={() => handleImageError(index)}
                      className="object-cover carousel-image rounded-md"
                    />
                  </div>
                ))}
            </Carousel>
          )}

          {comparation === 'ads' &&
            comparasionImages.slice(0, 1).map((item: string, index: number) => (
              <div
                key={index}
                className="rounded-sm overflow-hidden flex justify-center"
              >
                <Image
                  src={item === null ? Placeholder : item}
                  alt={item || ''}
                  width={350}
                  height={330}
                  onError={() => handleImageError(index)}
                  className="object-cover  relative     comparison-image "
                />
              </div>
            ))}
        </div>

        <div className="items">
          <div className="mb-2 last:mb-0 flex justify-around items-start">
            <AnalyticsComparisonTooltip
              title="Status"
              status={status.toLocaleUpperCase()}
              tooltipTitle="Indicator for whether the status is on or off."
              anchorId={`#${comparisonIndex}-status`}
            />

            <AnalyticsComparisonTooltip
              title="Orders"
              value={purchases as string}
              tooltipTitle="Total number of orders that are attributed to the creative."
              anchorId={`#${comparisonIndex}-total-number-of-orders`}
            />
            <AnalyticsComparisonTooltip
              title="Impact"
              stars={stars}
              tooltipTitle="A proprietary scoring method based on ROAS and a number of other metrics."
              anchorId={`#${comparisonIndex}-roas-number`}
            />
          </div>

          <div className="mb-3 last:mb-0 flex justify-around items-start">
            <AnalyticsComparisonTooltip
              title="Ad Spend"
              value={formatMoneyWithDecimals(
                total_amount_spent,
                selectedBusiness?.currency as string,
              )}
              tooltipTitle="Total amount spent for the given period."
              anchorId={`#${comparisonIndex}-amount-spent`}
            />

            <AnalyticsComparisonTooltip
              title="ROAS"
              value={
                roas ? `${parseFloat(roas?.toString())?.toFixed(2)}X` : '0.00X'
              }
              tooltipTitle="Total amount spent / Total conversion value."
              anchorId={`#${comparisonIndex}-amount-spend-and-conversion-value`}
            />

            <AnalyticsComparisonTooltip
              title="TCV"
              value={formatMoneyWithDecimals(
                total_conversion_value,
                selectedBusiness?.currency as string,
              )}
              tooltipTitle="Combined value of all sales made."
              anchorId={`#${comparisonIndex}-all-sales`}
            />
          </div>
        </div>
      </div>

      <div className="mt-2   pt-3 border-t border-t-extraLightColor">
        <div className="text-base flex items-center justify-between">
          <Link
            passHref
            href={`/${
              businessProfile?.profile?.vanity_name
            }/performance/campaigns?id=${id}&type=${
              comparation === 'adsets' ? 'adSets' : comparation
            }`}
            legacyBehavior
          >
            <a
              target="_blank"
              className="text-base font-semibold truncate hover:underline hover:text-primaryColor hover:cursor-pointer"
            >
              {name}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsComparison;
