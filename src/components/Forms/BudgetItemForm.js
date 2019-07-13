import React, { useState } from "react";
import TextInput from "../FormElements/TextInput";
import Textarea from "../FormElements/Textarea";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
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
import styled from "styled-components";
import { connect } from "react-redux";

const BudgetCategoryHeader = styled.h3`
  display: flex;
  justify-content: space-between;
  font-weight: normal;
`;

const BudgetItemForm = props => {
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

  const trip = props.trip;
  const budgetCategory = props.budgetCategory;

  const handleClick = () => {
    if (props.budgetItem) {
      const updatedBudgetItem = {
        ...props.budgetItem,
        budgetItem,
        estimatedCost,
        notes
      };

      props.startEditBudgetItem(props.budgetItem._id, updatedBudgetItem);
      props.history.push(`/trip/${trip._id}`);
    } else {
      const newBudgetItem = {
        tripId: trip._id,
        budgetCategoryId: budgetCategory._id,
        budgetItem,
        estimatedCost,
        notes
      };

      props.startAddBudgetItem(newBudgetItem);

      props.history.push(`/trip/${trip._id}`);
    }
  };

  const deleteBudgetItem = () => {
    props.startRemoveBudgetItem(props.budgetItem._id);

    props.expenses.map(i => {
      if (i.budgetItemId === props.budgetItem._id)
        props.startRemoveExpense(i._id);
      return true;
    });

    props.history.push(`/trip/${trip._id}`);
  };

  return (
    <Container>
      <BudgetCategoryHeader>
        <span>Budget Category: {budgetCategory.budgetCategory}</span>
        <ButtonLink
          to={`/trip/${trip._id}`}
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
      </BudgetCategoryHeader>
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
            to={`/trip/${trip._id}`}
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

const mapDispatchToProps = (dispatch, props) => ({
  startAddBudgetItem: updates => dispatch(startAddBudgetItem(updates)),
  startEditBudgetItem: (id, updates) =>
    dispatch(startEditBudgetItem(id, updates)),
  startRemoveBudgetItem: id => dispatch(startRemoveBudgetItem(id)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

export default connect(
  null,
  mapDispatchToProps
)(BudgetItemForm);
