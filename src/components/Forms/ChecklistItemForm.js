import React, { useState } from "react";
import TextInput from "../FormElements/TextInput";
import Error from "../FormElements/Error";
import Button from "../Buttons/Button";
import { startEditChecklist } from "../../actions/checklists";
import { MainButtons } from "../StyledComponents/Forms";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ChecklistItemForm = props => {
  const [name, setName] = useState(
    props.checklistItem ? props.checklistItem.name : ""
  );
  const [fieldKey, setFieldKey] = useState(Math.random());
  const [errors, setErrors] = useState([]);

  const handleClick = async () => {
    let errorsArr = [];
    if (!name) {
      errorsArr.push({
        field: "name",
        error: "Name of checklist item is required."
      });
    }

    setErrors(errorsArr);
    if (errorsArr.length > 0) return;

    let updatedChecklist = {};

    if (props.checklistItem) {
      updatedChecklist = {
        ...props.checklist,
        items: [
          ...props.checklist.items,
          {
            ...props.checklistItem,
            name
          }
        ]
      };
    } else {
      updatedChecklist = {
        ...props.checklist,
        items: [
          ...props.checklist.items,
          {
            name,
            completed: false
          }
        ]
      };
    }

    await props.startEditChecklist(props.checklist._id, updatedChecklist);
    if (!props.checklistItem) {
      // clear out the field, and set the key so it re-renders
      setName("");
      setFieldKey(Math.random());
    }
  };

  // const deleteChecklistItem = async () => {
  //   console.log(props.checklist.items);
  // const updatedChecklist = {
  //   ...props.checklist,
  //   items: [...props.checklist.items]
  // };

  // await props.startEditChecklist(updatedChecklist);
  // };

  return (
    <React.Fragment>
      <TextInput
        label="Name of Item"
        value={name}
        handleChange={setName}
        placeholder="Add item..."
        styleType="thin"
        key={fieldKey}
      />
      <Error errors={errors} field="name" dataTestid="nameError" />
      <MainButtons>
        <Button
          buttonText="Save"
          buttonWidth="auto"
          buttonDisplay="inline"
          handleClick={handleClick}
        />
      </MainButtons>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditChecklist: (id, updates) => dispatch(startEditChecklist(id, updates))
});

ChecklistItemForm.propTypes = {
  checklist: PropTypes.object.isRequired,
  checklistItem: PropTypes.object
};

export default connect(
  null,
  mapDispatchToProps
)(ChecklistItemForm);
