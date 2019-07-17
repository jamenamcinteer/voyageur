import React from "react";
import Header from "./Header";
import Meter from "../Meters/Meter";
import moment from "moment";
import {} from "twix";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import styled from "styled-components";

const DestinationHeader = styled.h2`
  font-size: 1.7em;
  margin-top: 24px;
  margin-bottom: 20px;
`;
const DatesHeader = styled.h3`
  font-weight: normal;
  margin: 0;
`;
const BudgetHeader = styled.h3`
  font-weight: normal;
  margin: 0;
`;

const TripHeader = props => {
  const subheaderBackgroundStyles = {
    backgroundImage: `url(${
      props.trip.photo
    }&w=300&h=100&fit=crop&crop=focalpoint)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    filter: "brightness(0.6)",
    height: "150px"
  };
  const subheaderStyles = {
    height: "150px",
    padding: "0 20px",
    color: "#fff",
    fontSize: "1em",
    fontWeight: "normal",
    position: "absolute",
    width: "100%",
    top: "0"
  };
  const subheaderTextStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "10px"
  };

  const budgetItems = props.budgetItems.filter(
    bItem => bItem.tripId === props.trip._id
  );
  const expenses = props.expenses.filter(
    expense => expense.tripId === props.trip._id
  );

  const actual = useBudgetCalculation("actual", expenses);
  const budgeted = useBudgetCalculation("budgeted", budgetItems);

  const dates = moment(props.trip.startDate)
    .twix(props.trip.endDate, { allDay: true })
    .format({ monthFormat: "MMM", dayFormat: "D" });

  return (
    <div>
      {props.trip && (
        <div>
          <Header
            title={props.title}
            theme={props.theme}
            backTo={props.backTo}
            auth={props.auth}
          />
          <div style={{ position: "relative" }}>
            <div style={subheaderBackgroundStyles} />
            <div style={subheaderStyles}>
              <DestinationHeader>{props.trip.destination}</DestinationHeader>
              <div style={subheaderTextStyles}>
                <DatesHeader>{dates}</DatesHeader>
                <BudgetHeader>
                  ${Math.ceil(actual)} / ${Math.ceil(budgeted)}
                </BudgetHeader>
              </div>
              <Meter theme={props.theme} actual={actual} budgeted={budgeted} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripHeader;
