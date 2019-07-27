import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import "react-dates/initialize";
import EditExpense from "../../components/EditExpense";
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

test("can render with redux with custom store", () => {
  const store = createStore(() => ({
    trips,
    budgetCategories,
    budgetItems,
    expenses,
    auth
  }));
  const { asFragment } = renderWithReduxRouterAndTheme(
    <EditExpense match={{ params: { id: "1", expenseId: "1" } }} />,
    {
      store
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
