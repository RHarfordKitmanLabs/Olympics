import {
  sortAthletesEventsByMedals,
  groupMedalTotalsByCountryAndAthlete,
  filterAthletes,
} from "@views/OlympicResults/utils";
import { expect, test, describe } from "vitest";
import mockAthleteData from "@services/api/athletes/mock-athlete-data";
import { AthleteType } from "@types";
import { defaultOlympicResultsFilters } from "@views/OlympicResults/components/Filters/consts";
import { defaultMedalCount } from "@views/OlympicResults/consts";

describe("utils", () => {
  test("sortAthletesEventsByMedals", () => {
    const bronzeMedalEvent: AthleteType = { ...mockAthleteData[0] };
    const silverMedalEvent: AthleteType = {
      ...mockAthleteData[0],
      event: "triple jump",
      medal: "Silver",
    };
    const goldMedalEvent: AthleteType = {
      ...mockAthleteData[0],
      event: "marathon",
      medal: "Gold",
    };

    expect(
      sortAthletesEventsByMedals([
        bronzeMedalEvent,
        silverMedalEvent,
        goldMedalEvent,
      ])
    ).toEqual([goldMedalEvent, silverMedalEvent, bronzeMedalEvent]);
  });

  test("groupMedalTotalsByCountryAndAthlete", () => {
    const kenAthlete1 = mockAthleteData[0].athlete;
    const ethAthlete1 = mockAthleteData[1].athlete;
    const ethAthlete2 = mockAthleteData[2].athlete;
    const groupMedalTotalsResult = {
      ETH: {
        ...defaultMedalCount,
        gold: 1,
        silver: 1,
        total: 2,
        athletes: {
          [ethAthlete1]: {
            ...defaultMedalCount,
            athlete: ethAthlete1,
            gold: 1,
            total: 1,
          },
          [ethAthlete2]: {
            ...defaultMedalCount,
            athlete: ethAthlete2,
            silver: 1,
            total: 1,
          },
        },
      },
      KEN: {
        ...defaultMedalCount,
        bronze: 1,
        total: 1,
        athletes: {
          [kenAthlete1]: {
            ...defaultMedalCount,
            athlete: kenAthlete1,
            bronze: 1,
            total: 1,
          },
        },
      },
    };

    expect(
      groupMedalTotalsByCountryAndAthlete(mockAthleteData.slice(0, 3))
    ).toEqual(groupMedalTotalsResult);
  });

  test("filterAthletes", () => {
    expect(
      filterAthletes(mockAthleteData.slice(0, 3), {
        ...defaultOlympicResultsFilters,
        searchTerm: "KOGO",
      })
    ).toEqual([mockAthleteData[0]]);
  });
});
