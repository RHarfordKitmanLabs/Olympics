import { Dispatch, SetStateAction } from "react";

export interface FilterProps {
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  debounceHandleSearch: (searchTerm: string) => void;
}

export type FiltersType = {
  searchTerm: string;
  country: string[];
  event: string[];
  medal: string[];
};
