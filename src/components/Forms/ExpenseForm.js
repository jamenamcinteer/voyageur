import React, { useState, useEffect } from "react";
import TextInput from "../FormElements/TextInput";
import Select from "../FormElements/Select";
import Textarea from "../FormElements/Textarea";
import Error from "../FormElements/Error";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
import { startAddExpense, startEditExpense } from "../../actions/expenses";
import { startRemoveExpense } from "../../actions/expenses";
import { Container } from "../StyledComponents/Layout";
import { ButtonContainer, MainButtons } from "../StyledComponents/Forms";
import Modal from "react-modal";
import { ModalText } from "../StyledComponents/Modals";
import moment from "moment";
import { connect } from "react-redux";
import { SingleDatePicker } from "react-dates";
import styled from "styled-components";
import PropTypes from "prop-types";

const DateLabel = styled.h4`
  font-size: 0.8em;
  font-weight: bold;
  margin-bottom: 0;
`;

const ExpenseForm = props => {
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
    props.expense ? moment(props.expense.date) : null
  );
  const [notes, setNotes] = useState(props.expense ? props.expense.notes : "");
  const [deleteModal, setDeleteModal] = useState(false);
  const [focused, setFocused] = useState(false);
  const [errors, setErrors] = useState([]);

  const trip = props.trip;
  const budgetCategories = props.budgetCategories.filter(
    bCategory => bCategory.tripId === trip._id
  );

  const budgetCategoryOptions = budgetCategories.map(bCategory => {
    return {
      value: bCategory._id,
      text: bCategory.budgetCategory
    };
  });

  useEffect(() => {
    if (budgetItemId)
      setBudgetItemOptions(
        props.budgetItems.map(bItem => {
          return {
            value: bItem._id,
            text: bItem.budgetItem
          };
        })
      );
  }, [props.budgetItems, budgetItemId]);

  const currencyOptions = [
    {
      value: "USD",
      text: "USD ($)",
      symbol: "$"
    }
    // {
    //   value: "EUR",
    //   text: "EUR (€)",
    //   symbol: "€"
    // },
    // {
    //   value: "GBP",
    //   text: "GBP (£)",
    //   symbol: "£"
    // }
  ];

  const handleClick = () => {
    // validation
    let errorsArr = [];
    if (!budgetCategoryId) {
      errorsArr.push({
        field: "budgetCategory",
        error: "Budget category is required."
      });
    }
    if (!budgetItemId) {
      errorsArr.push({
        field: "budgetItem",
        error: "Budget item is required."
      });
    }
    if (!summary) {
      errorsArr.push({
        field: "summary",
        error: "Summary is required."
      });
    }
    if (!currency) {
      errorsArr.push({
        field: "currency",
        error: "Currency is required."
      });
    }
    if (parseFloat(cost).toFixed(2) === "NaN") {
      errorsArr.push({
        field: "amount",
        error: "Amount spent must be a valid amount."
      });
    }
    if (isNaN(moment(date).valueOf())) {
      errorsArr.push({
        field: "date",
        error: "Date must be valid."
      });
    }

    setErrors(errorsArr);
    if (errorsArr.length > 0) return;

    if (props.expense) {
      const updatedExpense = {
        ...props.expense,
        budgetCategoryId,
        budgetItemId,
        summary,
        currency,
        originalCost: parseFloat(cost).toFixed(2),
        cost: parseFloat(cost).toFixed(2),
        date: moment(date).valueOf(),
        notes
      };

      props.startEditExpense(props.expense._id, updatedExpense);

      props.history.push(`/trip/${trip._id}`);
    } else {
      const newExpense = {
        tripId: trip._id,
        budgetCategoryId,
        budgetItemId,
        summary,
        currency,
        originalCost: parseFloat(cost).toFixed(2),
        cost: parseFloat(cost).toFixed(2),
        date: moment(date).valueOf(),
        notes
      };

      props.startAddExpense(newExpense);

      props.history.push(`/trip/${trip._id}`);
    }
  };

  const handleBudgetCategoryChange = newValue => {
    setBudgetCategoryId(newValue);

    const budgetItems = props.budgetItems.filter(
      bItem => bItem.budgetCategoryId === newValue
    );

    setBudgetItemOptions(
      budgetItems.map(bItem => {
        return {
          value: bItem._id,
          text: bItem.budgetItem
        };
      })
    );
  };

  const deleteExpense = () => {
    startRemoveExpense(props.expense._id);

    props.history.push(`/trip/${trip._id}`);
  };

  return (
    <Container>
      <Select
        label="Budget Category"
        value={budgetCategoryId}
        options={budgetCategoryOptions}
        placeholder="Select category..."
        handleChange={handleBudgetCategoryChange}
      />
      {/* {errors.find(err => err.field === "budgetCategory") && (
        <Error>
          {errors.find(err => err.field === "budgetCategory").error}
        </Error>
      )} */}
      {/* {errors.filter(err => err.field === "budgetCategory").length > 0 &&
        errors.map((err, index) => {
          if (err.field === "budgetCategory") {
            return <StyledError key={index}>{err.error}</StyledError>;
          }
          return true;
        })} */}
      <Error
        errors={errors}
        field="budgetCategory"
        dataTestid="budgetCategoryError"
      />
      <Select
        label="Budget Item"
        value={budgetItemId}
        options={budgetItemOptions}
        placeholder="Select budget item..."
        handleChange={setBudgetItemId}
      />
      <Error errors={errors} field="budgetItem" dataTestid="budgetItemError" />
      <TextInput
        label="Summary of Expense"
        value={summary}
        handleChange={setSummary}
      />
      <Error errors={errors} field="summary" dataTestid="summaryError" />
      <Select
        label="Currency"
        value={currency}
        options={currencyOptions}
        handleChange={setCurrency}
      />
      <Error errors={errors} field="currency" dataTestid="currencyError" />
      <TextInput
        label={`Amount Spent (${
          currencyOptions.find(
            currencyOption => currencyOption.value === currency
          ).symbol
        })`}
        placeholder="0.00"
        value={cost}
        handleChange={setCost}
      />
      <Error errors={errors} field="amount" dataTestid="amountError" />
      <DateLabel>Date of Expense</DateLabel>
      <SingleDatePicker
        id="date"
        date={date}
        onDateChange={date => {
          setDate(date);
        }}
        focused={focused}
        onFocusChange={({ focused }) => {
          setFocused(focused);
        }}
        orientation="horizontal"
        numberOfMonths={1}
        isOutsideRange={() => false}
      />
      <Error
        errors={errors}
        field="date"
        style={{ marginTop: "10px" }}
        dataTestid="dateError"
      />
      <Textarea
        label="Notes (optional)"
        value={notes}
        handleChange={setNotes}
      />
      <ButtonContainer showDelete={props.expense}>
        {props.expense && (
          <React.Fragment>
            <Button
              handleClick={e => setDeleteModal(true)}
              buttonText="Delete"
              buttonWidth="auto"
              buttonType="delete"
              buttonDisplay="inline"
              customStyles={{ background: { padding: "10px 0", textAlign: "left" } }}
            />
            <Modal
              ariaHideApp={props.isTest ? false : true}
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
                  handleClick={e => setDeleteModal(false)}
                  buttonText="Cancel"
                  buttonWidth="auto"
                  buttonType="link"
                  buttonDisplay="inline"
                  customStyles={{ background: { padding: "10px 0" } }}
                  dataTestid="closeModal"
                />
                <Button
                  handleClick={deleteExpense}
                  buttonText="Yes, Delete"
                  buttonWidth="auto"
                  buttonType="primary"
                  buttonDisplay="inline"
                />
              </MainButtons>
            </Modal>
          </React.Fragment>
        )}
        <MainButtons>
          <ButtonLink
            to={`/trip/${trip._id}`}
            buttonText="Cancel"
            buttonWidth="auto"
            buttonType="link"
            buttonDisplay="inline"
            customStyles={{ background: { padding: "10px 0" } }}
          />
          <Button
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

const mapDispatchToProps = (dispatch, props) => ({
  startAddExpense: updates => dispatch(startAddExpense(updates)),
  startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

ExpenseForm.propTypes = {
  trip: PropTypes.object.isRequired,
  budgetCategories: PropTypes.array.isRequired,
  budgetItems: PropTypes.array.isRequired,
  expense: PropTypes.object,
  budgetCategoryId: PropTypes.string,
  budgetItemId: PropTypes.string
};

export default connect(
  null,
  mapDispatchToProps
)(ExpenseForm);
