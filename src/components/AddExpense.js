import React, { useContext } from "react";
import { Store } from "../Store";
import { withRouter } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";
import queryString from "query-string";

import ExpenseForm from "./Forms/ExpenseForm";

const AddExpense = props => {
  const { state } = useContext(Store);

  const trip = state.trips.find(trip => trip.id === props.match.params.id);

  const queryValues = queryString.parse(props.location.search);

  return (
    <div>
      {trip && (
        <div>
          <TripHeader
            title="Add Expense"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
          />
          <ExpenseForm
            theme={props.theme}
            budgetCategoryId={queryValues.budgetCategory}
            budgetItemId={queryValues.budgetItem}
          />
        </div>
      )}
    </div>
  );
};

export default withRouter(AddExpense);
