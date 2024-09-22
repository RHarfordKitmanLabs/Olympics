import { Header } from "@shared/components/CollapsibleTable/types";

const olympicResultsHeaders: Header[] = [
  { label: "Country", key: "country" },
  { label: "Gold", key: "gold" },
  { label: "Silver", key: "silver" },
  { label: "Bronze", key: "bronze" },
  { label: "Total", key: "total" },
];

const olympicResultsChildrenHeaders: Header[] = [
  { label: "Name", key: "athlete" },
  { label: "Gold", key: "gold" },
  { label: "Silver", key: "silver" },
  { label: "Bronze", key: "bronze" },
  { label: "Total", key: "total" },
];

const defaultMedalCount = {
  gold: 0,
  silver: 0,
  bronze: 0,
  total: 0,
} as const;

const loadingText = "Loading Olympic results...";
const errorText = "Theres been an error, please contact us!";

export {
  loadingText,
  errorText,
  defaultMedalCount,
  olympicResultsHeaders,
  olympicResultsChildrenHeaders,
};
