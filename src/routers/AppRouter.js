import React from "react";
import { Router, Route, Switch } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from "history";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import AddTrip from "../components/AddTrip";
import EditTrip from "../components/EditTrip";
import AddBudgetCategory from "../components/AddBudgetCategory";
import EditBudgetCategory from "../components/EditBudgetCategory";
import AddBudgetItem from "../components/AddBudgetItem";
import EditBudgetItem from "../components/EditBudgetItem";
import ViewBudgetItem from "../components/ViewBudgetItem";
import AddExpense from "../components/AddExpense";
import EditExpense from "../components/EditExpense";
import Trip from "../components/Trip";

export const history = createBrowserHistory();

const AppRouter = props => {
  return (
    <Router history={history} theme={props.theme}>
      <Switch>
        <Route path="/" component={Dashboard} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/trip/add" component={AddTrip} exact={true} />
        <Route path="/trip/:id" component={Trip} exact={true} />
        <Route path="/trip/:id/edit" component={EditTrip} exact={true} />
        <Route
          path="/trip/:id/add-budget-category"
          component={AddBudgetCategory}
          exact={true}
        />
        <Route
          path="/trip/:id/add-expense"
          component={AddExpense}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/edit"
          component={EditBudgetCategory}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/add-budget-item"
          component={AddBudgetItem}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/budget-item/:budgetItemId"
          component={ViewBudgetItem}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/budget-item/:budgetItemId/edit"
          component={EditBudgetItem}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/budget-item/:budgetItemId/expense/:expenseId"
          component={EditExpense}
          exact={true}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
