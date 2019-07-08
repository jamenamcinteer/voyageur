import React from "react";
import { Store } from "./Store";
import AppRouter from "./routers/AppRouter";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { startSetBudgetCategories } from "./actions/budgetCategories";
import { startSetBudgetItems } from "./actions/budgetItems";
import { startSetExpenses } from "./actions/expenses";
import { startSetTrips } from "./actions/trips";

function App() {
  const { state, dispatch } = React.useContext(Store);
  // console.log("App.js", state);

  const theme = {
    themeColor: "#1aae9f",
    themeColorLight: "#a3ded8",
    themeColorRed: "#d85b6e",
    themeColorSecondary: "#c7d2db",
    themeColorSecondaryLight: "#dfe7ed",
    darkFont: "#4b5c6b",
    lightFont: "#788896"
  };

  // change to async/await when getting data from mongodb
  // const fetchTripsAction = React.useCallback(() => {
  //   const trips = JSON.parse(localStorage.getItem("trips"));
  //   return dispatch({
  //     type: "FETCH_TRIPS",
  //     payload: trips
  //   });
  // }, [dispatch]);
  // const fetchBudgetCategoriesAction = React.useCallback(() => {
  //   const budgetCategories = JSON.parse(
  //     localStorage.getItem("budgetCategories")
  //   );
  //   return dispatch({
  //     type: "FETCH_BUDGET_CATEGORIES",
  //     payload: budgetCategories
  //   });
  // }, [dispatch]);
  // const fetchBudgetItemsAction = React.useCallback(() => {
  //   const budgetItems = JSON.parse(localStorage.getItem("budgetItems"));
  //   return dispatch({
  //     type: "FETCH_BUDGET_ITEMS",
  //     payload: budgetItems
  //   });
  // }, [dispatch]);
  // const fetchExpensesAction = React.useCallback(() => {
  //   const expenses = JSON.parse(localStorage.getItem("expenses"));
  //   return dispatch({
  //     type: "FETCH_EXPENSES",
  //     payload: expenses
  //   });
  // }, [dispatch]);

  React.useEffect(() => {
    // state.trips.length === 0 && fetchTripsAction();
    state.trips.length === 0 && startSetTrips(state, dispatch);
    state.budgetCategories.length === 0 &&
      startSetBudgetCategories(state, dispatch);
    state.budgetItems.length === 0 && startSetBudgetItems(state, dispatch);
    state.expenses.length === 0 && startSetExpenses(state, dispatch);
  }, [
    state.trips.length,
    state.budgetCategories.length,
    state.budgetItems.length,
    state.expenses.length
  ]);
  return (
    <ThemeProvider theme={theme}>
      <AppRouter theme={theme} />
    </ThemeProvider>
  );
}

export default App;
