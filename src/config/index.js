import dotenv from "dotenv";

dotenv.config();

export default {
  apiKey: process.env.CALENDARIFIC_API_KEY,
  baseUrl: process.env.CALENDARIFIC_BASE_URL,
  cacheTTL: process.env.CACHE_TTL || 3600,
};
