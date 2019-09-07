import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";
import ButtonLink from "./Buttons/ButtonLink";
import ChecklistItemForm from "./Forms/ChecklistItemForm";
import Checkbox from "./FormElements/Checkbox";
import TextInput from "./FormElements/TextInput";
import { Container } from "./StyledComponents/Layout";
import { startEditChecklist } from "../actions/checklists";
import { connect } from "react-redux";
import styled from "styled-components";
import theme from "../theme";

const CheckboxList = styled.ul`
  margin: 0;
  margin-left: 20px;
  padding: 0;
  list-style-type: none;
`;

const CheckboxListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PencilLink = styled(Link)`
  margin-right: -5px;
  margin-left: 5px;
`;

const PencilButton = styled.button`
  padding: 0;
  background: none;
  border: 0;
  margin-right: -5px;
  margin-left: 5px;
`;

const ChecklistHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChecklistItem = ({ item, index, checklist, completeItem, svgStyles }) => {
  const [editMode, setEditMode] = useState(false);
  const [itemName, setItemName] = useState(item.name);
  const [ref] = useState(React.createRef());
  // const ref = useRef(null);

  const textInputStyles = {
    container: {
      display: editMode ? "block" : "none",
      marginTop: 0,
      marginBottom: "10px",
      width: "100%"
    }
  };

  const editItem = () => {
    setEditMode(true);
    // console.log(ref);
    ref.current.focus();
  };

  const saveItem = () => {
    setEditMode(false);
  };

  return (
    <CheckboxListItem>
      <Checkbox
        label={item.name}
        checked={item.completed}
        handleChange={e => completeItem(checklist, index)}
        style={{ label: { display: editMode ? "none" : "block" } }}
      />
      <TextInput
        label="Name of Item"
        value={itemName}
        handleChange={setItemName}
        handleBlur={saveItem}
        styleType="thin"
        style={textInputStyles}
        ref={ref}
      />
      <PencilButton onClick={editItem}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 528.899 528.899"
          aria-label="Edit"
          style={svgStyles}
        >
          <path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z" />
        </svg>
      </PencilButton>
    </CheckboxListItem>
  );
};

const Checklist = ({ checklist, tripId, svgStyles, completeItem }) => {
  return (
    <div key={checklist._id}>
      <ChecklistHeader>
        <h4>{checklist.name}</h4>
        <PencilLink to={`/trip-todo/${tripId}/edit-checklist`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 528.899 528.899"
            aria-label="Edit"
            style={svgStyles}
          >
            <path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z" />
          </svg>
        </PencilLink>
      </ChecklistHeader>
      <CheckboxList>
        {checklist.items.length > 0 &&
          checklist.items.map((item, index) => {
            return (
              <ChecklistItem
                key={index}
                item={item}
                index={index}
                checklist={checklist}
                completeItem={completeItem}
                svgStyles={svgStyles}
              />
            );
          })}
      </CheckboxList>
      <ChecklistItemForm checklist={checklist} />
    </div>
  );
};

const TripTodo = props => {
  const svgStyles = {
    fill: theme.themeColor,
    padding: "5px",
    width: "30px",
    display: "block"
  };

  const trip = props.trips.find(trip => trip._id === props.match.params.id);
  const [checklists, setChecklists] = useState(props.checklists);

  useEffect(() => {
    setChecklists(props.checklists);
  }, [props.checklists]);

  const completeItem = async (checklist, itemIndex) => {
    const updatedChecklists = props.checklists.map(c => {
      if (c._id === checklist._id) {
        c.items[itemIndex].completed = !c.items[itemIndex].completed;
      }
      return c;
    });

    const updatedChecklist = updatedChecklists.filter(c => {
      return c._id === checklist._id;
    });
    setChecklists(updatedChecklists);
    await props.startEditChecklist(checklist._id, updatedChecklist[0]);
  };

  return (
    <React.Fragment>
      {trip && (
        <React.Fragment>
          <TripHeader
            title="To Do List"
            theme={props.theme}
            backTo={`/trip/${trip._id}`}
            trip={trip}
            auth={props.auth}
          />
          {props.budgetCategories.length > 0 && props.budgetItems.length > 0 && (
            <Container style={{ ...{ textAlign: "center" } }}>
              <ButtonLink
                to={`/trip-todo/${trip._id}/add-checklist`}
                buttonText="Add Checklist"
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
          )}
          <Container>
            {checklists.length > 0 &&
              checklists.map(checklist => {
                if (checklist.type === "todo") {
                  return (
                    <Checklist
                      key={checklist._id}
                      checklist={checklist}
                      svgStyles={svgStyles}
                      tripId={trip._id}
                      completeItem={completeItem}
                    />
                  );
                } else return false;
              })}
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    trips: state.trips,
    budgetCategories: state.budgetCategories,
    budgetItems: state.budgetItems,
    expenses: state.expenses,
    auth: state.auth,
    checklists: state.checklists
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditChecklist: (id, updates) => dispatch(startEditChecklist(id, updates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripTodo);
