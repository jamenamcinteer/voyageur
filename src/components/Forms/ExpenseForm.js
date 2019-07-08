import React, { useState, useContext, useEffect } from "react";
import { Store } from "../../Store";
import { withRouter } from "react-router-dom";
import TextInput from "../FormElements/TextInput";
import Select from "../FormElements/Select";
import Textarea from "../FormElements/Textarea";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
import uniqid from "uniqid";
import { startAddExpense, startEditExpense } from "../../actions/expenses";
import { startRemoveExpense } from "../../actions/expenses";
import { Container } from "../StyledComponents/Layout";
import { ButtonContainer, MainButtons } from "../StyledComponents/Forms";
import Modal from "react-modal";
import { ModalText } from "../StyledComponents/Modals";
import moment from "moment";

const ExpenseForm = props => {
  const { state, dispatch } = useContext(Store);

  const [budgetCategoryId, setBudgetCategoryId] = useState(
    props.expense
      ? props.expense.budgetCategoryId
      : props.budgetCategoryId
      ? props.budgetCategoryId
      : ""
  );
  const [budgetItemOptions, setBudgetItemOptions] = useState([]);
  const [budgetItemId, setBudgetItemId] = useState(
    props.expense
      ? props.expense.budgetItemId
      : props.budgetItemId
      ? props.budgetItemId
      : ""
  );
  const [summary, setSummary] = useState(
    props.expense ? props.expense.summary : ""
  );
  const [currency, setCurrency] = useState(
    props.expense ? props.expense.currency : "USD"
  );
  const [cost, setCost] = useState(props.expense ? props.expense.cost : "");
  const [date, setDate] = useState(
    props.expense ? moment(props.expense.date).format("MM/DD/YY") : ""
  );
  const [notes, setNotes] = useState(props.expense ? props.expense.notes : "");
  const [deleteModal, setDeleteModal] = useState(false);

  const trip = state.trips.find(trip => trip.id === props.match.params.id);
  const budgetCategories = state.budgetCategories.filter(
    bCategory => bCategory.tripId === trip.id
  );

  const budgetCategoryOptions = budgetCategories.map(bCategory => {
    return {
      value: bCategory.id,
      text: bCategory.budgetCategory
    };
  });

  useEffect(() => {
    if (budgetItemId)
      setBudgetItemOptions(
        state.budgetItems.map(bItem => {
          return {
            value: bItem.id,
            text: bItem.budgetItem
          };
        })
      );
  }, [state.budgetItems, budgetItemId]);

  const currencyOptions = [
    {
      value: "USD",
      text: "USD ($)",
      symbol: "$"
    },
    {
      value: "EUR",
      text: "EUR (€)",
      symbol: "€"
    },
    {
      value: "GBP",
      text: "GBP (£)",
      symbol: "£"
    }
  ];

  const handleClick = () => {
    if (props.expense) {
      const updatedExpense = {
        ...props.expense,
        budgetCategoryId,
        budgetItemId,
        summary,
        currency,
        originalCost: cost,
        cost,
        date: moment(date).valueOf(),
        notes
      };

      startEditExpense(props.expense.id, updatedExpense, state, dispatch);

      props.history.push(`/trip/${props.match.params.id}`);
    } else {
      const newExpense = {
        id: uniqid(),
        tripId: trip.id,
        budgetCategoryId,
        budgetItemId,
        summary,
        currency,
        originalCost: cost,
        cost,
        date: moment(date).valueOf(),
        notes
      };

      startAddExpense(newExpense, state, dispatch);

      props.history.push(`/trip/${props.match.params.id}`);
    }
  };

  const handleBudgetCategoryChange = newValue => {
    setBudgetCategoryId(newValue);

    const budgetItems = state.budgetItems.filter(
      bItem => bItem.budgetCategoryId === newValue
    );

    setBudgetItemOptions(
      budgetItems.map(bItem => {
        return {
          value: bItem.id,
          text: bItem.budgetItem
        };
      })
    );
  };

  const deleteExpense = () => {
    startRemoveExpense(props.expense.id, state, dispatch);

    props.history.push(`/trip/${props.match.params.id}`);
  };

  return (
    <Container>
      <Select
        theme={props.theme}
        label="Budget Category"
        value={budgetCategoryId}
        options={budgetCategoryOptions}
        placeholder="Select category..."
        handleChange={handleBudgetCategoryChange}
      />
      <Select
        theme={props.theme}
        label="Budget Item"
        value={budgetItemId}
        options={budgetItemOptions}
        placeholder="Select budget item..."
        handleChange={setBudgetItemId}
      />
      <TextInput
        theme={props.theme}
        label="Summary of Expense"
        value={summary}
        handleChange={setSummary}
      />
      <Select
        theme={props.theme}
        label="Currency"
        value={currency}
        options={currencyOptions}
        handleChange={setCurrency}
      />
      <TextInput
        theme={props.theme}
        label={`Amount Spent (${
          currencyOptions.find(
            currencyOption => currencyOption.value === currency
          ).symbol
        })`}
        placeholder="0.00"
        value={cost}
        handleChange={setCost}
      />
      <TextInput
        theme={props.theme}
        label="Date of Expense"
        value={date}
        handleChange={setDate}
      />
      <Textarea
        theme={props.theme}
        label="Notes"
        value={notes}
        handleChange={setNotes}
      />
      <ButtonContainer showDelete={props.budgetItem}>
        {props.budgetItem && (
          <div>
            <Button
              theme={props.theme}
              handleClick={e => setDeleteModal(true)}
              buttonText="Delete"
              buttonWidth="auto"
              buttonType="delete"
              buttonDisplay="inline"
              customStyles={{ background: { padding: "10px 0" } }}
            />
            <Modal
              isOpen={deleteModal}
              onRequestClose={e => setDeleteModal(false)}
              contentLabel="Delete Modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0,0,0,.5)"
                },
                content: {
                  borderRadius: "0",
                  minHeight: "20vh",
                  maxHeight: "40vh",
                  overflowY: "auto",
                  width: "80vw",
                  top: "30vh",
                  left: "10vw",
                  right: "auto",
                  bottom: "auto"
                }
              }}
            >
              <ModalText>
                Are you sure you want to permanently delete this expense?
              </ModalText>
              <MainButtons>
                <Button
                  theme={props.theme}
                  handleClick={e => setDeleteModal(false)}
                  buttonText="Cancel"
                  buttonWidth="auto"
                  buttonType="link"
                  buttonDisplay="inline"
                  customStyles={{ background: { padding: "10px 0" } }}
                />
                <Button
                  theme={props.theme}
                  handleClick={deleteExpense}
                  buttonText="Yes, Delete"
                  buttonWidth="auto"
                  buttonType="primary"
                  buttonDisplay="inline"
                />
              </MainButtons>
            </Modal>
          </div>
        )}
        <MainButtons>
          <ButtonLink
            theme={props.theme}
            to={`/trip/${props.match.params.id}`}
            buttonText="Cancel"
            buttonWidth="auto"
            buttonType="link"
            buttonDisplay="inline"
            customStyles={{ background: { padding: "10px 0" } }}
          />
          <Button
            theme={props.theme}
            buttonText="Save"
            buttonWidth="auto"
            buttonDisplay="inline"
            handleClick={handleClick}
          />
        </MainButtons>
      </ButtonContainer>
    </Container>
  );
};

export default withRouter(ExpenseForm);
