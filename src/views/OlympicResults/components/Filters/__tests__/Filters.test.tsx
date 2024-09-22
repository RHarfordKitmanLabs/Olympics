import { render, screen } from "@testing-library/react";
import { Filters } from "@views/OlympicResults/components";
import { renderTestWithUserEvent } from "@shared/testing-utils";
import { placedCountries, competitions, medalsPositions } from "@consts";
import { describe, test, vi, expect } from "vitest";

describe("filters", () => {
  const searchAthleteLabel = "Search athletes";
  const countryFilterLabel = "Country";
  const competitionFilterLabel = "Competitions";
  const medalFilterLabel = "Medals";

  const props = {
    setFilters: vi.fn(),
    debounceHandleSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Renders correctly", () => {
    render(<Filters {...props} />);
    expect(
      screen.getByRole("searchbox", { name: searchAthleteLabel })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: countryFilterLabel })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: competitionFilterLabel })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: medalFilterLabel })
    ).toBeInTheDocument();
  });

  test("renders the country options correctly", async () => {
    const { user } = renderTestWithUserEvent(<Filters {...props} />);

    await user.click(
      screen.getByRole("combobox", {
        name: countryFilterLabel,
      })
    );

    placedCountries.slice(0, 2).forEach((country: string) => {
      expect(screen.getByRole("option", { name: country })).toBeInTheDocument();
    });
  });

  test("renders the competition options correctly", async () => {
    const { user } = renderTestWithUserEvent(<Filters {...props} />);

    await user.click(
      screen.getByRole("combobox", {
        name: competitionFilterLabel,
      })
    );

    competitions.slice(0, 2).forEach((country: string) => {
      expect(screen.getByRole("option", { name: country })).toBeInTheDocument();
    });
  });

  test("renders the medal positions options correctly", async () => {
    const { user } = renderTestWithUserEvent(<Filters {...props} />);
    await user.click(
      screen.getByRole("combobox", {
        name: medalFilterLabel,
      })
    );

    medalsPositions.forEach((country: string) => {
      expect(screen.getByRole("option", { name: country })).toBeInTheDocument();
    });
  });

  test("calls debounceHandleSearch correctly", async () => {
    const { user } = renderTestWithUserEvent(<Filters {...props} />);
    await user.type(
      screen.getByRole("searchbox", { name: searchAthleteLabel }),
      "S"
    );
    expect(props.debounceHandleSearch).toHaveBeenCalledWith("S");
  });
});
