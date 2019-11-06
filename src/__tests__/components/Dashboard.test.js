import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import Dashboard from "../../components/Dashboard";
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

const store = createStore(() => ({
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
}));

const historyMock = { push: jest.fn() };
// Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 200})
window.innerWidth = 1024

test("can render with redux with custom store", () => {
  const { asFragment } = renderWithReduxRouterAndTheme(<Dashboard />, {
    store
  });
  expect(asFragment()).toMatchSnapshot();
});

test("should display modal after clicking Add Expense with list of trips to choose from", () => {
  const { getByText, getByTestId, queryByText } = renderWithReduxRouterAndTheme(
    <Dashboard history={historyMock} isTest={true} />,
    { store }
  );

  getByText("Add Expense").click();
  expect(getByText("Choose a Trip:")).toBeInTheDocument();
  expect(getByText("Hawaii (Apr 26, 1970 - Oct 1, 8307)")).toBeInTheDocument();

  getByTestId("closeModal").click();
  expect(queryByText("Choose a Trip:")).toBeNull();
});
