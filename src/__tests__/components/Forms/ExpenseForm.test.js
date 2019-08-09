import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
// import { createMemoryHistory } from "history";
import ExpenseForm from "../../../components/Forms/ExpenseForm";
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
import "react-dates/initialize";
import moment from "moment";

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
const budgetCategoryField = "Budget Category";
const budgetItemField = "Budget Item";
const summaryField = "Summary of Expense";
const amountField = "Amount Spent ($)";
const dateField = "Date";
const notesField = "Notes (optional)";

test("should render passed props and save with required data", done => {
  const {
    getByText,
    getByLabelText
    // asFragment
  } = renderWithReduxRouterAndTheme(
    <ExpenseForm
      trip={trips[0]}
      budgetCategories={budgetCategories}
      budgetItems={budgetItems}
      history={historyMock}
    />,
    { store }
  );
  // const firstRender = asFragment();

  const newBudgetCategory = budgetCategories[0]._id;
  const newBudgetItem = budgetItems[0]._id;
  const newSummary = "test expense";
  const newAmount = "35.00";
  const newDate = "04/19/2019";

  fireEvent.change(getByLabelText(budgetCategoryField), {
    target: { value: newBudgetCategory }
  });

  fireEvent.change(getByLabelText(budgetItemField), {
    target: { value: newBudgetItem }
  });

  fireEvent.change(getByLabelText(summaryField), {
    target: { value: newSummary }
  });

  fireEvent.change(getByLabelText(amountField), {
    target: { value: newAmount }
  });

  fireEvent.change(getByLabelText(dateField), {
    target: { value: newDate }
  });

  getByText("Save").click();

  // expect(firstRender).toMatchDiffSnapshot(asFragment());

  setTimeout(() => {
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip-budget/${trips[0]._id}`]);
    done();
  }, 2000);
});

test("should display errors if required fields are empty", () => {
  const {
    getByText,
    getByTestId,
    queryByTestId
    // asFragment
  } = renderWithReduxRouterAndTheme(
    <ExpenseForm
      trip={trips[0]}
      budgetCategories={budgetCategories}
      budgetItems={budgetItems}
      history={historyMock}
    />,
    { store }
  );

  getByText("Save").click();

  expect(getByTestId("budgetCategoryError")).toBeInTheDocument();
  expect(getByTestId("budgetItemError")).toBeInTheDocument();
  expect(getByTestId("summaryError")).toBeInTheDocument();
  expect(queryByTestId("currencyError")).toBeNull();
  expect(getByTestId("amountError")).toBeInTheDocument();
  expect(getByTestId("dateError")).toBeInTheDocument();
});

test("should display error if amount is not valid and no error if amount is valid", () => {
  const {
    getByText,
    getByTestId,
    queryByTestId,
    getByLabelText
  } = renderWithReduxRouterAndTheme(
    <ExpenseForm
      trip={trips[0]}
      budgetCategories={budgetCategories}
      budgetItems={budgetItems}
      history={historyMock}
    />,
    { store }
  );

  let newCost = "test";
  fireEvent.change(getByLabelText(amountField), {
    target: { value: newCost }
  });
  getByText("Save").click();
  expect(getByTestId("amountError")).toBeInTheDocument();

  newCost = " ";
  fireEvent.change(getByLabelText(amountField), {
    target: { value: newCost }
  });
  getByText("Save").click();
  expect(getByTestId("amountError")).toBeInTheDocument();

  newCost = "10,00";
  fireEvent.change(getByLabelText(amountField), {
    target: { value: newCost }
  });
  getByText("Save").click();
  expect(queryByTestId("amountError")).toBeNull();

  newCost = 325;
  fireEvent.change(getByLabelText(amountField), {
    target: { value: newCost }
  });
  getByText("Save").click();
  expect(queryByTestId("amountError")).toBeNull();

  newCost = 325.5;
  fireEvent.change(getByLabelText(amountField), {
    target: { value: newCost }
  });
  getByText("Save").click();
  expect(queryByTestId("amountError")).toBeNull();

  newCost = "325";
  fireEvent.change(getByLabelText(amountField), {
    target: { value: newCost }
  });
  getByText("Save").click();
  expect(queryByTestId("amountError")).toBeNull();

  newCost = "325.50";
  fireEvent.change(getByLabelText(amountField), {
    target: { value: newCost }
  });
  getByText("Save").click();
  expect(queryByTestId("amountError")).toBeNull();
});

test("should display error if date is not valid", () => {
  const {
    getByText,
    getByTestId,
    queryByTestId,
    getByLabelText
  } = renderWithReduxRouterAndTheme(
    <ExpenseForm
      trip={trips[0]}
      budgetCategories={budgetCategories}
      budgetItems={budgetItems}
      history={historyMock}
    />,
    { store }
  );

  let newDate = "test";
  fireEvent.change(getByLabelText(dateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("dateError")).toBeInTheDocument();

  newDate = " ";
  fireEvent.change(getByLabelText(dateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("dateError")).toBeInTheDocument();

  newDate = "05/03/19";
  fireEvent.change(getByLabelText(dateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("dateError")).toBeInTheDocument();

  newDate = "05/03/1";
  fireEvent.change(getByLabelText(dateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("dateError")).toBeInTheDocument();

  newDate = "5/3/19";
  fireEvent.change(getByLabelText(dateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("dateError")).toBeInTheDocument();

  newDate = "5/3/2019";
  fireEvent.change(getByLabelText(dateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("dateError")).toBeInTheDocument();

  newDate = "05/03/2019";
  fireEvent.change(getByLabelText(dateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(queryByTestId("dateError")).toBeNull();
});

test("should render passed expense and handle edits correctly", done => {
  const {
    getByText,
    getByTestId,
    getByLabelText
  } = renderWithReduxRouterAndTheme(
    <ExpenseForm
      trip={trips[0]}
      budgetCategories={budgetCategories}
      budgetItems={budgetItems}
      expense={expenses[0]}
      history={historyMock}
    />,
    { store }
  );

  // Display existing budget category data
  expect(getByLabelText(budgetCategoryField).value).toBe(
    expenses[0].budgetCategoryId
  );
  expect(getByLabelText(budgetItemField).value).toBe(expenses[0].budgetItemId);
  expect(getByLabelText(summaryField).value).toBe(expenses[0].summary);
  expect(getByLabelText(amountField).value).toBe(expenses[0].cost);
  expect(getByLabelText(dateField).value).toBe(
    moment(expenses[0].date).format("MM/DD/YYYY")
  );
  expect(getByLabelText(notesField).value).toBe(expenses[0].notes);

  // Empty the required fields and trigger errors
  fireEvent.change(getByLabelText(budgetCategoryField), {
    target: { value: "" }
  });
  fireEvent.change(getByLabelText(budgetItemField), {
    target: { value: "" }
  });
  fireEvent.change(getByLabelText(summaryField), {
    target: { value: "" }
  });
  fireEvent.change(getByLabelText(amountField), {
    target: { value: "" }
  });
  fireEvent.change(getByLabelText(dateField), {
    target: { value: "" }
  });
  fireEvent.change(getByLabelText(notesField), {
    target: { value: "" }
  });
  getByText("Save").click();
  expect(getByTestId("budgetCategoryError")).toBeInTheDocument();
  expect(getByTestId("budgetItemError")).toBeInTheDocument();
  expect(getByTestId("summaryError")).toBeInTheDocument();
  expect(getByTestId("amountError")).toBeInTheDocument();
  expect(getByTestId("dateError")).toBeInTheDocument();

  // Change field values to new values
  fireEvent.change(getByLabelText(budgetCategoryField), {
    target: { value: budgetCategories[0]._id }
  });

  fireEvent.change(getByLabelText(budgetItemField), {
    target: { value: budgetItems[0]._id }
  });

  fireEvent.change(getByLabelText(summaryField), {
    target: { value: "this is a test" }
  });

  fireEvent.change(getByLabelText(amountField), {
    target: { value: "98.20" }
  });

  fireEvent.change(getByLabelText(dateField), {
    target: { value: "02/13/2019" }
  });

  // Save and redirect to trip page
  getByText("Save").click();
  setTimeout(() => {
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip-budget/${trips[0]._id}`]);
    done();
  }, 2000);
});

test("should display modal after clicking Delete and redirect to trip page after confirming delete", done => {
  const { getByText, getByTestId, queryByText } = renderWithReduxRouterAndTheme(
    <ExpenseForm
      trip={trips[0]}
      budgetCategories={budgetCategories}
      budgetItems={budgetItems}
      expense={expenses[0]}
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
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip-budget/${trips[0]._id}`]);
    done();
  }, 2000);
});

test("should pre-populate budget category and budget item if they are passed as props", () => {
  const { getByLabelText } = renderWithReduxRouterAndTheme(
    <ExpenseForm
      trip={trips[0]}
      budgetCategories={budgetCategories}
      budgetItems={budgetItems}
      budgetCategoryId={budgetCategories[0]._id}
      budgetItemId={budgetItems[0]._id}
      history={historyMock}
    />,
    { store }
  );

  expect(getByLabelText(budgetCategoryField).value).toBe(
    budgetCategories[0]._id
  );
  expect(getByLabelText(budgetItemField).value).toBe(budgetItems[0]._id);
});
