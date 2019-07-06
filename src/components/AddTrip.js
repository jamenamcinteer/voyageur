import React from "react";
import { withRouter } from "react-router-dom";
import Header from "./Navigation/Header";
import TripForm from "./Forms/TripForm";

const AddTrip = props => {
  return (
    <div>
      <Header title="Add a Trip" theme={props.theme} backTo="/" />
      <TripForm theme={props.theme} />
    </div>
  );
};

export default withRouter(AddTrip);
