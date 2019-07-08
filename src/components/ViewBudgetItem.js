import React, { useContext } from "react";
import { Store } from "../Store";
import { withRouter, Link } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";
import { Container } from "./StyledComponents/Layout";
import ButtonLink from "./Buttons/ButtonLink";
import styled from "styled-components";
import useSortDescendingNumerical from "../hooks/useSortDescendingNumerical";
import moment from "moment";

const BudgetItemHeader = styled.h3`
  width: 100%;
  background: ${props => props.theme.themeColorSecondaryLight};
  color: ${props => props.theme.darkFont};
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  font-weight: normal;
  text-align: center;
  padding: 7px 0;
  margin-bottom: 0;
`;

const BudgetItemNotes = styled.p`
  border-bottom: 1px solid ${props => props.theme.themeColorSecondary};
  margin: 0;
  padding: 5px 20px;
  color: ${props => props.theme.lightFont};
  font-family: "Roboto", sans-serif;
  font-size: 1em;
  font-style: italic;
`;

const ExpenseItem = styled(Link)`
  border-bottom: 1px solid ${props => props.theme.themeColorSecondary};
  display: block;
  padding: 10px 20px;
  color: ${props => props.theme.darkFont};
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  font-weight: normal;
  text-decoration: none;
`;

const ExpenseItemFirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`;

const ExpenseItemSecondLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`;

const ExpenseItemDate = styled.div`
  color: ${props => props.theme.lightFont};
  font-family: "Roboto", sans-serif;
  font-size: 0.8em;
  font-weight: normal;
`;

const ExpenseItemEdit = styled.div`
  color: ${props => props.theme.themeColor};
  font-family: "Roboto", sans-serif;
  font-size: 0.8em;
  font-weight: normal;
  text-decoration: underline;
`;

const ExpenseItemSummary = styled.h4`
  font-family: "Roboto", sans-serif;
  font-size: 1em;
  font-weight: normal;
  margin: 0;
`;

const ExpenseItemCost = styled.div``;

const ExpenseItemNotes = styled.p`
  color: ${props => props.theme.lightFont};
  font-family: "Roboto", sans-serif;
  font-size: 0.8em;
  font-weight: normal;
  font-style: italic;
  margin: 0;
`;

const ViewBudgetItem = props => {
  const { state } = useContext(Store);

  const trip = state.trips.find(trip => trip.id === props.match.params.id);

  // const budgetCategory = state.budgetCategories.find(
  //   budgetCategory => budgetCategory.id === props.match.params.budgetCategoryId
  // );

  const budgetItem = state.budgetItems.find(
    budgetItem => budgetItem.id === props.match.params.budgetItemId
  );

  const expenses = useSortDescendingNumerical(
    state.expenses.filter(
      i => i.budgetItemId === props.match.params.budgetItemId
    ),
    "date"
  );

  return (
    <div>
      {budgetItem && (
        <div>
          <TripHeader
            title="Expenses"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
          />
          <Container style={{ ...{ textAlign: "center" } }}>
            <ButtonLink
              to={`/trip/${trip.id}/add-expense?budgetCategory=${
                props.match.params.budgetCategoryId
              }&budgetItem=${budgetItem.id}`}
              buttonText="Add Expense"
              buttonType="primary"
              theme={props.theme}
              customStyles={{
                background: {
                  display: "inline-block",
                  width: "auto"
                }
              }}
            />
          </Container>
          <BudgetItemHeader>{budgetItem.budgetItem}</BudgetItemHeader>
          <BudgetItemNotes>{budgetItem.notes}</BudgetItemNotes>
          {expenses &&
            expenses.length > 0 &&
            expenses.map(expense => {
              return (
                <ExpenseItem
                  key={expense.id}
                  to={`/trip/${expense.tripId}/budget-category/${
                    expense.budgetCategoryId
                  }/budget-item/${expense.budgetItemId}/expense/${expense.id}`}
                >
                  <ExpenseItemFirstLine>
                    <ExpenseItemDate>
                      {moment(expense.date).format("MMM D")}
                    </ExpenseItemDate>
                    <ExpenseItemEdit>Edit</ExpenseItemEdit>
                  </ExpenseItemFirstLine>
                  <ExpenseItemSecondLine>
                    <ExpenseItemSummary>{expense.summary}</ExpenseItemSummary>
                    <ExpenseItemCost>${expense.cost}</ExpenseItemCost>
                  </ExpenseItemSecondLine>
                  <ExpenseItemNotes>{expense.notes}</ExpenseItemNotes>
                </ExpenseItem>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default withRouter(ViewBudgetItem);
