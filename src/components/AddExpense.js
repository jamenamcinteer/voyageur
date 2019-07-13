import React from "react";
import TripHeader from "./Navigation/TripHeader";
import queryString from "query-string";
import { connect } from "react-redux";
import ExpenseForm from "./Forms/ExpenseForm";

const AddExpense = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  const queryValues = queryString.parse(props.location.search);

  return (
    <div>
      {trip && (
        <div>
          <TripHeader
            title="Add Expense"
            theme={props.theme}
            backTo={`/trip/${trip._id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
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
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    trips: state.trips,
    budgetItems: state.budgetItems,
    budgetCategories: state.budgetCategories,
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(AddExpense);
