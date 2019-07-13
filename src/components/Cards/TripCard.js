import React from "react";
import Meter from "../Meters/Meter";
import { Link } from "react-router-dom";
import moment from "moment";
import {} from "twix";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import styled from "styled-components";

const CardBackground = styled.div`
  background-color: #fff;
  border: 1px solid ${props => props.theme.themeColorSecondary};
  margin: 20px 0;
  padding: 20px;
`;

const CardHeader = styled.h1`
  font-size: 1.2em;
  font-weight: normal;
`;

const CardSubheader = styled.h2`
  font-size: 1em;
  font-weight: normal;
`;

const CardImageContainer = styled.div`
  width: calc(100% + 40px);
  margin: -20px -20px 0 -20px;
  position: relative;
`;

const TripCard = props => {
  const actual = useBudgetCalculation("actual", props.expenses);
  const budgeted = useBudgetCalculation("budgeted", props.budgetItems);

  const dates = moment(props.startDate)
    .twix(props.endDate, { allDay: true })
    .format({ monthFormat: "MMM", dayFormat: "D" });
  return (
    <Link to={props.to} style={{ textDecoration: "none" }}>
      <CardBackground>
        <CardImageContainer>
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
        </CardImageContainer>
        <CardHeader>{props.destination}</CardHeader>
        <CardSubheader>{dates}</CardSubheader>
        <Meter theme={props.theme} actual={actual} budgeted={budgeted} />
      </CardBackground>
    </Link>
  );
};

export default TripCard;
