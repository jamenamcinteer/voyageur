import React from "react";
import Header from "./Navigation/Header";
import TripForm from "./Forms/TripForm";

const AddTrip = props => {
  return (
    <div>
      <Header title="Add a Trip" theme={props.theme} backTo="/" />
      <TripForm theme={props.theme} history={props.history} />
    </div>
  );
};

export default AddTrip;
