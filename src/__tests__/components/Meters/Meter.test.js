import React from "react";
import { cleanup } from "@testing-library/react";
import Meter from "../../../components/Meters/Meter";
import { renderWithTheme } from "../../../testUtils/helpers/renderHelpers";

afterEach(cleanup);

test("should render with theme and passed props as numbers", () => {
  const { asFragment } = renderWithTheme(<Meter actual={50} budgeted={100} />);
  expect(asFragment()).toMatchSnapshot();
});

test("should render with theme and passed props as strings", () => {
  const { asFragment } = renderWithTheme(<Meter actual="50" budgeted="100" />);
  expect(asFragment()).toMatchSnapshot();
});
