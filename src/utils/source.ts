export const generateSourceName = (
  source: string | null | undefined,
  shopify_store_domain: string | null | undefined,
): string => {
  source = source || 'direct';
  shopify_store_domain = shopify_store_domain || '';
  if (shopify_store_domain.includes(source)) {
    source = 'direct';
  }
  return source;
};
