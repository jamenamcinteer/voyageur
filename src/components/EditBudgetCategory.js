import React from "react";
import TripHeader from "./Navigation/TripBudgetHeader";
import BudgetCategoryForm from "./Forms/BudgetCategoryForm";
import { connect } from "react-redux";

const EditBudgetCategory = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);
  const budgetCategory = props.budgetCategories.find(
    i => i._id === props.match.params.budgetCategoryId
  );

  return (
    <React.Fragment>
      {trip && (
        <React.Fragment>
          <TripHeader
            title="Add Budget Category"
            theme={props.theme}
            backTo={`/trip-budget/${props.match.params.id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          <BudgetCategoryForm
            theme={props.theme}
            trip={trip}
            budgetCategory={budgetCategory}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            history={props.history}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  return {
    trips: state.trips,
    budgetCategories: state.budgetCategories,
    budgetItems: state.budgetItems,
    expenses: state.expenses,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(EditBudgetCategory);
