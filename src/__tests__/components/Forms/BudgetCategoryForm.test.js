import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import tripsReducer, {
  tripsReducerDefaultState
} from "../../../reducers/trips";
import { Router } from "react-router-dom";
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
import "jest-styled-components";
// import theme from "../../../theme";

expect.extend({ toMatchDiffSnapshot, toBeInTheDocument });

function renderWithReduxAndRouter(
  ui,
  {
    initialState,
    store = createStore(tripsReducer, tripsReducerDefaultState),
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    store,
    history
  };
}

afterEach(cleanup);

jest.mock("uniqid", () => {
  let value = 1;
  return () => value++;
});

// test("can render with redux", () => {
//   const { asFragment } = renderWithReduxAndRouter(
//     <BudgetCategoryForm trip={trips[0]} />
//   );
//   expect(asFragment()).toMatchSnapshot();
// });

test("should render passed props and respond to callback props", done => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    trips,
    budgetCategories,
    budgetItems,
    expenses,
    auth
  });
  const historyMock = { push: jest.fn() };

  const { getByText, getByLabelText } = renderWithReduxAndRouter(
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
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    trips,
    budgetCategories,
    budgetItems,
    expenses,
    auth
  });

  const { getByTestId, getByText } = renderWithReduxAndRouter(
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
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    trips,
    budgetCategories,
    budgetItems,
    expenses,
    auth
  });
  const historyMock = { push: jest.fn() };

  const { getByTestId, getByText, getByLabelText } = renderWithReduxAndRouter(
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
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    trips,
    budgetCategories,
    budgetItems,
    expenses,
    auth
  });
  const historyMock = { push: jest.fn() };

  const { getByText } = renderWithReduxAndRouter(
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

  // getByText("Cancel").click();
  // expect(getByText("Yes, Delete")).not.toBeInTheDocument();

  // getByText("Delete").click();
  getByText("Yes, Delete").click();

  setTimeout(() => {
    expect(historyMock.push.mock.calls[0]).toEqual([`/trip/${trips[0]._id}`]);
    done();
  }, 2000);
});
