import React from "react";
import TripHeader from "./Navigation/TripHeader";
import BudgetCategoryForm from "./Forms/BudgetCategoryForm";
import { connect } from "react-redux";

const EditBudgetCategory = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);
  const budgetCategory = props.budgetCategories.find(
    i => i._id === props.match.params.budgetCategoryId
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
            budgetItems={props.budgetItems}
            expenses={props.expenses}
          />
          <BudgetCategoryForm
            theme={props.theme}
            trip={trip}
            budgetCategory={budgetCategory}
            history={props.history}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    trips: state.trips,
    budgetCategories: state.budgetCategories,
    budgetItems: state.budgetItems,
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(EditBudgetCategory);
