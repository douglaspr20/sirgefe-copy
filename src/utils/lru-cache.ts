import { LRUCache } from 'lru-cache';

export const ssrCache = new LRUCache({
  max: 3000, // max number of elements
  ttl: 1000 * 60 * 5, // cacht the data for five  minutes
});
