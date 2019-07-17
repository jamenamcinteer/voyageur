import React from "react";
import { Link } from "react-router-dom";
import Meter from "../Meters/Meter";
import ButtonLink from "../Buttons/ButtonLink";
import BudgetCardItem from "./BudgetCardItem";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import styled from "styled-components";
import theme from "../../theme";

const CardBackground = styled.div`
  background-color: #ffffff;
  border: 1px solid ${props => props.theme.themeColorSecondary};
  margin: 20px 0;
  margin-top: 0;
  padding: 20px;
`;

const CardHeader = styled.h3`
  font-size: 1.2em;
  font-weight: normal;
  // margin: 20px 0 5px 0;
  margin: 0 0 5px 0;
  display: flex;
  justify-content: space-between;
`;

const BudgetAmount = styled.span`
  font-size: 0.8em;
`;

const MeterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PencilLink = styled(Link)`
  margin-right: -5px;
  margin-left: 5px;
`;

const Divider = styled.hr`
  border: 1px solid ${props => props.theme.themeColorSecondary};
  margin: 20px 0;
`;

const BudgetCard = props => {
  const budgetItems = props.budgetItems.filter(
    bItem => bItem.budgetCategoryId === props.budgetCategory._id
  );
  const expenses = props.expenses.filter(
    expense => expense.budgetCategoryId === props.budgetCategory._id
  );

  const svgStyles = {
    fill: theme.themeColor,
    padding: "5px",
    width: "30px",
    display: "block"
  };

  return (
    <CardBackground>
      <CardHeader>
        <span>{props.budgetCategory.budgetCategory}</span>
        <BudgetAmount>
          ${Math.ceil(useBudgetCalculation("actual", expenses))} / $
          {Math.ceil(useBudgetCalculation("budgeted", budgetItems))}
        </BudgetAmount>
      </CardHeader>
      <MeterContainer>
        <Meter
          theme={props.theme}
          actual={useBudgetCalculation("actual", expenses)}
          budgeted={useBudgetCalculation("budgeted", budgetItems)}
        />
        <PencilLink
          to={`/trip/${props.budgetCategory.tripId}/budget-category/${
            props.budgetCategory._id
          }/edit`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 528.899 528.899"
            aria-label="Edit"
            style={svgStyles}
          >
            <path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z" />
          </svg>
        </PencilLink>
      </MeterContainer>
      <Divider />
      {budgetItems.length > 0 &&
        budgetItems.map(budgetItem => (
          <BudgetCardItem
            key={budgetItem._id}
            theme={props.theme}
            budgetItem={budgetItem}
            expenses={expenses}
          />
        ))}
      <div style={{ textAlign: "center" }}>
        <ButtonLink
          to={`/trip/${props.budgetCategory.tripId}/budget-category/${
            props.budgetCategory._id
          }/add-budget-item`}
          buttonText="Add Budget Item"
          buttonType="secondary"
          theme={props.theme}
          customStyles={{
            background: {
              display: "inline-block",
              width: "auto",
              margin: "20px 0 0 0"
            }
          }}
        />
      </div>
    </CardBackground>
  );
};

export default BudgetCard;
