import { expect, test, describe } from "vitest";
import { renderTestWithUserEvent } from "@shared/testing-utils";
import { CollapsibleTable } from "@shared/components";
import { screen, within } from "@testing-library/react";

describe("CollapsibleTable", () => {
  const mainHeaders = [
    { key: "name", label: "Name" },
    { key: "age", label: "age" },
  ];

  const childrenHeaders = [
    { key: "movie", label: "Favourite Movie" },
    { key: "fact", label: "Fun Fact" },
  ];
  const childrenTitle = "Information";

  const rows = [
    {
      id: "1",
      name: "John",
      age: 20,
      children: [
        {
          id: "2",
          movie: "The Dark Knight",
          fact: "love Purple",
        },
      ],
    },
  ];

  test("renders correcty", async () => {
    const { user } = renderTestWithUserEvent(
      <CollapsibleTable
        headers={mainHeaders}
        childrenHeaders={childrenHeaders}
        childrenTitle={childrenTitle}
        rows={rows}
      />
    );

    // main row display
    mainHeaders.map(({ label }) => {
      expect(
        screen.getByRole("columnheader", {
          name: label,
        })
      ).toBeInTheDocument();
    });
    const mainRow = screen.getByRole("row", {
      name: "John 20",
    });
    expect(mainRow).toBeInTheDocument();

    // open child row
    await user.click(
      within(mainRow).getByRole("button", { name: /expand row/i })
    );

    // child row displays
    expect(screen.getByText(childrenTitle)).toBeInTheDocument();
    childrenHeaders.map(({ label }) => {
      expect(
        screen.getByRole("columnheader", {
          name: label,
        })
      ).toBeInTheDocument();
    });
  });
});
