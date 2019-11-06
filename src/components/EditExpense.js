import React from "react";
import TripHeader from "./Navigation/TripHeader";
import { PageSection } from "./StyledComponents/Layout";
import { connect } from "react-redux";

import ExpenseForm from "./Forms/ExpenseForm";

const EditExpense = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  const expense = props.expenses.find(
    i => i._id === props.match.params.expenseId
  );

  return (
    <React.Fragment>
      {expense && (
        <React.Fragment>
          <TripHeader
            title="Edit Expense"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}/budget-category/${
              expense.budgetCategoryId
            }/budget-item/${expense.budgetItemId}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          <PageSection>
            <ExpenseForm
              expense={expense}
              theme={props.theme}
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

export default connect(mapStateToProps)(EditExpense);
