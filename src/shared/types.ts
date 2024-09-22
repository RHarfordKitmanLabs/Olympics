import { competitions, medalsPositions, placedCountries } from "@consts";

export type Competition = (typeof competitions)[number];

export type MedalPostion = (typeof medalsPositions)[number];

export type Country = (typeof placedCountries)[number];

type Sex = "Men" | "Women" | "Transgender";

export type AthleteType = {
  athlete: string;
  country: Country;
  sex: Sex;
  event: Competition;
  medal: MedalPostion;
};

export type MedalCount = {
  bronze: number;
  silver: number;
  gold: number;
  total: number;
};

export type AthleteMedalCount = {
  athlete: string;
} & MedalCount;

export type CountryMedalTotals = MedalCount & {
  athletes: {
    [athlete: string]: AthleteMedalCount;
  };
};

export type GroupMedalTotalsByCountryAndAthlete = {
  [country in Country]: CountryMedalTotals;
};
