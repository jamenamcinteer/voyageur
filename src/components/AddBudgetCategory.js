import React from "react";
import TripHeader from "./Navigation/TripBudgetHeader";
import BudgetCategoryForm from "./Forms/BudgetCategoryForm";
import { connect } from "react-redux";

const AddBudgetCategory = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

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
    budgetItems: state.budgetItems,
    expenses: state.expenses,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AddBudgetCategory);
