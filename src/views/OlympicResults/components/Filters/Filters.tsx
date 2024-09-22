import { TextField, Autocomplete, Stack } from "@mui/material";
import { medalsPositions, placedCountries, competitions } from "@consts";
import type { FilterProps } from "@views/OlympicResults/components/Filters/types";

const Filters = ({ setFilters, debounceHandleSearch }: FilterProps) => {
  return (
    <Stack justifyContent="center" direction="row" spacing={2}>
      <TextField
        id="filled-search"
        label="Search athletes"
        type="search"
        onChange={(e) => debounceHandleSearch(e.target.value)}
      />
      <Autocomplete
        disablePortal
        multiple
        /* TODO add to db */
        options={placedCountries}
        sx={{ width: 300 }}
        onChange={(e, values) =>
          setFilters((prev) => ({ ...prev, country: values }))
        }
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <Autocomplete
        disablePortal
        multiple
        /* TODO add to db */
        options={competitions}
        sx={{ width: 300 }}
        onChange={(e, values) =>
          setFilters((prev) => ({ ...prev, event: values }))
        }
        renderInput={(params) => <TextField {...params} label="Competitions" />}
      />

      <Autocomplete
        disablePortal
        multiple
        /* TODO add to db */
        options={medalsPositions}
        sx={{ width: 300 }}
        onChange={(e, values) =>
          setFilters((prev) => ({ ...prev, medal: values }))
        }
        renderInput={(params) => <TextField {...params} label="Medals" />}
      />
    </Stack>
  );
};
export default Filters;
