import React, { useState } from "react";
import TripHeader from "./Navigation/TripHeader";
import ButtonLink from "./Buttons/ButtonLink";
import Button from "./Buttons/Button";
import BudgetCard from "./Cards/BudgetCard";
import { startRemoveTrip } from "../actions/trips";
import { startRemoveBudgetCategory } from "../actions/budgetCategories";
import { startRemoveBudgetItem } from "../actions/budgetItems";
import { startRemoveExpense } from "../actions/expenses";
import useSortAscendingAlphabetical from "../hooks/useSortAscendingAlphabetical";
import Modal from "react-modal";
import { ModalText } from "./StyledComponents/Modals";
import { Container, CardContainer } from "./StyledComponents/Layout";
import { MainButtons } from "./StyledComponents/Forms";
import { connect } from "react-redux";

const Trip = props => {
  const [deleteModal, setDeleteModal] = useState(false);

  const trip = props.trips.find(trip => trip._id === props.match.params.id);
  const budgetCategories = useSortAscendingAlphabetical(
    props.budgetCategories.filter(bCategory => bCategory.tripId === trip._id),
    "budgetCategory"
  );

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
            budgetItems={props.budgetItems}
            expenses={props.expenses}
            auth={props.auth}
          />
          {props.budgetCategories.length > 0 && props.budgetItems.length > 0 && (
            <Container style={{ ...{ textAlign: "center" } }}>
              <ButtonLink
                to={`/trip/${trip._id}/add-expense`}
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
            {budgetCategories.length > 0 &&
              budgetCategories.map(budgetCategory => {
                return (
                  <BudgetCard
                    key={budgetCategory._id}
                    actual={2130}
                    budgeted={3760}
                    theme={props.theme}
                    budgetCategory={budgetCategory}
                    budgetItems={props.budgetItems}
                    expenses={props.expenses}
                  />
                );
              })}
          </CardContainer>
          <Container style={{ ...{ textAlign: "center" } }}>
            <ButtonLink
              to={`/trip/${trip._id}/add-budget-category`}
              buttonText="Add Budget Category"
              buttonType={
                props.budgetCategories.length > 0 ? "secondary" : "primary"
              }
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
