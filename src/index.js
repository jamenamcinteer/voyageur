import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import { StoreProvider } from "./Store";
import { history } from "./routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./Store";
import { startLogin } from "./actions/auth";
import { startSetTrips } from "./actions/trips";
import { startSetBudgetCategories } from "./actions/budgetCategories";
import { startSetBudgetItems } from "./actions/budgetItems";
import { startSetExpenses } from "./actions/expenses";
import { startSetUsers } from "./actions/users";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Loader from "react-loader-spinner";
import theme from "./theme";
import styled from "styled-components";

const store = configureStore();

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingPage = () => {
  return (
    <LoaderContainer>
      <Loader
        type="RevolvingDot"
        color={theme.themeColorLight}
        height="75"
        width="75"
      />
    </LoaderContainer>
  );
};

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("root"));

store.dispatch(startLogin()).then(() => {
  if (store.getState().auth.uid) {
    store.dispatch(startSetUsers(store.getState().auth.uid)).then(() => {
      store.dispatch(startSetTrips()).then(() => {
        store.dispatch(startSetBudgetCategories()).then(() => {
          store.dispatch(startSetBudgetItems()).then(() => {
            store.dispatch(startSetExpenses()).then(() => {
              renderApp();
              // history.push("/");
            });
          });
        });
      });
    });
  } else {
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/login");
    }
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
