import {
  DeliveryMethod,
  LogSeverity,
  shopifyApi,
  LATEST_API_VERSION,
} from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

const isDev = process.env.NODE_ENV === 'development';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: [process.env.SHOPIFY_API_SCOPES!],
  hostName: process.env.SHOPIFY_APP_URL!.replace(/https:\/\//, ''),
  hostScheme: 'https',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  logger: { level: isDev ? LogSeverity.Debug : LogSeverity.Info },
});

// shopify.webhooks.addHandlers({
//   APP_UNINSTALLED: {
//     deliveryMethod: DeliveryMethod.Http,
//     callbackUrl: `${process.env.SHOPIFY_WEBHOOK_URL}`,
//   },
//   SHOP_UPDATE: {
//     deliveryMethod: DeliveryMethod.Http,
//     callbackUrl: `${process.env.SHOPIFY_WEBHOOK_URL}`,
//   },
//   APP_SUBSCRIPTIONS_UPDATE: {
//     deliveryMethod: DeliveryMethod.Http,
//     callbackUrl: `${process.env.SHOPIFY_WEBHOOK_URL}/`,
//   },
// });

export const createShopifyWebhooks = async (
  shop: string,
  access_tokne: string,
) => {
  try {
    const webhookTopics = [
      'app/uninstalled',
      'shop/update',
      'app_subscriptions/update',
    ];
    let webhookEndpoints = {
      'app/uninstalled': `${process.env.NEXT_PUBLIC_APP_URL}/api/s/webhooks/app_uninstalled`,
      'shop/update': `${process.env.NEXT_PUBLIC_APP_URL}/api/s/webhooks/shop_update`,
      'app_subscriptions/update': `${process.env.NEXT_PUBLIC_APP_URL}/api/s/webhooks/app_subscription_update`,
    };

    if (process.env.NEXT_PUBLIC_METERED_BILLING_STATUS === 'active') {
      webhookEndpoints = {
        'app/uninstalled': `${process.env.SHOPIFY_WEBHOOK_URL}`,
        'shop/update': `${process.env.SHOPIFY_WEBHOOK_URL}`,
        'app_subscriptions/update': `${process.env.SHOPIFY_WEBHOOK_URL}`,
      };
    }

    for (const topic of webhookTopics) {
      const res = await fetch(
        `https://${shop}/admin/api/${LATEST_API_VERSION}/webhooks.json`,
        {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': access_tokne,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            webhook: {
              topic,
              address: webhookEndpoints[topic as keyof typeof webhookEndpoints],
              format: 'json',
            },
          }),
        },
      );
      const data = await res.json();
      console.log('data', data);
    }
  } catch (error) {
    console.log('Error when creating webhook: ', error);
  }
};

export default shopify;
