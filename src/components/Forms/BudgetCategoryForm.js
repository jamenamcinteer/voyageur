import React, { useState } from "react";
import TextInput from "../FormElements/TextInput";
import Textarea from "../FormElements/Textarea";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
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
import { connect } from "react-redux";

const BudgetCategoryForm = props => {
  const [budgetCategory, setBudgetCategory] = useState(
    props.budgetCategory ? props.budgetCategory.budgetCategory : ""
  );
  const [notes, setNotes] = useState(
    props.budgetCategory ? props.budgetCategory.notes : ""
  );
  const [deleteModal, setDeleteModal] = useState(false);

  const trip = props.trip;

  const handleClick = () => {
    if (props.budgetCategory) {
      const updatedBudgetCategory = {
        ...props.budgetCategory,
        budgetCategory,
        notes
      };

      props.startEditBudgetCategory(
        props.budgetCategory._id,
        updatedBudgetCategory
      );
      props.history.push(`/trip/${trip._id}`);
    } else {
      const newBudgetCategory = {
        // id: uniqid(),
        tripId: trip._id,
        budgetCategory,
        notes
      };

      props.startAddBudgetCategory(newBudgetCategory);

      props.history.push(`/trip/${trip._id}`);
    }
  };

  const deleteBudgetCategory = () => {
    props.startRemoveBudgetCategory(props.budgetCategory._id);

    props.budgetItems.map(i => {
      if (i.budgetCategoryId === props.budgetCategory._id)
        props.startRemoveBudgetItem(i._id);
      return true;
    });

    props.expenses.map(i => {
      if (i.budgetCategoryId === trip._id) props.startRemoveExpense(i._id);
      return true;
    });

    props.history.push(`/trip/${trip._id}`);
  };

  return (
    <Container>
      <TextInput
        label="Name of Budget Category"
        value={budgetCategory}
        handleChange={setBudgetCategory}
        placeholder="Example: Airfare, Food, Activities, etc."
      />
      <Textarea label="Notes" value={notes} handleChange={setNotes} />
      <ButtonContainer showDelete={props.budgetCategory}>
        {props.budgetCategory && (
          <div>
            <Button
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
                  handleClick={e => setDeleteModal(false)}
                  buttonText="Cancel"
                  buttonWidth="auto"
                  buttonType="link"
                  buttonDisplay="inline"
                  customStyles={{ background: { padding: "10px 0" } }}
                />
                <Button
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
  startAddBudgetCategory: updates => dispatch(startAddBudgetCategory(updates)),
  startEditBudgetCategory: (id, updates) =>
    dispatch(startEditBudgetCategory(id, updates)),
  startRemoveBudgetCategory: id => dispatch(startRemoveBudgetCategory(id)),
  startRemoveBudgetItem: id => dispatch(startRemoveBudgetItem(id)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

export default connect(
  null,
  mapDispatchToProps
)(BudgetCategoryForm);
