import React, { useContext } from "react";
import { Store } from "../../Store";
import Meter from "../Meters/Meter";
import ButtonLink from "../Buttons/ButtonLink";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";

const BudgetCardItem = props => {
  const { state } = useContext(Store);
  const headerStyles = {
    fontSize: "1.2em",
    fontFamily: "Roboto",
    fontWeight: "normal",
    color: props.theme.darkFont,
    margin: "20px 0 5px 0",
    display: "flex",
    justifyContent: "space-between"
  };

  const expenses = state.expenses.filter(
    expense =>
      expense.budgetCategoryId === props.budgetItem.budgetCategoryId &&
      expense.budgetItemId === props.budgetItem.id
  );

  const actual = useBudgetCalculation("actual", expenses);
  return (
    <div>
      <h3 style={headerStyles}>
        <span>{props.budgetItem.budgetItem}</span>
        <ButtonLink
          to={`/trip/${props.budgetItem.tripId}/budget-category/${
            props.budgetItem.budgetCategoryId
          }/budget-item/${props.budgetItem.id}`}
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
          }/budget-item/${props.budgetItem.id}/edit`}
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
      </h3>
      <Meter
        theme={props.theme}
        actual={actual}
        budgeted={props.budgetItem.estimatedCost}
      />
    </div>
  );
};

export default BudgetCardItem;
