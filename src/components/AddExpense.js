import React, { useContext } from "react";
import { Store } from "../Store";
import { withRouter } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";

import ExpenseForm from "./Forms/ExpenseForm";

const AddExpense = props => {
  const { state } = useContext(Store);

  const trip = state.trips.find(trip => trip.id === props.match.params.id);

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
          <ExpenseForm theme={props.theme} />
        </div>
      )}
    </div>
  );
};

export default withRouter(AddExpense);
