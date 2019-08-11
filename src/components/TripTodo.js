import React from "react";
import TripHeader from "./Navigation/TripHeader";
import ButtonLink from "./Buttons/ButtonLink";
import { Container } from "./StyledComponents/Layout";
import { connect } from "react-redux";

const TripTodo = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  return (
    <React.Fragment>
      {trip && (
        <React.Fragment>
          <TripHeader
            title="To Do List"
            theme={props.theme}
            backTo={`/trip/${trip._id}`}
            trip={trip}
            auth={props.auth}
          />
          {props.budgetCategories.length > 0 && props.budgetItems.length > 0 && (
            <Container style={{ ...{ textAlign: "center" } }}>
              <ButtonLink
                to={`/trip-todo/${trip._id}/add-checklist`}
                buttonText="Add Checklist"
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
    auth: state.auth,
    checklists: state.checklists
  };
};

export default connect(mapStateToProps)(TripTodo);
