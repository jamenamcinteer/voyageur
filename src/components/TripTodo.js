import React, { useState, useEffect } from "react";
import TripHeader from "./Navigation/TripHeader";
import ButtonLink from "./Buttons/ButtonLink";
import ChecklistItemForm from "./Forms/ChecklistItemForm";
import Checkbox from "./FormElements/Checkbox";
import { Container } from "./StyledComponents/Layout";
import { startEditChecklist } from "../actions/checklists";
import { connect } from "react-redux";
import styled from "styled-components";

const CheckboxList = styled.ul`
  margin: 0;
  margin-left: 20px;
  padding: 0;
  list-style-type: none;
`;

const TripTodo = props => {
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
                    <div key={checklist._id}>
                      <h4>{checklist.name}</h4>
                      <CheckboxList>
                        {checklist.items.length > 0 &&
                          checklist.items.map((item, index) => {
                            return (
                              <li key={index}>
                                <Checkbox
                                  label={item.name}
                                  checked={item.completed}
                                  handleChange={e =>
                                    completeItem(checklist, index)
                                  }
                                />
                                {item.completed}
                              </li>
                            );
                          })}
                      </CheckboxList>
                      <ChecklistItemForm checklist={checklist} />
                    </div>
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
