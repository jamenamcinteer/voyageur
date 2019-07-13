import React from "react";
import TripHeader from "./Navigation/TripHeader";
import TripForm from "./Forms/TripForm";
import { connect } from "react-redux";

const EditTrip = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  return (
    <div>
      {trip && (
        <div>
          <TripHeader
            title="Edit Trip"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
            budgetItems={props.budgetItems}
            expenses={props.expenses}
          />
          <TripForm theme={props.theme} trip={trip} history={props.history} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    trips: state.trips,
    budgetItems: state.budgetItems,
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(EditTrip);
