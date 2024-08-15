import { fetchHolidays } from "../services/calendarificService.js";
import { getCachedData, setCachedData } from "../services/cacheService.js";

export const getHolidays = async (req, res) => {
  const { country, year } = req.query;
  const cacheKey = `${country}_${year}_holidays`;

  // Check if data is in cache
  let holidays = getCachedData(cacheKey);
  if (!holidays) {
    try {
      holidays = await fetchHolidays(country, year);
      setCachedData(cacheKey, holidays);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch holidays from Calendarific API" });
    }
  }

  return res.json(holidays);
};
