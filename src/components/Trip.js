import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";
import ButtonLink from "./Buttons/ButtonLink";
import Button from "./Buttons/Button";
import BudgetCard from "./Cards/BudgetCard";
import { Store } from "../Store";
import { startRemoveTrip } from "../actions/trips";
import { startRemoveBudgetCategory } from "../actions/budgetCategories";
import { startRemoveBudgetItem } from "../actions/budgetItems";
import { startRemoveExpense } from "../actions/expenses";
import useSortAscendingAlphabetical from "../hooks/useSortAscendingAlphabetical";
import Modal from "react-modal";
import { ModalText } from "./StyledComponents/Modals";
import { Container } from "./StyledComponents/Layout";
import { MainButtons } from "./StyledComponents/Forms";

const Trip = props => {
  const { state, dispatch } = useContext(Store);

  const [deleteModal, setDeleteModal] = useState(false);

  // const trips = JSON.parse(localStorage.getItem("trips"));
  const trip = state.trips.find(trip => trip.id === props.match.params.id);
  // console.log("Trip.js", state.budgetCategories);
  const budgetCategories = useSortAscendingAlphabetical(
    state.budgetCategories.filter(bCategory => bCategory.tripId === trip.id),
    "budgetCategory"
  );

  const deleteTrip = () => {
    // TODO: Add a modal to warn about deleting being permanent
    // let cleanData = [];
    // let oldTrips = state.trips;
    // cleanData = oldTrips.filter(i => i.id !== trip.id);
    // localStorage.setItem("trips", JSON.stringify(cleanData));

    startRemoveTrip(trip.id, state, dispatch);

    state.budgetCategories.map(i => {
      if (i.tripId === trip.id)
        startRemoveBudgetCategory(i.id, state, dispatch);
      return true;
    });

    state.budgetItems.map(i => {
      if (i.tripId === trip.id) startRemoveBudgetItem(i.id, state, dispatch);
      return true;
    });

    state.expenses.map(i => {
      if (i.tripId === trip.id) startRemoveExpense(i.id, state, dispatch);
      return true;
    });

    // let oldBudgetCategories = state.budgetCategories;
    // cleanData = oldBudgetCategories.filter(i => i.tripId !== trip.id);
    // localStorage.setItem("budgetCategories", JSON.stringify(cleanData));

    // let oldBudgetItems = state.budgetItems;
    // cleanData = oldBudgetItems.filter(i => i.tripId !== trip.id);
    // localStorage.setItem("budgetItems", JSON.stringify(cleanData));

    // let oldExpenses = state.expenses;
    // cleanData = oldExpenses.filter(i => i.tripId !== trip.id);
    // localStorage.setItem("expenses", JSON.stringify(cleanData));

    props.history.push("/");
  };

  return (
    <div>
      {trip && (
        <div>
          <TripHeader
            title="Trip Details"
            theme={props.theme}
            backTo="/"
            trip={trip}
          />
          <Container style={{ ...{ textAlign: "center" } }}>
            <ButtonLink
              to={`/trip/${trip.id}/add-expense`}
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
          <Container>
            {budgetCategories.length > 0 &&
              budgetCategories.map(budgetCategory => {
                return (
                  <BudgetCard
                    key={budgetCategory.id}
                    actual={2130}
                    budgeted={3760}
                    theme={props.theme}
                    budgetCategory={budgetCategory}
                  />
                );
              })}
          </Container>
          <Container style={{ ...{ textAlign: "center" } }}>
            <ButtonLink
              to={`/trip/${trip.id}/add-budget-category`}
              buttonText="Add Budget Category"
              buttonType="secondary"
              theme={props.theme}
              customStyles={{
                background: {
                  display: "inline-block",
                  width: "auto"
                }
              }}
            />
            <br />
            <ButtonLink
              to={`/trip/${trip.id}/edit`}
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
        </div>
      )}
    </div>
  );
};

export default withRouter(Trip);
