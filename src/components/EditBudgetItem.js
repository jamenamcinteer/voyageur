import React from "react";
import TripHeader from "./Navigation/TripHeader";
import BudgetItemForm from "./Forms/BudgetItemForm";
import { PageSection } from "./StyledComponents/Layout";
import { connect } from "react-redux";

const EditBudgetItem = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  const budgetCategory = props.budgetCategories.find(
    budgetCategory => budgetCategory._id === props.match.params.budgetCategoryId
  );

  const budgetItem = props.budgetItems.find(
    budgetItem => budgetItem._id === props.match.params.budgetItemId
  );

  return (
    <React.Fragment>
      {budgetCategory && (
        <React.Fragment>
          <TripHeader
            title="Edit Budget Item"
            theme={props.theme}
            backTo={`/trip/${trip._id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          <PageSection>
            <BudgetItemForm
              theme={props.theme}
              trip={trip}
              budgetItem={budgetItem}
              budgetCategory={budgetCategory}
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
    budgetCategories: state.budgetCategories,
    budgetItems: state.budgetItems,
    expenses: state.expenses,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(EditBudgetItem);
