import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import "jest-styled-components";
import { createStore } from "redux";
import { Provider } from "react-redux";
import tripsReducer, { tripsReducerDefaultState } from "../../reducers/trips";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

export function renderWithTheme(component) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
}

export function renderWithReduxRouterAndTheme(
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
        <ThemeProvider theme={theme}>
          <Router history={history}>{ui}</Router>
        </ThemeProvider>
      </Provider>
    ),
    store,
    history
  };
}
