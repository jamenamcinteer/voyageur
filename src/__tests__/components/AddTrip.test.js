import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import "react-dates/initialize";
import AddTrip from "../../components/AddTrip";
import { auth } from "../../testUtils/fixtures/mockStoreData";
import { renderWithReduxRouterAndTheme } from "../../testUtils/helpers/renderHelpers";

afterEach(cleanup);

jest.mock("uniqid", () => {
  let value = 1;
  return () => value++;
});

test("can render with redux with custom store", () => {
  const store = createStore(() => ({
    auth
  }));
  const { asFragment } = renderWithReduxRouterAndTheme(<AddTrip />, {
    store
  });
  expect(asFragment()).toMatchSnapshot();
});
