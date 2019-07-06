import React, { useContext } from "react";
import { Store } from "../Store";
import { withRouter } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";
import BudgetCategoryForm from "./Forms/BudgetCategoryForm";

const AddBudgetCategory = props => {
  const { state } = useContext(Store);

  const trip = state.trips.find(trip => trip.id === props.match.params.id);
  const budgetCategory = state.budgetCategories.find(
    i => i.id === props.match.params.budgetCategoryId
  );

  return (
    <div>
      {trip && (
        <div>
          <TripHeader
            title="Add Budget Category"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
          />
          <BudgetCategoryForm
            theme={props.theme}
            budgetCategory={budgetCategory}
          />
        </div>
      )}
    </div>
  );
};

export default withRouter(AddBudgetCategory);
