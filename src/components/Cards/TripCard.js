import React from "react";
import Meter from "../Meters/Meter";
import { Link } from "react-router-dom";
import moment from "moment";
import {} from "twix";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";

const TripCard = props => {
  const backgroundStyles = {
    backgroundColor: "#ffffff",
    border: `1px solid ${props.theme.themeColorSecondary}`,
    margin: "20px 0",
    padding: "20px"
  };
  const headerStyles = {
    fontSize: "1.2em",
    fontFamily: "Roboto",
    fontWeight: "normal",
    color: props.theme.darkFont
  };
  const subheaderStyles = {
    fontSize: "1em",
    fontFamily: "Roboto",
    fontWeight: "normal",
    color: props.theme.darkFont
  };
  const imageStyles = {
    width: "calc(100% + 40px)",
    margin: "-20px -20px 0 -20px",
    position: "relative"
  };

  const actual = useBudgetCalculation("actual", props.expenses);
  const budgeted = useBudgetCalculation("budgeted", props.budgetItems);

  const dates = moment(props.startDate)
    .twix(props.endDate, { allDay: true })
    .format({ monthFormat: "MMM", dayFormat: "D" });
  return (
    <Link to={props.to} style={{ textDecoration: "none" }}>
      <div style={backgroundStyles}>
        <div style={imageStyles}>
          <img
            src={`${props.photo}&w=333&h=200&fit=crop&crop=focalpoint`}
            alt=""
            style={{ width: "100%", height: "200px" }}
          />
          <figcaption
            style={{
              position: "absolute",
              bottom: "4px",
              backgroundColor: "#333",
              color: "#FFF",
              opacity: ".7",
              padding: "5px",
              width: "100%",
              fontSize: ".75em"
            }}
            dangerouslySetInnerHTML={{ __html: props.photoAttribution }}
          />
        </div>
        <h1 style={headerStyles}>{props.destination}</h1>
        <h2 style={subheaderStyles}>{dates}</h2>
        <Meter theme={props.theme} actual={actual} budgeted={budgeted} />
      </div>
    </Link>
  );
};

export default TripCard;
