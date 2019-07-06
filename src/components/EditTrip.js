import React, { useContext } from "react";
import { Store } from "../Store";
import { withRouter } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";
import TripForm from "./Forms/TripForm";

const EditTrip = props => {
  const { state } = useContext(Store);
  // const trips = JSON.parse(localStorage.getItem("trips"));
  const trip = state.trips.find(trip => trip.id === props.match.params.id);

  return (
    <div>
      {trip && (
        <div>
          <TripHeader
            title="Edit Trip"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
          />
          <TripForm theme={props.theme} trip={trip} />
        </div>
      )}
    </div>
  );
};

export default withRouter(EditTrip);
