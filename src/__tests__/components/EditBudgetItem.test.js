import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import "react-dates/initialize";
import EditBudgetItem from "../../components/EditBudgetItem";
import {
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
} from "../../testUtils/fixtures/mockStoreData";
import { renderWithReduxRouterAndTheme } from "../../testUtils/helpers/renderHelpers";

jest.mock("uniqid", () => {
  let value = 1;
  return () => value++;
});

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
    <EditBudgetItem
      match={{ params: { id: "1", budgetCategoryId: "1", budgetItemId: "1" } }}
    />,
    {
      store
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
