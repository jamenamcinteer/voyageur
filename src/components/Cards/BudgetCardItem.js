import React from "react";
import Meter from "../Meters/Meter";
import ButtonLink from "../Buttons/ButtonLink";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import styled from "styled-components";

const CardHeader = styled.h3`
  font-size: 1.2em;
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: ${props => props.theme.darkFont};
  margin: 20px 0 5px 0;
  display: flex;
  justify-content: space-between;
`;

const BudgetCardItem = props => {
  const expenses = props.expenses.filter(
    expense =>
      expense.budgetCategoryId === props.budgetItem.budgetCategoryId &&
      expense.budgetItemId === props.budgetItem._id
  );

  const actual = useBudgetCalculation("actual", expenses);
  return (
    <div>
      <CardHeader>
        <span>{props.budgetItem.budgetItem}</span>
        <ButtonLink
          to={`/trip/${props.budgetItem.tripId}/budget-category/${
            props.budgetItem.budgetCategoryId
          }/budget-item/${props.budgetItem._id}`}
          theme={props.theme}
          buttonType="link"
          buttonText="View Expenses"
          customStyles={{
            background: {
              padding: "0 10px",
              margin: "0",
              width: "auto",
              fontSize: ".8em"
            }
          }}
        />
        <ButtonLink
          to={`/trip/${props.budgetItem.tripId}/budget-category/${
            props.budgetItem.budgetCategoryId
          }/budget-item/${props.budgetItem._id}/edit`}
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
        actual={actual}
        budgeted={props.budgetItem.estimatedCost}
      />
    </div>
  );
};

export default BudgetCardItem;
