import React from "react";
import Header from "./Header";
import moment from "moment";
import {} from "twix";
import styled from "styled-components";
import PropTypes from "prop-types";

const DestinationHeader = styled.h2`
  font-size: 1.7em;
  margin: 0;
`;
const DatesHeader = styled.h3`
  font-weight: normal;
  margin: 0;
  margin-top: 10px;
`;

const SubheaderContaienr = styled.div`
  position: relative;
`;

const SubheaderBackground = styled.div`
  background-image: url("${props =>
    props.photo}&w=300&h=100&fit=crop&crop=focalpoint");
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(0.6);
  height: 150px;
`;

const Subheader = styled.div`
  height: 150px;
  padding: 0 20px;
  color: #fff;
  font-size: 1em;
  font-weight: normal;
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubheaderText = styled.div``;

const TripHeader = props => {
  const dates = moment(props.trip.startDate)
    .twix(props.trip.endDate, { allDay: true })
    .format({ monthFormat: "MMM", dayFormat: "D" });

  return (
    <React.Fragment>
      {props.trip && (
        <React.Fragment>
          <Header title={props.title} backTo={props.backTo} auth={props.auth} />
          <SubheaderContaienr>
            <SubheaderBackground photo={props.trip.photo} />
            <Subheader>
              <DestinationHeader>{props.trip.destination}</DestinationHeader>
              <SubheaderText>
                <DatesHeader>{dates}</DatesHeader>
              </SubheaderText>
            </Subheader>
          </SubheaderContaienr>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

TripHeader.propTypes = {
  trip: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  backTo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default TripHeader;
