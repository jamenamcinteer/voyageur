import React from "react";
import { cleanup, wait } from "@testing-library/react";
import { createStore } from "redux";
import Trip from "../../components/Trip";
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

const historyMock = { push: jest.fn() };

test("can render with redux with custom store", () => {
  const { asFragment } = renderWithReduxRouterAndTheme(
    <Trip match={{ params: { id: "1" } }} />,
    {
      store
    }
  );
  expect(asFragment()).toMatchSnapshot();
});

test("should display modal after clicking Delete and redirect to Dashboard page after confirming delete", async () => {
  const { getByText, getByTestId, queryByText } = renderWithReduxRouterAndTheme(
    <Trip
      match={{ params: { id: "1" } }}
      history={historyMock}
      isTest={true}
    />,
    { store }
  );

  getByText("Delete Trip").click();
  expect(getByText("Yes, Delete")).toBeInTheDocument();

  getByTestId("closeModal").click();
  expect(queryByText("Yes, Delete")).toBeNull();

  getByText("Delete Trip").click();
  getByText("Yes, Delete").click();
  await wait(() => expect(historyMock.push.mock.calls[0]).toEqual([`/`]))
});
