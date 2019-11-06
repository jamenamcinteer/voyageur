import React from "react";
import Header from "./Navigation/Header";
import TripForm from "./Forms/TripForm";
import { PageSection } from "./StyledComponents/Layout";
import { connect } from "react-redux";

const AddTrip = props => {
  return (
    <React.Fragment>
      <Header
        title="Add a Trip"
        theme={props.theme}
        backTo="/"
        auth={props.auth}
      />
      <PageSection>
        <TripForm theme={props.theme} history={props.history} />
      </PageSection>
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AddTrip);
