import React from "react";
import { cleanup } from "@testing-library/react";
import Header from "../../../components/Navigation/Header";
import { renderWithReduxRouterAndTheme } from "../../../testUtils/helpers/renderHelpers";
import { toBeInTheDocument } from "@testing-library/jest-dom";

expect.extend({ toBeInTheDocument });

afterEach(cleanup);

test("should render with theme and passed props and with back button", () => {
  const auth = {
    photoURL: "/some-image.png"
  };
  const { asFragment } = renderWithReduxRouterAndTheme(
    <Header title="Test Header" auth={auth} backTo="/" />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("should render with theme and passed props and with no back button", () => {
  const auth = {
    photoURL: "/some-image.png"
  };
  const { asFragment } = renderWithReduxRouterAndTheme(
    <Header title="Test Header" auth={auth} backHide={true} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("should open and close profile menu correctly", () => {
  const auth = {
    photoURL: "/some-image.png"
  };
  const {
    getByAltText,
    getByText,
    queryByText
  } = renderWithReduxRouterAndTheme(
    <Header title="Test Header" auth={auth} backTo="/" />
  );

  getByAltText("Account Options").click();
  expect(getByText("Sign Out")).toBeInTheDocument();

  getByAltText("Account Options").click();
  expect(queryByText("Sign Out")).toBeNull();
});
