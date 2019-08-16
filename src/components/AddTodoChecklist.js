import React from "react";
import TripHeader from "./Navigation/TripHeader";
import { connect } from "react-redux";
import ChecklistForm from "./Forms/ChecklistForm";

const AddChecklist = props => {
  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  return (
    <React.Fragment>
      {trip && (
        <React.Fragment>
          <TripHeader
            title="Add Checklist"
            theme={props.theme}
            backTo={`/trip-todo/${trip._id}`}
            trip={trip}
            auth={props.auth}
          />
          <ChecklistForm type="todo" trip={trip} history={props.history} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  return {
    trips: state.trips,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AddChecklist);
