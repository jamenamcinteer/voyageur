import React, { useContext } from "react";
import { Store } from "../Store";
import { withRouter } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";
import BudgetItemForm from "./Forms/BudgetItemForm";

const AddBudgetItem = props => {
  const { state } = useContext(Store);

  // const trips = JSON.parse(localStorage.getItem("trips"));
  const trip = state.trips.find(trip => trip.id === props.match.params.id);
  // const budgetCategories = JSON.parse(localStorage.getItem("budgetCategories"));

  const budgetCategory = state.budgetCategories.find(
    budgetCategory => budgetCategory.id === props.match.params.budgetCategoryId
  );

  return (
    <div>
      {budgetCategory && (
        <div>
          <TripHeader
            title="Add Budget Item"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
          />
          <BudgetItemForm theme={props.theme} />
        </div>
      )}
    </div>
  );
};

export default withRouter(AddBudgetItem);
