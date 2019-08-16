import React, { useState } from "react";
import TextInput from "../FormElements/TextInput";
import Error from "../FormElements/Error";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
import {
  startAddChecklist,
  startEditChecklist,
  startRemoveChecklist
} from "../../actions/checklists";
import Modal from "react-modal";
import { ModalText } from "../StyledComponents/Modals";
import { Container } from "../StyledComponents/Layout";
import { MainButtons, ButtonContainer } from "../StyledComponents/Forms";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ChecklistForm = props => {
  const [name, setName] = useState(
    props.checklist ? props.checklist.name : "Checklist"
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const trip = props.trip;

  const handleClick = async () => {
    let errorsArr = [];
    if (!name) {
      errorsArr.push({
        field: "name",
        error: "Name of checklist is required."
      });
    }

    setErrors(errorsArr);
    if (errorsArr.length > 0) return;

    if (props.checklist) {
      const updatedChecklist = {
        ...props.checklist,
        name
      };

      await props.startEditChecklist(props.checklist._id, updatedChecklist);

      if (props.type === "todo") {
        props.history.push(`/trip-todo/${trip._id}`);
      }
      if (props.type === "packing") {
        props.history.push(`/trip-packing/${trip._id}`);
      }
    } else {
      const newChecklist = {
        tripId: trip._id,
        name,
        type: props.type
      };

      await props.startAddChecklist(newChecklist);

      if (props.type === "todo") {
        props.history.push(`/trip-todo/${trip._id}`);
      }
      if (props.type === "packing") {
        props.history.push(`/trip-packing/${trip._id}`);
      }
    }
  };

  const deleteChecklist = async () => {
    await props.startRemoveChecklist(props.checklist._id);

    if (props.type === "todo") {
      props.history.push(`/trip-todo/${trip._id}`);
    }
    if (props.type === "packing") {
      props.history.push(`/trip-packing/${trip._id}`);
    }
  };

  return (
    <Container>
      <TextInput
        label="Name of Checklist"
        value={name}
        handleChange={setName}
      />
      <Error errors={errors} field="name" dataTestid="nameError" />
      <ButtonContainer showDelete={props.checklist}>
        {props.checklist && (
          <React.Fragment>
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
              ariaHideApp={props.isTest ? false : true}
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
                Are you sure you want to permanently delete this checklist and
                all its items?
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
                  handleClick={deleteChecklist}
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
            to={
              props.type === "todo"
                ? `/trip-todo/${trip._id}`
                : `/trip-packing/${trip._id}`
            }
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
  startAddChecklist: updates => dispatch(startAddChecklist(updates)),
  startEditChecklist: (id, updates) =>
    dispatch(startEditChecklist(id, updates)),
  startRemoveChecklist: id => dispatch(startRemoveChecklist(id))
});

ChecklistForm.propTypes = {
  trip: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  checklist: PropTypes.object
};

export default connect(
  null,
  mapDispatchToProps
)(ChecklistForm);
