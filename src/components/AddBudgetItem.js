import React from "react";
import TripHeader from "./Navigation/TripHeader";
import BudgetItemForm from "./Forms/BudgetItemForm";
import { connect } from "react-redux";
import { PageSection } from "./StyledComponents/Layout";

const AddBudgetItem = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  const budgetCategory = props.budgetCategories.find(
    budgetCategory => budgetCategory._id === props.match.params.budgetCategoryId
  );

  return (
    <React.Fragment>
      {budgetCategory && (
        <React.Fragment>
          <TripHeader
            title="Add Budget Item"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          <PageSection>
            <BudgetItemForm
              theme={props.theme}
              trip={trip}
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

export default connect(mapStateToProps)(AddBudgetItem);
