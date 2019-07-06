import React, { useState, useContext } from "react";
import { Store } from "../../Store";
import { withRouter } from "react-router-dom";
import TextInput from "../FormElements/TextInput";
import Textarea from "../FormElements/Textarea";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
import uniqid from "uniqid";
import {
  startAddBudgetItem,
  startEditBudgetItem,
  startRemoveBudgetItem
} from "../../actions/budgetItems";
import { startRemoveExpense } from "../../actions/expenses";
import { Container } from "../StyledComponents/Layout";
import { ButtonContainer, MainButtons } from "../StyledComponents/Forms";
import Modal from "react-modal";
import { ModalText } from "../StyledComponents/Modals";

const BudgetItemForm = props => {
  const { state, dispatch } = useContext(Store);

  const [budgetItem, setBudgetItem] = useState(
    props.budgetItem ? props.budgetItem.budgetItem : ""
  );
  const [estimatedCost, setEstimatedCost] = useState(
    props.budgetItem ? props.budgetItem.estimatedCost : ""
  );
  const [notes, setNotes] = useState(
    props.budgetItem ? props.budgetItem.notes : ""
  );
  const [deleteModal, setDeleteModal] = useState(false);

  // const trips = JSON.parse(localStorage.getItem("trips"));
  const trip = state.trips.find(trip => trip.id === props.match.params.id);
  // const budgetCategories = JSON.parse(localStorage.getItem("budgetCategories"));
  const budgetCategory = state.budgetCategories.find(
    budgetCategory => budgetCategory.id === props.match.params.budgetCategoryId
  );

  const handleClick = () => {
    if (props.budgetItem) {
      const updatedBudgetItem = {
        ...props.budgetItem,
        budgetItem,
        estimatedCost,
        notes
      };

      startEditBudgetItem(
        props.budgetItem.id,
        updatedBudgetItem,
        state,
        dispatch
      );
      props.history.push(`/trip/${props.match.params.id}`);
    } else {
      const newBudgetItem = {
        id: uniqid(),
        tripId: trip.id,
        budgetCategoryId: budgetCategory.id,
        budgetItem,
        estimatedCost,
        notes
      };

      startAddBudgetItem(newBudgetItem, state, dispatch);

      props.history.push(`/trip/${props.match.params.id}`);
    }
  };

  const deleteBudgetItem = () => {
    startRemoveBudgetItem(props.budgetItem.id, state, dispatch);

    state.expenses.map(i => {
      if (i.budgetItemId === props.budgetItem.id)
        startRemoveExpense(i.id, state, dispatch);
      return true;
    });

    props.history.push(`/trip/${props.match.params.id}`);
  };

  return (
    <Container>
      <h3
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Roboto, sans-serif",
          fontWeight: "normal",
          color: props.theme.darkFont
        }}
      >
        <span>Budget Category: {budgetCategory.budgetCategory}</span>
        <ButtonLink
          to={`/trip/${props.match.params.id}`}
          theme={props.theme}
          buttonType="link"
          buttonText="Change"
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
      <TextInput
        theme={props.theme}
        label="Name of Budget Item"
        value={budgetItem}
        handleChange={setBudgetItem}
      />
      <TextInput
        theme={props.theme}
        label="Estimated Cost ($)"
        placeholder="0.00"
        value={estimatedCost}
        handleChange={setEstimatedCost}
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
                Are you sure you want to permanently delete this budget item and
                all its expenses?
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
                  handleClick={deleteBudgetItem}
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

export default withRouter(BudgetItemForm);
