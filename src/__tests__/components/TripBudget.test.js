import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import TripBudget from "../../components/TripBudget";
import {
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
} from "../../testUtils/fixtures/mockStoreData";
import { renderWithReduxRouterAndTheme } from "../../testUtils/helpers/renderHelpers";
import { toBeInTheDocument } from "@testing-library/jest-dom";

expect.extend({ toBeInTheDocument });

afterEach(cleanup);

// this is a silly store that can never be changed
const store = createStore(() => ({
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
}));

test("can render with redux with custom store", () => {
  const { asFragment } = renderWithReduxRouterAndTheme(
    <TripBudget match={{ params: { id: "1" } }} />,
    {
      store
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
