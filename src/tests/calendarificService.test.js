import axios from "axios";
import {
  fetchHolidays,
  fetchCountries,
} from "../services/calendarificService.js";
import config from "../config/index.js";

jest.mock("axios");

describe("Calendarific Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch holidays for a specific country and year", async () => {
    const responseData = {
      response: {
        holidays: [{ name: "New Year", date: "2024-01-01" }],
      },
    };

    axios.get.mockResolvedValue({ data: responseData });

    const holidays = await fetchHolidays("PAK", "2024");

    expect(axios.get).toHaveBeenCalledWith(`${config.baseUrl}/holidays`, {
      params: {
        api_key: config.apiKey,
        country: "PAK",
        year: "2024",
      },
    });

    expect(holidays).toEqual(responseData.response.holidays);
  });

  it("should fetch the list of supported countries", async () => {
    const responseData = {
      response: {
        countries: [{ name: "Pakistan", iso: "PAK" }],
      },
    };

    axios.get.mockResolvedValue({ data: responseData });

    const countries = await fetchCountries();

    expect(axios.get).toHaveBeenCalledWith(`${config.baseUrl}/countries`, {
      params: {
        api_key: config.apiKey,
      },
    });

    expect(countries).toEqual(responseData.response.countries);
  });

  it("should throw an error if fetching holidays fails", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    await expect(fetchHolidays("PAK", "2024")).rejects.toThrow("API Error");
  });

  it("should throw an error if fetching countries fails", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    await expect(fetchCountries()).rejects.toThrow("API Error");
  });
});
