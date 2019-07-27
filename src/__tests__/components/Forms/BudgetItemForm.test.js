import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import BudgetItemForm from "../../../components/Forms/BudgetItemForm";
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
const budgetItemField = "Name of Budget Item";
const estimatedCostField = "Estimated Cost ($)";
const notesField = "Notes (optional)";

test("should render passed props and respond to callback props", done => {
  const { getByText, getByLabelText } = renderWithReduxRouterAndTheme(
    <BudgetItemForm
      trip={trips[0]}
      budgetCategory={budgetCategories[0]}
      history={historyMock}
    />,
    { store }
  );

  let newBudgetItem = "Flights";
  fireEvent.change(getByLabelText(budgetItemField), {
    target: { value: newBudgetItem }
  });
  let newEstimate = "500.00";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();

  setTimeout(() => {
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip/${trips[0]._id}`]);
    done();
  }, 2000);
});

test("should display error if name of budget item is empty after clicking Save", () => {
  const {
    getByLabelText,
    getByTestId,
    getByText
  } = renderWithReduxRouterAndTheme(
    <BudgetItemForm
      trip={trips[0]}
      budgetCategory={budgetCategories[0]}
      history={createMemoryHistory({ initialEntries: ["/"] })}
    />,
    { store }
  );

  let newEstimate = "500.00";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(getByTestId("budgetItemError")).toBeInTheDocument();
});

test("should display error if estimated cost is empty after clicking Save", () => {
  const {
    getByLabelText,
    getByTestId,
    getByText
  } = renderWithReduxRouterAndTheme(
    <BudgetItemForm
      trip={trips[0]}
      budgetCategory={budgetCategories[0]}
      history={createMemoryHistory({ initialEntries: ["/"] })}
    />,
    { store }
  );

  const newBudgetItem = "Flights";
  fireEvent.change(getByLabelText(budgetItemField), {
    target: { value: newBudgetItem }
  });
  getByText("Save").click();
  expect(getByTestId("estimatedCostError")).toBeInTheDocument();
});

test("should display error if estimated cost is not correctly formatted after clicking Save", () => {
  const {
    getByLabelText,
    getByTestId,
    getByText,
    queryByTestId
  } = renderWithReduxRouterAndTheme(
    <BudgetItemForm
      trip={trips[0]}
      budgetCategory={budgetCategories[0]}
      history={createMemoryHistory({ initialEntries: ["/"] })}
    />,
    { store }
  );

  let newBudgetItem = "Flights";
  fireEvent.change(getByLabelText(budgetItemField), {
    target: { value: newBudgetItem }
  });

  let newEstimate = "test";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(getByTestId("estimatedCostError")).toBeInTheDocument();

  newEstimate = " ";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(getByTestId("estimatedCostError")).toBeInTheDocument();

  newEstimate = "10,00";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(queryByTestId("estimatedCostError")).toBeNull();

  newEstimate = 325;
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(queryByTestId("estimatedCostError")).toBeNull();

  newEstimate = 325.5;
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(queryByTestId("estimatedCostError")).toBeNull();

  newEstimate = "325";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(queryByTestId("estimatedCostError")).toBeNull();

  newEstimate = "325.50";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(queryByTestId("estimatedCostError")).toBeNull();
});

test("should render passed budget item and handle edits correctly", done => {
  const {
    getByTestId,
    getByText,
    getByLabelText
  } = renderWithReduxRouterAndTheme(
    <BudgetItemForm
      trip={trips[0]}
      budgetCategory={budgetCategories[0]}
      budgetItem={budgetItems[0]}
      history={historyMock}
    />,
    { store }
  );

  // Display existing budget category data
  expect(getByLabelText(budgetItemField).value).toBe(budgetItems[0].budgetItem);
  expect(getByLabelText(estimatedCostField).value).toBe(
    budgetItems[0].estimatedCost
  );
  expect(getByLabelText(notesField).value).toBe(budgetItems[0].notes);

  // Empty the required fields and trigger errors
  let newBudgetItem = "";
  fireEvent.change(getByLabelText(budgetItemField), {
    target: { value: newBudgetItem }
  });
  let newEstimate = "";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });
  getByText("Save").click();
  expect(getByTestId("budgetItemError")).toBeInTheDocument();
  expect(getByTestId("estimatedCostError")).toBeInTheDocument();

  // Change field values to new values
  newBudgetItem = "Flights";
  fireEvent.change(getByLabelText(budgetItemField), {
    target: { value: newBudgetItem }
  });

  newEstimate = "925.50";
  fireEvent.change(getByLabelText(estimatedCostField), {
    target: { value: newEstimate }
  });

  let newNotes = "This is a test note.";
  fireEvent.change(getByLabelText(notesField), {
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
    <BudgetItemForm
      trip={trips[0]}
      budgetCategory={budgetCategories[0]}
      budgetItem={budgetItems[0]}
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

  setTimeout(() => {
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip/${trips[0]._id}`]);
    done();
  }, 2000);
});
