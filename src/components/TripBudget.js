import React from "react";
import TripHeader from "./Navigation/TripHeader";
import ButtonLink from "./Buttons/ButtonLink";
import BudgetCard from "./Cards/BudgetCard";
import useSortAscendingAlphabetical from "../hooks/useSortAscendingAlphabetical";
import { Container, CardContainer } from "./StyledComponents/Layout";
import { connect } from "react-redux";

const Trip = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);
  const budgetCategories = useSortAscendingAlphabetical(
    props.budgetCategories.filter(bCategory => bCategory.tripId === trip._id),
    "budgetCategory"
  );

  return (
    <React.Fragment>
      {trip && (
        <React.Fragment>
          <TripHeader
            title="Trip Budget"
            theme={props.theme}
            backTo={`/trip/${trip._id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          {props.budgetCategories.length > 0 && props.budgetItems.length > 0 && (
            <Container style={{ ...{ textAlign: "center" } }}>
              <ButtonLink
                to={`/trip-budget/${trip._id}/add-expense`}
                buttonText="Add Expense"
                buttonType="primary"
                theme={props.theme}
                customStyles={{
                  background: {
                    display: "inline-block",
                    width: "auto"
                  }
                }}
              />
            </Container>
          )}
          <CardContainer>
            {budgetCategories.length > 0 &&
              budgetCategories.map(budgetCategory => {
                return (
                  <BudgetCard
                    key={budgetCategory._id}
                    theme={props.theme}
                    budgetCategory={budgetCategory}
                    budgetItems={props.budgetItems}
                    expenses={props.expenses}
                  />
                );
              })}
          </CardContainer>
          <Container style={{ ...{ textAlign: "center" } }}>
            <ButtonLink
              to={`/trip-budget/${trip._id}/add-budget-category`}
              buttonText="Add Budget Category"
              buttonType={
                props.budgetCategories.length > 0 ? "secondary" : "primary"
              }
              theme={props.theme}
              customStyles={{
                background: {
                  display: "inline-block",
                  width: "auto"
                }
              }}
            />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    trips: state.trips,
    budgetCategories: state.budgetCategories,
    budgetItems: state.budgetItems,
    expenses: state.expenses,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Trip);
