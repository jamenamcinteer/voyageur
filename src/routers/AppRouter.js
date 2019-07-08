import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
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

const AppRouter = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={() => <Dashboard {...props} />} exact={true} />
        <Route
          path="/trip/add"
          render={() => <AddTrip {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id"
          render={() => <Trip {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id/edit"
          render={() => <EditTrip {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id/add-budget-category"
          render={() => <AddBudgetCategory {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id/add-expense"
          render={() => <AddExpense {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/edit"
          render={() => <EditBudgetCategory {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/add-budget-item"
          render={() => <AddBudgetItem {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/budget-item/:budgetItemId"
          render={() => <ViewBudgetItem {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/budget-item/:budgetItemId/edit"
          render={() => <EditBudgetItem {...props} />}
          exact={true}
        />
        <Route
          path="/trip/:id/budget-category/:budgetCategoryId/budget-item/:budgetItemId/expense/:expenseId"
          render={() => <EditExpense {...props} />}
          exact={true}
        />
        {/* <Route path="/trip/:id/edit" component={Dashboard} exact={true} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
