import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { Filters } from "@views/OlympicResults/components";
import type { FiltersType } from "@views/OlympicResults/components/Filters/types";
import type {
  AthleteType,
  CountryMedalTotals,
  GroupMedalTotalsByCountryAndAthlete,
} from "@types";
import {
  groupMedalTotalsByCountryAndAthlete,
  filterAthletes,
} from "@views/OlympicResults/utils";
import { defaultOlympicResultsFilters } from "@views/OlympicResults/components/Filters/consts";
import { get as getAthletes } from "@services/api/athletes";
import CollapsibleTable from "@shared/components/CollapsibleTable/CollapsibleTable";
import {
  olympicResultsHeaders,
  olympicResultsChildrenHeaders,
  loadingText,
  errorText,
} from "@views/OlympicResults/consts";

function OlympicResults() {
  const [athletes, setAthletes] = useState<AthleteType[]>([]);
  const [groupedAthletes, setGroupedAthletes] =
    useState<GroupMedalTotalsByCountryAndAthlete>(
      {} as GroupMedalTotalsByCountryAndAthlete
    );
  const [filters, setFilters] = useState<FiltersType>(
    defaultOlympicResultsFilters
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search input
  const updateSearchFilter = debounce((searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  }, 400);

  // Fetch athletes data
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const result = await getAthletes();
        setAthletes(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchAthletes();
  }, []);

  // Group athletes by country and medals when filters change
  useEffect(() => {
    const filteredAthletes = filterAthletes(athletes, filters);
    const grouped = groupMedalTotalsByCountryAndAthlete(filteredAthletes);
    setGroupedAthletes(grouped);
  }, [athletes, filters]);

  if (loading) {
    return <div>{loadingText}</div>;
  }

  if (error) {
    return <div>{errorText}</div>;
  }

  return (
    <div className="App">
      <div className="Filters">
        <Filters
          setFilters={setFilters}
          debounceHandleSearch={updateSearchFilter}
        />
      </div>
      <CollapsibleTable
        headers={olympicResultsHeaders}
        childrenHeaders={olympicResultsChildrenHeaders}
        childrenTitle="Individual Medal Count"
        rows={Object.entries(groupedAthletes)
          .sort()
          .map(([country, data]: [string, CountryMedalTotals]) => ({
            ...data,
            id: country,
            country,
            children: Object.entries(data.athletes).map(([_, athleteData]) => ({
              ...athleteData,
              id: athleteData.athlete,
            })),
          }))}
      />
    </div>
  );
}

export default OlympicResults;
