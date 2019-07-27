import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import "react-dates/initialize";
import AddExpense from "../../components/AddExpense";
import {
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
} from "../../testUtils/fixtures/mockStoreData";
import { renderWithReduxRouterAndTheme } from "../../testUtils/helpers/renderHelpers";

afterEach(cleanup);

jest.mock("uniqid", () => {
  let value = 1;
  return () => value++;
});

const store = createStore(() => ({
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
}));

test("can render with redux with custom store", () => {
  const { asFragment } = renderWithReduxRouterAndTheme(
    <AddExpense match={{ params: { id: "1" } }} location="" />,
    {
      store
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
