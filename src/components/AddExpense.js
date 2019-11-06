import React from "react";
import TripHeader from "./Navigation/TripHeader";
import queryString from "query-string";
import { connect } from "react-redux";
import ExpenseForm from "./Forms/ExpenseForm";
import { PageSection } from "./StyledComponents/Layout";

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
            backTo={`/trip/${trip._id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          <PageSection>
            <ExpenseForm
              theme={props.theme}
              budgetCategoryId={queryValues.budgetCategory}
              budgetItemId={queryValues.budgetItem}
              trip={trip}
              budgetCategories={props.budgetCategories}
              budgetItems={props.budgetItems}
              history={props.history}
            />
          </PageSection>
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
