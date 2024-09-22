import { GET_ATHLETES_URL } from "@services/api/athletes/get";
import { get as getAthletes } from "@services/api/athletes";
import mockAthleteData from "@services/api/athletes/mock-athlete-data";
import axios from "axios";
import { expect, test, vi } from "vitest";

describe("getAthletes ", () => {
  let request: any;
  beforeEach(() => {
    request = vi.spyOn(axios, "get");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("calls the correct endpoint and returns the correct value", async () => {
    const returnedData = await getAthletes();
    expect(returnedData).toEqual(mockAthleteData);
    expect(request).toHaveBeenCalledWith(GET_ATHLETES_URL);
  });
});
