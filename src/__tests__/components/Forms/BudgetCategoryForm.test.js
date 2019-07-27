import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import BudgetCategoryForm from "../../../components/Forms/BudgetCategoryForm";
import {
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
} from "../../../testUtils/fixtures/mockStoreData";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { toMatchDiffSnapshot } from "snapshot-diff";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { renderWithReduxRouterAndTheme } from "../../../testUtils/helpers/renderHelpers";

expect.extend({ toMatchDiffSnapshot, toBeInTheDocument });

afterEach(cleanup);

jest.mock("uniqid", () => {
  let value = 1;
  return () => value++;
});

const mockStore = configureStore([thunk]);
const store = mockStore({
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
});
const historyMock = { push: jest.fn() };

test("should render passed props and respond to callback props", done => {
  const { getByText, getByLabelText } = renderWithReduxRouterAndTheme(
    <BudgetCategoryForm trip={trips[0]} history={historyMock} />,
    { store }
  );

  let newBudgetCategory = "Accommodations";
  fireEvent.change(getByLabelText("Name of Budget Category"), {
    target: { value: newBudgetCategory }
  });
  getByText("Save").click();
  // expect(startAddBudgetCategory).toHaveBeenCalledTimes(1);

  setTimeout(() => {
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip/${trips[0]._id}`]);
    done();
  }, 2000);
});

test("should display error if name of budget category is empty after clicking Save", () => {
  const { getByTestId, getByText } = renderWithReduxRouterAndTheme(
    <BudgetCategoryForm
      trip={trips[0]}
      history={createMemoryHistory({ initialEntries: ["/"] })}
    />,
    { store }
  );

  getByText("Save").click();
  expect(getByTestId("budgetCategoryError")).toBeInTheDocument();
});

test("should render passed budget category and handle edits correctly", done => {
  const {
    getByTestId,
    getByText,
    getByLabelText
  } = renderWithReduxRouterAndTheme(
    <BudgetCategoryForm
      trip={trips[0]}
      budgetCategory={budgetCategories[0]}
      history={historyMock}
    />,
    { store }
  );

  const input = getByLabelText("Name of Budget Category");
  const textarea = getByLabelText("Notes (optional)");

  // Display existing budget category data
  expect(input.value).toBe(budgetCategories[0].budgetCategory);
  expect(textarea.value).toBe(budgetCategories[0].notes);

  // Empty the required fields and trigger errors
  let newBudgetCategory = "";
  fireEvent.change(input, {
    target: { value: newBudgetCategory }
  });
  getByText("Save").click();
  expect(getByTestId("budgetCategoryError")).toBeInTheDocument();

  // Change field values to new values
  newBudgetCategory = "Accommodations";
  fireEvent.change(input, {
    target: { value: newBudgetCategory }
  });

  let newNotes = "This is a test note.";
  fireEvent.change(textarea, {
    target: { value: newNotes }
  });

  // Save and redirect to trip page
  getByText("Save").click();
  setTimeout(() => {
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip/${trips[0]._id}`]);
    done();
  }, 2000);
});

test("should display modal after clicking Delete and redirect to trip page after confirming delete", done => {
  const { getByText, getByTestId, queryByText } = renderWithReduxRouterAndTheme(
    <BudgetCategoryForm
      trip={trips[0]}
      budgetCategory={budgetCategories[0]}
      budgetItems={budgetItems}
      expenses={expenses}
      history={historyMock}
      isTest={true}
    />,
    { store }
  );

  getByText("Delete").click();
  expect(getByText("Yes, Delete")).toBeInTheDocument();

  getByTestId("closeModal").click();
  expect(queryByText("Yes, Delete")).toBeNull();

  getByText("Delete").click();
  getByText("Yes, Delete").click();

  setTimeout(() => {
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip/${trips[0]._id}`]);
    done();
  }, 2000);
});
