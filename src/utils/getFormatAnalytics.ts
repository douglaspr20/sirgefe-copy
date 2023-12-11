import { MarketingSources, Analytics } from '@sirge-io/sirge-types';
import dayjs from 'dayjs';

function formatDate(date: string | Date) {
  return dayjs(date).format('MMMM DD');
}
export function Last7Days() {
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(formatDate(d));
  }
  return result;
}

const getPerformanceData = (data: Analytics) => {
  let allPlatformObject, facebookObject, tiktokObject;

  for (const performance of data?.performance || []) {
    if (performance?.source === MarketingSources.ALL) {
      const {
        conversion_rate: conversionRate,
        total_sales: totalSales,
        purchases: allPurchases,
        visits: allVisits,
        blended_roas: blendedRoas,
        average_order_value: averageOrderValue,
      } = performance;

      allPlatformObject = {
        daily: {
          conversion_rate: {
            daily_amount: conversionRate?.daily_amount,
            daily_percentage: conversionRate?.daily_percentage,
          },
          total_sales: {
            daily_amount: totalSales?.daily_amount,
            daily_percentage: totalSales?.daily_percentage,
          },
          purchases: {
            daily_amount: allPurchases?.daily_amount,
            daily_percentage: allPurchases?.daily_percentage,
          },
          visits: {
            daily_amount: allVisits?.daily_amount,
            daily_percentage: allVisits?.daily_percentage,
          },
          blended_roas: {
            daily_amount: blendedRoas?.daily_amount,
            daily_percentage: blendedRoas?.daily_percentage,
          },
          average_order_value: {
            daily_amount: averageOrderValue?.daily_amount,
            daily_percentage: averageOrderValue?.daily_percentage,
          },
        },
        weekly: {
          conversion_rate: {
            weekly_amount: conversionRate?.weekly_amount,
            weekly_percentage: conversionRate?.weekly_percentage,
          },
          total_sales: {
            weekly_amount: totalSales?.weekly_amount,
            weekly_percentage: totalSales?.weekly_percentage,
          },
          purchases: {
            weekly_amount: allPurchases?.weekly_amount,
            weekly_percentage: allPurchases?.weekly_percentage,
          },
          visits: {
            weekly_amount: allVisits?.weekly_amount,
            weekly_percentage: allVisits?.weekly_percentage,
          },
          blended_roas: {
            weekly_amount: blendedRoas?.weekly_amount,
            weekly_percentage: blendedRoas?.weekly_percentage,
          },
          average_order_value: {
            weekly_amount: averageOrderValue?.weekly_amount,
            weekly_percentage: averageOrderValue?.weekly_percentage,
          },
        },
        monthly: {
          conversion_rate: {
            monthly_amount: conversionRate?.monthly_amount,
            monthly_percentage: conversionRate?.monthly_percentage,
          },
          total_sales: {
            monthly_amount: totalSales?.monthly_amount,
            monthly_percentage: totalSales?.monthly_percentage,
          },
          purchases: {
            monthly_amount: allPurchases?.monthly_amount,
            monthly_percentage: allPurchases?.monthly_percentage,
          },
          visits: {
            monthly_amount: allVisits?.monthly_amount,
            monthly_percentage: allVisits?.monthly_percentage,
          },
          blended_roas: {
            monthly_amount: blendedRoas?.monthly_amount,
            monthly_percentage: blendedRoas?.monthly_percentage,
          },
          average_order_value: {
            monthly_amount: averageOrderValue?.monthly_amount,
            monthly_percentage: averageOrderValue?.monthly_percentage,
          },
        },
      };
    }

    if (performance?.source === MarketingSources.FACEBOOK) {
      const {
        amount_spent: fbAmountSpent,
        purchases: fbPurchases,
        ad_clicks: fbAdClicks,
        roas: fbRoas,
        cost_per_purchase: fbCostPerPurchase,
        visits: fbVisits,
        total_conversion_value: fbTotalConversionValue,
      } = performance;

      facebookObject = {
        daily: {
          amount_spent: {
            daily_amount: fbAmountSpent?.daily_amount,
            daily_percentage: fbAmountSpent?.daily_percentage,
          },
          ad_clicks: {
            daily_amount: fbAdClicks?.daily_amount,
            daily_percentage: fbAdClicks?.daily_percentage,
          },
          total_conversion_value: {
            daily_amount: fbTotalConversionValue?.daily_amount,
            daily_percentage: fbTotalConversionValue?.daily_percentage,
          },
          roas: {
            daily_amount: fbRoas?.daily_amount,
            daily_percentage: fbRoas?.daily_percentage,
          },
          cost_per_purchase: {
            daily_amount: fbCostPerPurchase?.daily_amount,
            daily_percentage: fbCostPerPurchase?.daily_percentage,
          },
          purchases: {
            daily_amount: fbPurchases?.daily_amount,
            daily_percentage: fbPurchases?.daily_percentage,
          },
          visits: {
            daily_amount: fbVisits?.daily_amount,
            daily_percentage: fbVisits?.daily_percentage,
          },
        },
        weekly: {
          amount_spent: {
            weekly_amount: fbAmountSpent?.weekly_amount,
            weekly_percentage: fbAmountSpent?.weekly_percentage,
          },
          ad_clicks: {
            weekly_amount: fbAdClicks?.weekly_amount,
            weekly_percentage: fbAdClicks?.weekly_percentage,
          },
          total_conversion_value: {
            weekly_amount: fbTotalConversionValue?.weekly_amount,
            weekly_percentage: fbTotalConversionValue?.weekly_percentage,
          },
          roas: {
            weekly_amount: fbRoas?.weekly_amount,
            weekly_percentage: fbRoas?.weekly_percentage,
          },
          cost_per_purchase: {
            weekly_amount: fbCostPerPurchase?.weekly_amount,
            weekly_percentage: fbCostPerPurchase?.weekly_percentage,
          },
          purchases: {
            weekly_amount: fbPurchases?.weekly_amount,
            weekly_percentage: fbPurchases?.weekly_percentage,
          },
          visits: {
            weekly_amount: fbVisits?.weekly_amount,
            weekly_percentage: fbVisits?.weekly_percentage,
          },
        },
        monthly: {
          amount_spent: {
            monthly_amount: fbAmountSpent?.monthly_amount,
            monthly_percentage: fbAmountSpent?.monthly_percentage,
          },
          ad_clicks: {
            monthly_amount: fbAdClicks?.monthly_amount,
            monthly_percentage: fbAdClicks?.monthly_percentage,
          },
          total_conversion_value: {
            monthly_amount: fbTotalConversionValue?.monthly_amount,
            monthly_percentage: fbTotalConversionValue?.monthly_percentage,
          },
          roas: {
            monthly_amount: fbRoas?.monthly_amount,
            monthly_percentage: fbRoas?.monthly_percentage,
          },
          cost_per_purchase: {
            monthly_amount: fbCostPerPurchase?.monthly_amount,
            monthly_percentage: fbCostPerPurchase?.monthly_percentage,
          },
          purchases: {
            monthly_amount: fbPurchases?.monthly_amount,
            monthly_percentage: fbPurchases?.monthly_percentage,
          },
          visits: {
            monthly_amount: fbVisits?.monthly_amount,
            monthly_percentage: fbVisits?.monthly_percentage,
          },
        },
      };
    }

    if (performance?.source === MarketingSources.TIKTOK) {
      const {
        amount_spent: tkAmountSpent,
        purchases: tkPurchases,
        ad_clicks: tkAdClicks,
        roas: tkRoas,
        cost_per_purchase: tkCostPerPurchase,
        visits: tkVisits,
        total_conversion_value: tkTotalConversionValue,
      } = performance;

      tiktokObject = {
        daily: {
          amount_spent: {
            daily_amount: tkAmountSpent?.daily_amount,
            daily_percentage: tkAmountSpent?.daily_percentage,
          },
          ad_clicks: {
            daily_amount: tkAdClicks?.daily_amount,
            daily_percentage: tkAdClicks?.daily_percentage,
          },
          total_conversion_value: {
            daily_amount: tkTotalConversionValue?.daily_amount,
            daily_percentage: tkTotalConversionValue?.daily_percentage,
          },
          roas: {
            daily_amount: tkRoas?.daily_amount,
            daily_percentage: tkRoas?.daily_percentage,
          },
          cost_per_purchase: {
            daily_amount: tkCostPerPurchase?.daily_amount,
            daily_percentage: tkCostPerPurchase?.daily_percentage,
          },
          purchases: {
            daily_amount: tkPurchases?.daily_amount,
            daily_percentage: tkPurchases?.daily_percentage,
          },
          visits: {
            daily_amount: tkVisits?.daily_amount,
            daily_percentage: tkVisits?.daily_percentage,
          },
        },
        weekly: {
          amount_spent: {
            weekly_amount: tkAmountSpent?.weekly_amount,
            weekly_percentage: tkAmountSpent?.weekly_percentage,
          },
          ad_clicks: {
            weekly_amount: tkAdClicks?.weekly_amount,
            weekly_percentage: tkAdClicks?.weekly_percentage,
          },
          total_conversion_value: {
            weekly_amount: tkTotalConversionValue?.weekly_amount,
            weekly_percentage: tkTotalConversionValue?.weekly_percentage,
          },
          roas: {
            weekly_amount: tkRoas?.weekly_amount,
            weekly_percentage: tkRoas?.weekly_percentage,
          },
          cost_per_purchase: {
            weekly_amount: tkCostPerPurchase?.weekly_amount,
            weekly_percentage: tkCostPerPurchase?.weekly_percentage,
          },
          purchases: {
            weekly_amount: tkPurchases?.weekly_amount,
            weekly_percentage: tkPurchases?.weekly_percentage,
          },
          visits: {
            weekly_amount: tkVisits?.weekly_amount,
            weekly_percentage: tkVisits?.weekly_percentage,
          },
        },
        monthly: {
          amount_spent: {
            monthly_amount: tkAmountSpent?.monthly_amount,
            monthly_percentage: tkAmountSpent?.monthly_percentage,
          },
          ad_clicks: {
            monthly_amount: tkAdClicks?.monthly_amount,
            monthly_percentage: tkAdClicks?.monthly_percentage,
          },
          total_conversion_value: {
            monthly_amount: tkTotalConversionValue?.monthly_amount,
            monthly_percentage: tkTotalConversionValue?.monthly_percentage,
          },
          roas: {
            monthly_amount: tkRoas?.monthly_amount,
            monthly_percentage: tkRoas?.monthly_percentage,
          },
          cost_per_purchase: {
            monthly_amount: tkCostPerPurchase?.monthly_amount,
            monthly_percentage: tkCostPerPurchase?.monthly_percentage,
          },
          purchases: {
            monthly_amount: tkPurchases?.monthly_amount,
            monthly_percentage: tkPurchases?.monthly_percentage,
          },
          visits: {
            monthly_amount: tkVisits?.monthly_amount,
            monthly_percentage: tkVisits?.monthly_percentage,
          },
        },
      };
    }
  }

  return { allPlatformObject, facebookObject, tiktokObject };
};

const getChartData = (data: Analytics) => {
  const { monthly_budget, roas_goals, performance } = data;
  let allPlatformChart, facebookChart, tiktokChart;
  for (const performanceData of performance || []) {
    if (performanceData?.source === MarketingSources.ALL) {
      allPlatformChart = {
        customerActivities: {
          ad_clicks: performanceData?.ad_clicks?.all_amounts,
          purchases: performanceData?.purchases?.all_amounts,
          visits: performanceData?.visits?.all_amounts,
        },
        spendAndSales: {
          amount_spent: performanceData?.amount_spent?.all_amounts,
          total_sales: performanceData?.total_sales?.all_amounts,
        },
      };
    }

    if (performanceData?.source === MarketingSources.FACEBOOK) {
      facebookChart = {
        customerActivities: {
          ad_clicks: performanceData?.ad_clicks?.all_amounts,
          purchases: performanceData?.purchases?.all_amounts,
          visits: performanceData?.visits?.all_amounts,
        },
        spendAndSales: {
          amount_spent: performanceData?.amount_spent?.all_amounts,
          total_conversion_value:
            performanceData?.total_conversion_value?.all_amounts,
        },
      };
    }

    if (performanceData?.source === MarketingSources.TIKTOK) {
      tiktokChart = {
        customerActivities: {
          ad_clicks: performanceData?.ad_clicks?.all_amounts,
          purchases: performanceData?.purchases?.all_amounts,
          visits: performanceData?.visits?.all_amounts,
        },
        spendAndSales: {
          amount_spent: performanceData?.amount_spent?.all_amounts,
          total_conversion_value:
            performanceData?.total_conversion_value?.all_amounts,
        },
      };
    }
  }
  return {
    monthly_budget,
    roas_goals,
    allPlatformChart,
    facebookChart,
    tiktokChart,
  };
};

const returnPerforming = (data: string | any[], type: MarketingSources) => {
  const result = [];
  if (data?.length === 0) {
    return [];
  }
  for (const item of data) {
    if (type === MarketingSources.ALL) {
      if (item?.source_view === MarketingSources.ALL) {
        result.push(item);
      }
    }
    if (type === MarketingSources.FACEBOOK) {
      if (item?.source === MarketingSources.FACEBOOK && !item?.source_view) {
        result.push(item);
      }
    }

    if (type === MarketingSources.TIKTOK) {
      if (item?.source === MarketingSources.TIKTOK && !item?.source_view) {
        result.push(item);
      }
    }
  }

  return result;
};

const getBestPerforming = (data: Analytics) => {
  const { best_performing } = data;

  if (!best_performing) {
    return {
      campaigns: {
        daily: [],
        weekly: [],
        monthly: [],
      },
      adsets: {
        daily: [],
        weekly: [],
        monthly: [],
      },
      ads: {
        daily: [],
        weekly: [],
        monthly: [],
      },
    };
  }

  const allData = {
    campaigns: {
      daily: returnPerforming(
        best_performing?.campaigns?.daily,
        MarketingSources.ALL,
      ),
      weekly: returnPerforming(
        best_performing?.campaigns?.weekly,
        MarketingSources.ALL,
      ),
      monthly: returnPerforming(
        best_performing?.campaigns?.monthly,
        MarketingSources.ALL,
      ),
    },
    adsets: {
      daily: returnPerforming(
        best_performing?.adsets?.daily,
        MarketingSources.ALL,
      ),
      weekly: returnPerforming(
        best_performing?.adsets?.weekly,
        MarketingSources.ALL,
      ),
      monthly: returnPerforming(
        best_performing?.adsets?.monthly,
        MarketingSources.ALL,
      ),
    },
    ads: {
      daily: returnPerforming(
        best_performing?.ads?.daily,
        MarketingSources.ALL,
      ),
      weekly: returnPerforming(
        best_performing?.ads?.weekly,
        MarketingSources.ALL,
      ),
      monthly: returnPerforming(
        best_performing?.ads?.monthly,
        MarketingSources.ALL,
      ),
    },
  };

  const facebookData = {
    campaigns: {
      daily: returnPerforming(
        best_performing?.campaigns?.daily,
        MarketingSources.FACEBOOK,
      ),
      weekly: returnPerforming(
        best_performing?.campaigns?.weekly,
        MarketingSources.FACEBOOK,
      ),
      monthly: returnPerforming(
        best_performing?.campaigns?.monthly,
        MarketingSources.FACEBOOK,
      ),
    },
    adsets: {
      daily: returnPerforming(
        best_performing?.adsets?.daily,
        MarketingSources.FACEBOOK,
      ),
      weekly: returnPerforming(
        best_performing?.adsets?.weekly,
        MarketingSources.FACEBOOK,
      ),
      monthly: returnPerforming(
        best_performing?.adsets?.monthly,
        MarketingSources.FACEBOOK,
      ),
    },
    ads: {
      daily: returnPerforming(
        best_performing?.ads?.daily,
        MarketingSources.FACEBOOK,
      ),
      weekly: returnPerforming(
        best_performing?.ads?.weekly,
        MarketingSources.FACEBOOK,
      ),
      monthly: returnPerforming(
        best_performing?.ads?.monthly,
        MarketingSources.FACEBOOK,
      ),
    },
  };

  const tiktokData = {
    campaigns: {
      daily: returnPerforming(
        best_performing?.campaigns?.daily,
        MarketingSources.TIKTOK,
      ),
      weekly: returnPerforming(
        best_performing?.campaigns?.weekly,
        MarketingSources.TIKTOK,
      ),
      monthly: returnPerforming(
        best_performing?.campaigns?.monthly,
        MarketingSources.TIKTOK,
      ),
    },
    adsets: {
      daily: returnPerforming(
        best_performing?.adsets?.daily,
        MarketingSources.TIKTOK,
      ),
      weekly: returnPerforming(
        best_performing?.adsets?.weekly,
        MarketingSources.TIKTOK,
      ),
      monthly: returnPerforming(
        best_performing?.adsets?.monthly,
        MarketingSources.TIKTOK,
      ),
    },
    ads: {
      daily: returnPerforming(
        best_performing?.ads?.daily,
        MarketingSources.TIKTOK,
      ),
      weekly: returnPerforming(
        best_performing?.ads?.weekly,
        MarketingSources.TIKTOK,
      ),
      monthly: returnPerforming(
        best_performing?.ads?.monthly,
        MarketingSources.TIKTOK,
      ),
    },
  };

  return { allData, facebookData, tiktokData };
};

export const analyticsData = (data: Analytics) => {
  if (!data) {
    return {
      allPlatforms: null,
      facebook: null,
      tiktok: null,
    };
  }

  const { allPlatformObject, facebookObject, tiktokObject } =
    getPerformanceData(data);

  const {
    monthly_budget,
    roas_goals,
    allPlatformChart,
    facebookChart,
    tiktokChart,
  } = getChartData(data);

  const { allData, facebookData, tiktokData } = getBestPerforming(data);

  return {
    allPlatforms: {
      business_id: data?.business_id,
      daily: {
        performing_product: data?.performing_product?.daily,
        best_performing: {
          ad_sets: allData?.adsets?.daily,
          ads: allData?.ads?.daily,
          campaigns: allData?.campaigns?.daily,
        },
        performance: allPlatformObject?.daily,
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: allPlatformChart?.customerActivities,
          spendAndSales: allPlatformChart?.spendAndSales,
        },
      },
      weekly: {
        performing_product: data?.performing_product?.weekly,
        best_performing: {
          ad_sets: allData?.adsets?.weekly,
          ads: allData?.ads?.weekly,
          campaigns: allData?.campaigns?.weekly,
        },
        performance: allPlatformObject?.weekly,
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: allPlatformChart?.customerActivities,
          spendAndSales: allPlatformChart?.spendAndSales,
        },
      },
      monthly: {
        performing_product: data?.performing_product?.monthly,
        best_performing: {
          ad_sets: allData?.adsets?.monthly,
          ads: allData?.ads?.monthly,
          campaigns: allData?.campaigns?.monthly,
        },
        performance: allPlatformObject?.monthly,
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: allPlatformChart?.customerActivities,
          spendAndSales: allPlatformChart?.spendAndSales,
        },
      },
    },
    facebook: {
      daily: {
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: facebookChart?.customerActivities,
          spendAndSales: facebookChart?.spendAndSales,
        },
        best_performing: {
          ad_sets: facebookData?.adsets?.daily,
          ads: facebookData?.ads?.daily,
          campaigns: facebookData?.campaigns?.daily,
        },
        performance: facebookObject?.daily,
      },
      weekly: {
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: facebookChart?.customerActivities,
          spendAndSales: facebookChart?.spendAndSales,
        },
        performance: facebookObject?.weekly,
        best_performing: {
          ad_sets: facebookData?.adsets?.weekly,
          ads: facebookData?.ads?.weekly,
          campaigns: facebookData?.campaigns?.weekly,
        },
      },
      monthly: {
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: facebookChart?.customerActivities,
          spendAndSales: facebookChart?.spendAndSales,
        },
        performance: facebookObject?.monthly,
        best_performing: {
          ad_sets: facebookData?.adsets?.monthly,
          ads: facebookData?.ads?.monthly,
          campaigns: facebookData?.campaigns?.monthly,
        },
      },
    },
    tiktok: {
      daily: {
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: tiktokChart?.customerActivities,
          spendAndSales: tiktokChart?.spendAndSales,
        },
        best_performing: {
          ad_sets: tiktokData?.adsets?.daily,
          ads: tiktokData?.ads?.daily,
          campaigns: tiktokData?.campaigns?.daily,
        },
        performance: tiktokObject?.daily,
      },
      weekly: {
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: tiktokChart?.customerActivities,
          spendAndSales: tiktokChart?.spendAndSales,
        },
        performance: tiktokObject?.weekly,
        best_performing: {
          ad_sets: tiktokData?.adsets?.weekly,
          ads: tiktokData?.ads?.weekly,
          campaigns: tiktokData?.campaigns?.weekly,
        },
      },
      monthly: {
        chartData: {
          monthly_budget,
          roas_goals,
          labelsLastSevenDays: Last7Days().reverse(),
          customerActivities: tiktokChart?.customerActivities,
          spendAndSales: tiktokChart?.spendAndSales,
        },
        performance: tiktokObject?.monthly,
        best_performing: {
          ad_sets: tiktokData?.adsets?.monthly,
          ads: tiktokData?.ads?.monthly,
          campaigns: tiktokData?.campaigns?.monthly,
        },
      },
    },
  };
};
