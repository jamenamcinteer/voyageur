import React from "react";
import Header from "./Header";
import Meter from "../Meters/Meter";
import moment from "moment";
import {} from "twix";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";

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
    fontFamily: "Roboto, sans-serif",
    fontWeight: "normal",
    position: "absolute",
    width: "100%",
    top: "0"
  };
  const subheaderTextStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "90px"
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
          />
          <div style={{ position: "relative" }}>
            <div style={subheaderBackgroundStyles} />
            <div style={subheaderStyles}>
              <div style={subheaderTextStyles}>
                <h2>{props.trip.destination}</h2>
                <h3>{dates}</h3>
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
