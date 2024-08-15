import axios from "axios";
import config from "../config/index.js";

export const fetchHolidays = async (country, year) => {
  const response = await axios.get(`${config.baseUrl}/holidays`, {
    params: {
      api_key: config.apiKey,
      country,
      year,
    },
  });
  return response.data.response.holidays;
};

export const fetchCountries = async () => {
  const response = await axios.get(`${config.baseUrl}/countries`, {
    params: {
      api_key: config.apiKey,
    },
  });
  return response.data.response.countries;
};
