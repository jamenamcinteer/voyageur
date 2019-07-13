import React from "react";
import Meter from "../Meters/Meter";
import ButtonLink from "../Buttons/ButtonLink";
import BudgetCardItem from "./BudgetCardItem";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import styled from "styled-components";

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
  margin: 20px 0 5px 0;
  display: flex;
  justify-content: space-between;
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

  return (
    <CardBackground>
      <CardHeader>
        <span>{props.budgetCategory.budgetCategory}</span>
        <ButtonLink
          to={`/trip/${props.budgetCategory.tripId}/budget-category/${
            props.budgetCategory._id
          }/edit`}
          theme={props.theme}
          buttonType="link"
          buttonText="Edit"
          customStyles={{
            background: {
              padding: "0 10px",
              margin: "0",
              width: "auto",
              fontSize: ".8em"
            }
          }}
        />
      </CardHeader>
      <Meter
        theme={props.theme}
        actual={useBudgetCalculation("actual", expenses)}
        budgeted={useBudgetCalculation("budgeted", budgetItems)}
      />
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
