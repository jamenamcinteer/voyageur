import React from "react";
import Meter from "../Meters/Meter";
import { Link } from "react-router-dom";
import {} from "twix";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import {
  ItinerarySVG,
  BudgetSVG,
  ToDoListSVG,
  PackingListSVG
} from "../StyledComponents/SVG";
import styled from "styled-components";
import PropTypes from "prop-types";

const CardBackground = styled.div`
  background-color: #fff;
  border: 1px solid ${props => props.theme.themeColorSecondary};
  display: flex;
  padding: 20px;
`;

const CardHeader = styled.h1`
  font-size: 1.2em;
  font-weight: normal;
  color: ${props => props.theme.darkFont};
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const ToolCard = props => {
  const actual = useBudgetCalculation(
    "actual",
    props.expenses ? props.expenses : []
  );
  const budgeted = useBudgetCalculation(
    "budgeted",
    props.budgetItems ? props.budgetItems : []
  );

  return (
    <Link to={props.to} style={{ textDecoration: "none" }}>
      <CardBackground>
        {props.type === "itinerary" && (
          <ItinerarySVG width="59px" height="59px" />
        )}
        {props.type === "budget" && <BudgetSVG width="50px" height="50px" />}
        {props.type === "todolist" && (
          <ToDoListSVG width="50px" height="50px" />
        )}
        {props.type === "packinglist" && (
          <PackingListSVG width="50px" height="50px" />
        )}
        <CardContent>
          <CardHeader>{props.title}</CardHeader>
          {props.type === "budget" && (
            <Meter actual={actual} budgeted={budgeted} />
          )}
        </CardContent>
      </CardBackground>
    </Link>
  );
};

ToolCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  expenses: PropTypes.array,
  budgetItems: PropTypes.array
};

export default ToolCard;
