import { fetchCountries } from "../services/calendarificService.js";
import { getCachedData, setCachedData } from "../services/cacheService.js";

export const getCountries = async (req, res) => {
  const cacheKey = "countries";

  // Check if data is in cache
  let countries = getCachedData(cacheKey);
  if (!countries) {
    try {
      countries = await fetchCountries();
      setCachedData(cacheKey, countries);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch countries from Calendarific API" });
    }
  }

  return res.json(countries);
};
