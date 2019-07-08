import React, { useContext } from "react";
import { Store } from "../Store";
import { withRouter } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";

import ExpenseForm from "./Forms/ExpenseForm";

const EditExpense = props => {
  const { state } = useContext(Store);

  const trip = state.trips.find(trip => trip.id === props.match.params.id);

  const expense = state.expenses.find(
    i => i.id === props.match.params.expenseId
  );

  return (
    <div>
      {expense && (
        <div>
          <TripHeader
            title="Edit Expense"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}/budget-category/${
              expense.budgetCategoryId
            }/budget-item/${expense.budgetItemId}`}
            trip={trip}
          />
          <ExpenseForm expense={expense} theme={props.theme} />
        </div>
      )}
    </div>
  );
};

export default withRouter(EditExpense);
