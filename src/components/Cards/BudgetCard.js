import React, { useContext } from "react";
import { Store } from "../../Store";
import Meter from "../Meters/Meter";
import ButtonLink from "../Buttons/ButtonLink";
import BudgetCardItem from "./BudgetCardItem";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";

const BudgetCard = props => {
  const { state } = useContext(Store);
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
    color: props.theme.darkFont,
    margin: "20px 0 5px 0",
    display: "flex",
    justifyContent: "space-between"
  };

  const budgetItems = state.budgetItems.filter(
    bItem => bItem.budgetCategoryId === props.budgetCategory.id
  );
  const expenses = state.expenses.filter(
    expense => expense.budgetCategoryId === props.budgetCategory.id
  );

  return (
    <div style={backgroundStyles}>
      <h3 style={{ ...headerStyles, ...{ marginTop: "0" } }}>
        <span>{props.budgetCategory.budgetCategory}</span>
        <ButtonLink
          to={`/trip/${props.budgetCategory.tripId}/budget-category/${
            props.budgetCategory.id
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
      </h3>
      <Meter
        theme={props.theme}
        actual={useBudgetCalculation("actual", expenses)}
        budgeted={useBudgetCalculation("budgeted", budgetItems)}
      />
      <hr
        style={{
          border: `1px solid ${props.theme.themeColorSecondary}`,
          margin: "20px 0"
        }}
      />
      {budgetItems.length > 0 &&
        budgetItems.map(budgetItem => (
          <BudgetCardItem
            key={budgetItem.id}
            theme={props.theme}
            budgetItem={budgetItem}
          />
        ))}
      <div style={{ textAlign: "center" }}>
        <ButtonLink
          to={`/trip/${props.budgetCategory.tripId}/budget-category/${
            props.budgetCategory.id
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
    </div>
  );
};

export default BudgetCard;
