import React from "react";
import TripHeader from "./Navigation/TripBudgetHeader";
import queryString from "query-string";
import { connect } from "react-redux";
import ExpenseForm from "./Forms/ExpenseForm";

const AddExpense = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  const queryValues = queryString.parse(props.location.search);

  return (
    <React.Fragment>
      {trip && (
        <React.Fragment>
          <TripHeader
            title="Add Expense"
            theme={props.theme}
            backTo={`/trip-budget/${trip._id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          <ExpenseForm
            theme={props.theme}
            budgetCategoryId={queryValues.budgetCategory}
            budgetItemId={queryValues.budgetItem}
            trip={trip}
            budgetCategories={props.budgetCategories}
            budgetItems={props.budgetItems}
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
    budgetCategories: state.budgetCategories,
    expenses: state.expenses,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AddExpense);
