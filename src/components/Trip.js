import React, { useState } from "react";
import TripHeader from "./Navigation/TripHeader";
import ButtonLink from "./Buttons/ButtonLink";
import Button from "./Buttons/Button";
import { startRemoveTrip } from "../actions/trips";
import { startRemoveBudgetCategory } from "../actions/budgetCategories";
import { startRemoveBudgetItem } from "../actions/budgetItems";
import { startRemoveExpense } from "../actions/expenses";
import Modal from "react-modal";
import { ModalText } from "./StyledComponents/Modals";
import { Container, CardContainer } from "./StyledComponents/Layout";
import { MainButtons } from "./StyledComponents/Forms";
import { connect } from "react-redux";
import ToolCard from "./Cards/ToolCard";

const Trip = props => {
  const [deleteModal, setDeleteModal] = useState(false);

  const trip = props.trips.find(trip => trip._id === props.match.params.id);

  const deleteTrip = () => {
    startRemoveTrip(trip._id);

    props.budgetCategories.map(i => {
      if (i.tripId === trip._id) startRemoveBudgetCategory(i._id);
      return true;
    });

    props.budgetItems.map(i => {
      if (i.tripId === trip._id) startRemoveBudgetItem(i._id);
      return true;
    });

    props.expenses.map(i => {
      if (i.tripId === trip._id) startRemoveExpense(i._id);
      return true;
    });

    props.history.push("/");
  };

  return (
    <React.Fragment>
      {trip && (
        <React.Fragment>
          <TripHeader
            title="Trip Details"
            theme={props.theme}
            backTo="/"
            trip={trip}
            auth={props.auth}
          />
          {props.budgetCategories.length > 0 && props.budgetItems.length > 0 && (
            <Container style={{ ...{ textAlign: "center" } }}>
              <ButtonLink
                to={`/trip-budget/${trip._id}/add-expense`}
                buttonText="Add Expense"
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
          <CardContainer>
            {/* <ToolCard
              to={`/trip-itinerary/${trip._id}`}
              title="Itinerary"
              type="itinerary"
            /> */}
            <ToolCard
              to={`/trip-budget/${trip._id}`}
              title="Budget"
              type="budget"
            />
            {/* <ToolCard
              to={`/trip-todo/${trip._id}`}
              title="To Do List"
              type="todolist"
            />
            <ToolCard
              to={`/trip-packing/${trip._id}`}
              title="Packing List"
              type="packinglist"
            /> */}
          </CardContainer>
          <Container style={{ ...{ textAlign: "center" } }}>
            <ButtonLink
              to={`/trip/${trip._id}/edit`}
              buttonText="Edit Trip"
              buttonType="link"
              theme={props.theme}
              customStyles={{
                background: {
                  display: "inline-block",
                  width: "auto"
                }
              }}
            />
            <br />
            <Button
              handleClick={e => setDeleteModal(true)}
              buttonText="Delete Trip"
              buttonType="delete"
              theme={props.theme}
              customStyles={{
                background: {
                  display: "inline-block",
                  width: "auto"
                }
              }}
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
                Are you sure you want to permanently delete this trip and all
                its budget categories, budget items, and expenses?
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
                  dataTestid="closeModal"
                />
                <Button
                  theme={props.theme}
                  handleClick={deleteTrip}
                  buttonText="Yes, Delete"
                  buttonWidth="auto"
                  buttonType="primary"
                  buttonDisplay="inline"
                />
              </MainButtons>
            </Modal>
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
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Trip);
