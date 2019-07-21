import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import ViewBudgetItem from "../../components/ViewBudgetItem";
import {
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
} from "../../testUtils/fixtures/mockStoreData";
import { renderWithReduxRouterAndTheme } from "../../testUtils/helpers/renderHelpers";

afterEach(cleanup);

const store = createStore(() => ({
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
}));

test("can render with redux with custom store", () => {
  const { asFragment } = renderWithReduxRouterAndTheme(
    <ViewBudgetItem match={{ params: { id: "1", budgetItemId: "1" } }} />,
    {
      store
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
