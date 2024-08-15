import { getHolidays } from "../controllers/holidayController.js";
import * as calendarificService from "../services/calendarificService.js";
import * as cacheService from "../services/cacheService.js";

jest.mock("../services/calendarificService.js");
jest.mock("../services/cacheService.js");

describe("Holiday Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return holidays from the cache if available", async () => {
    const req = { query: { country: "PAK", year: "2024" } };
    const res = { json: jest.fn() };
    const cachedData = [{ name: "New Year", date: "2024-01-01" }];

    cacheService.getCachedData.mockReturnValue(cachedData);

    await getHolidays(req, res);

    expect(cacheService.getCachedData).toHaveBeenCalledWith(
      "PAK_2024_holidays"
    );
    expect(res.json).toHaveBeenCalledWith(cachedData);
  });

  it("should fetch holidays from the API if not cached", async () => {
    const req = { query: { country: "PAK", year: "2024" } };
    const res = { json: jest.fn() };
    const fetchedData = [{ name: "New Year", date: "2024-01-01" }];

    cacheService.getCachedData.mockReturnValue(null);
    calendarificService.fetchHolidays.mockResolvedValue(fetchedData);

    await getHolidays(req, res);

    expect(calendarificService.fetchHolidays).toHaveBeenCalledWith(
      "PAK",
      "2024"
    );
    expect(cacheService.setCachedData).toHaveBeenCalledWith(
      "PAK_2024_holidays",
      fetchedData
    );
    expect(res.json).toHaveBeenCalledWith(fetchedData);
  });

  it("should return a 500 error if the API call fails", async () => {
    const req = { query: { country: "PAK", year: "2024" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    cacheService.getCachedData.mockReturnValue(null);
    calendarificService.fetchHolidays.mockRejectedValue(new Error("API Error"));

    await getHolidays(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch holidays from Calendarific API",
    });
  });
});
