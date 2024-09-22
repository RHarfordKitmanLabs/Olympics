import { medalsPositions } from "@consts";
import type {
  AthleteType,
  GroupMedalTotalsByCountryAndAthlete,
  MedalCount,
} from "@types";
import type { FiltersType } from "@views/OlympicResults/components/Filters/types";
import { defaultMedalCount } from "./consts";

export const sortAthletesEventsByMedals = (
  athletesEventsToSort: AthleteType[]
): AthleteType[] =>
  athletesEventsToSort.sort(
    (a: AthleteType, b: AthleteType) =>
      medalsPositions.indexOf(a.medal) - medalsPositions.indexOf(b.medal)
  );

export const groupMedalTotalsByCountryAndAthlete = (
  athletesToGroupByCountryAndAthlete: AthleteType[]
): GroupMedalTotalsByCountryAndAthlete =>
  athletesToGroupByCountryAndAthlete.reduce(
    (
      accumulator: GroupMedalTotalsByCountryAndAthlete,
      { country, athlete, medal }: AthleteType
    ) => {
      const medalType = medal.toLocaleLowerCase() as keyof MedalCount;

      // Initialize Country if not present
      if (!accumulator[country]) {
        accumulator[country] = {
          ...defaultMedalCount,
          athletes: {},
        };
      }

      // Initialize athlete if not present
      if (!accumulator[country].athletes[athlete]) {
        accumulator[country].athletes[athlete] = {
          athlete,
          ...defaultMedalCount,
        };
      }

      // Update country and athlete's medal counts
      accumulator[country][medalType] += 1;
      accumulator[country].total += 1;
      accumulator[country].athletes[athlete][medalType] += 1;
      accumulator[country].athletes[athlete].total += 1;

      return accumulator;
    },
    {} as GroupMedalTotalsByCountryAndAthlete
  );

export const filterAthletes = (
  itemsToFilter: AthleteType[],
  {
    country: allowedCountries = [],
    medal: allowedMedals = [],
    event: allowedEvents = [],
    searchTerm = "",
  }: FiltersType
): AthleteType[] =>
  itemsToFilter.filter(
    ({ athlete, country, event, medal }) =>
      (!searchTerm ||
        athlete.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!allowedCountries.length || allowedCountries.includes(country)) &&
      (!allowedEvents.length || allowedEvents.includes(event)) &&
      (!allowedMedals.length || allowedMedals.includes(medal))
  );
