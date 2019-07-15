import React from "react";
import { render, cleanup } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import tripsReducer, { tripsReducerDefaultState } from "../../reducers/trips";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "react-dates/initialize";
import AddTrip from "../../components/AddTrip";
import { auth } from "../../testUtils/fixtures/mockStoreData";

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

test("can render with redux with custom store", () => {
  const store = createStore(() => ({
    auth
  }));
  const { asFragment } = renderWithReduxAndRouter(<AddTrip />, {
    store
  });
  expect(asFragment()).toMatchSnapshot();
});
