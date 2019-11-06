import React from "react";
import TripHeader from "./Navigation/TripHeader";
import TripForm from "./Forms/TripForm";
import { PageSection } from "./StyledComponents/Layout";
import { connect } from "react-redux";

const EditTrip = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  return (
    <React.Fragment>
      {trip && (
        <React.Fragment>
          <TripHeader
            title="Edit Trip"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          <PageSection>
            <TripForm theme={props.theme} trip={trip} history={props.history} />
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
    expenses: state.expenses,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(EditTrip);
