import React, { useState, useContext } from "react";
import { Store } from "../../Store";
import { withRouter } from "react-router-dom";
import TextInput from "../FormElements/TextInput";
import Textarea from "../FormElements/Textarea";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
import uniqid from "uniqid";
import {
  startAddBudgetCategory,
  startEditBudgetCategory,
  startRemoveBudgetCategory
} from "../../actions/budgetCategories";
import { startRemoveBudgetItem } from "../../actions/budgetItems";
import { startRemoveExpense } from "../../actions/expenses";
import Modal from "react-modal";
import { ModalText } from "../StyledComponents/Modals";
import { Container } from "../StyledComponents/Layout";
import { MainButtons, ButtonContainer } from "../StyledComponents/Forms";

const BudgetCategoryForm = props => {
  const { state, dispatch } = useContext(Store);

  const [budgetCategory, setBudgetCategory] = useState(
    props.budgetCategory ? props.budgetCategory.budgetCategory : ""
  );
  const [notes, setNotes] = useState(
    props.budgetCategory ? props.budgetCategory.notes : ""
  );
  const [deleteModal, setDeleteModal] = useState(false);

  // const trips = JSON.parse(localStorage.getItem("trips"));
  const trip = state.trips.find(trip => trip.id === props.match.params.id);

  const handleClick = () => {
    if (props.budgetCategory) {
      const updatedBudgetCategory = {
        ...props.budgetCategory,
        budgetCategory,
        notes
      };

      startEditBudgetCategory(
        props.budgetCategory.id,
        updatedBudgetCategory,
        state,
        dispatch
      );
      props.history.push(`/trip/${props.match.params.id}`);
    } else {
      const newBudgetCategory = {
        id: uniqid(),
        tripId: trip.id,
        budgetCategory,
        notes
      };

      startAddBudgetCategory(newBudgetCategory, state, dispatch);

      props.history.push(`/trip/${props.match.params.id}`);
    }
  };

  const deleteBudgetCategory = () => {
    startRemoveBudgetCategory(props.budgetCategory.id, state, dispatch);

    state.budgetItems.map(i => {
      if (i.budgetCategoryId === props.budgetCategory.id)
        startRemoveBudgetItem(i.id, state, dispatch);
      return true;
    });

    state.expenses.map(i => {
      if (i.budgetCategoryId === trip.id)
        startRemoveExpense(i.id, state, dispatch);
      return true;
    });

    props.history.push(`/trip/${props.match.params.id}`);
  };

  return (
    <Container>
      <TextInput
        theme={props.theme}
        label="Name of Budget Category"
        value={budgetCategory}
        handleChange={setBudgetCategory}
      />
      <Textarea
        theme={props.theme}
        label="Notes"
        value={notes}
        handleChange={setNotes}
      />
      <ButtonContainer showDelete={props.budgetCategory}>
        {props.budgetCategory && (
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
                Are you sure you want to permanently delete this budget category
                and all its budget items and expenses?
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
                  handleClick={deleteBudgetCategory}
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

export default withRouter(BudgetCategoryForm);
