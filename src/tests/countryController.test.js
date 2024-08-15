import { getCountries } from "../controllers/countryController.js";
import * as calendarificService from "../services/calendarificService.js";
import * as cacheService from "../services/cacheService.js";

jest.mock("../services/calendarificService.js");
jest.mock("../services/cacheService.js");

describe("Country Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return countries from the cache if available", async () => {
    const req = {};
    const res = { json: jest.fn() };
    const cachedData = [{ name: "Pakistan", iso: "PAK" }];

    cacheService.getCachedData.mockReturnValue(cachedData);

    await getCountries(req, res);

    expect(cacheService.getCachedData).toHaveBeenCalledWith("countries");
    expect(res.json).toHaveBeenCalledWith(cachedData);
  });

  it("should fetch countries from the API if not cached", async () => {
    const req = {};
    const res = { json: jest.fn() };
    const fetchedData = [{ name: "Pakistan", iso: "PAK" }];

    cacheService.getCachedData.mockReturnValue(null);
    calendarificService.fetchCountries.mockResolvedValue(fetchedData);

    await getCountries(req, res);

    expect(calendarificService.fetchCountries).toHaveBeenCalled();
    expect(cacheService.setCachedData).toHaveBeenCalledWith(
      "countries",
      fetchedData
    );
    expect(res.json).toHaveBeenCalledWith(fetchedData);
  });

  it("should return a 500 error if the API call fails", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    cacheService.getCachedData.mockReturnValue(null);
    calendarificService.fetchCountries.mockRejectedValue(
      new Error("API Error")
    );

    await getCountries(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch countries from Calendarific API",
    });
  });
});
