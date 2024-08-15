import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour TTL

export const getCachedData = (key) => cache.get(key);

export const setCachedData = (key, data) => cache.set(key, data);
