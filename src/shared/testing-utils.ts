import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";

export const renderTestWithUserEvent = (
  jsx: ReactElement
): { user: UserEvent } & RenderResult => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};
