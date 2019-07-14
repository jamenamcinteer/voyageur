import React from "react";
import { render, cleanup } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import budgetItemsReducer, {
  budgetItemsReducerDefaultState
} from "../../reducers/budgetItems";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ViewBudgetItem from "../../components/ViewBudgetItem";
import {
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
} from "../../testUtils/fixtures/mockStoreData";

function renderWithReduxAndRouter(
  ui,
  {
    initialState,
    store = createStore(budgetItemsReducer, budgetItemsReducerDefaultState),
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

test("can render with redux with custom store", () => {
  const store = createStore(() => ({
    trips,
    budgetCategories,
    budgetItems,
    expenses,
    auth
  }));
  const { asFragment } = renderWithReduxAndRouter(
    <ViewBudgetItem match={{ params: { id: "1", budgetItemId: "1" } }} />,
    {
      store
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
