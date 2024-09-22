import {
  server,
  HttpResponse,
  http,
} from "@services/mock-service-worker/server";
import { OlympicResults } from "@views";
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { GET_ATHLETES_URL } from "@services/api/athletes/get";
import mockAthleteData from "@services/api/athletes/mock-athlete-data";
import { renderTestWithUserEvent } from "@shared/testing-utils";
import {
  loadingText,
  errorText,
  olympicResultsHeaders,
} from "@views/OlympicResults/consts";

describe("OlympicResults", () => {
  beforeEach(() => {
    server.use(
      http.get(GET_ATHLETES_URL, () =>
        HttpResponse.json(mockAthleteData.slice(0, 3))
      )
    );
  });

  test("renders filters correctly", async () => {
    renderTestWithUserEvent(<OlympicResults />);
    await waitForElementToBeRemoved(() => screen.queryByText(loadingText));
    expect(
      screen.getByRole("searchbox", {
        name: "Search athletes",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", {
        name: "Country",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", {
        name: "Competitions",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", {
        name: "Medals",
      })
    ).toBeInTheDocument();
  });

  test("renders table headers correctly", async () => {
    renderTestWithUserEvent(<OlympicResults />);
    await waitForElementToBeRemoved(() => screen.queryByText(loadingText));
    olympicResultsHeaders.map(({ label }) => {
      expect(
        screen.getByRole("columnheader", {
          name: label,
        })
      ).toBeInTheDocument();
    });
  });

  test("renders table data correctly", async () => {
    const { user } = renderTestWithUserEvent(<OlympicResults />);
    await waitFor(() => {
      expect(
        screen.getByRole("row", {
          name: "ETH 1 1 0 2",
        })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("row", { name: "KEN 0 0 1 1" })
    ).toBeInTheDocument();

    await user.click(
      within(
        screen.getByRole("row", {
          name: "ETH 1 1 0 2",
        })
      ).getByRole("button", { name: /expand row/i })
    );

    // displays the children rows
    expect(
      screen.getByRole("row", {
        name: /bekele, kenenisa 1 0 0 1/i,
      })
    ).toBeInTheDocument();
  });

  test("filters athletes correctly", async () => {
    renderTestWithUserEvent(<OlympicResults />);
    const kenyaRow = "KEN 0 0 1 1";
    await waitFor(() => {
      expect(screen.getByRole("row", { name: kenyaRow })).toBeInTheDocument();
    });

    await fireEvent.change(
      screen.getByRole("searchbox", {
        name: "Search athletes",
      }),
      { target: { value: "sih" } }
    );

    // Kenya have no athletes that match sih
    await waitFor(() =>
      expect(screen.queryByRole("row", { name: kenyaRow })).toBeInTheDocument()
    );
  });

  test("displays error message when get athletes fail", async () => {
    server.use(http.get(GET_ATHLETES_URL, () => HttpResponse.error()));

    renderTestWithUserEvent(<OlympicResults />);
    await waitForElementToBeRemoved(() => screen.queryByText(loadingText));
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
