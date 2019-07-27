import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import "react-dates/initialize";
import EditBudgetCategory from "../../components/EditBudgetCategory";
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
    <EditBudgetCategory
      match={{ params: { id: "1", budgetCategoryId: "1" } }}
    />,
    {
      store
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
