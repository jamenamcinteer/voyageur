import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Navigation/Header";
import ButtonLink from "./Buttons/ButtonLink";
import Button from "./Buttons/Button";
import TripCard from "./Cards/TripCard";
import moment from "moment";
import Modal from "react-modal";
import styled from "styled-components";
import {} from "twix";
import { connect } from "react-redux";
import { CardContainer } from "./StyledComponents/Layout";

const ModalHeader = styled.h3`
  font-size: 1em;
  font-weight: normal;
  margin-top: 0;
`;

const ModalLink = styled(Link)`
  display: block;
  padding: 10px 20px;
  border-top: 1px solid ${props => props.theme.themeColorSecondary};
  text-decoration: none;
  margin-left: -20px;
  margin-right: -20px;
  color: ${props => props.theme.darkFont};

  &:last-child {
    padding-bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;

  @media (min-width: 1024px) {
    justify-content: center;
  }

  button,
  a {
    max-width: 200px;
  }
`;

const OneButtonBackground = styled.div`
  height: calc(100vh - 69px);
  width: 100vw;
  padding: 70px;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/dashboard-background.jpg");
    background-size: cover;
    background-position: top right;
    filter: blur(1px) brightness(40%) grayscale(50%) sepia(10%);
  }
`;

const OneButtonContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DashboardHeader = styled.h4``;

const Dashboard = props => {
  const [addExpenseModal, setAddExpenseModal] = useState(false);

  const today = new Date();

  let futureTrips = [];
  let pastTrips = [];
  // get all trips in the future from "closest" to "farthest"
  props.trips &&
    props.trips.map(trip => {
      if (trip.endDate >= moment(today).valueOf()) {
        futureTrips.push(trip);
      }
      return true;
    });
  futureTrips.sort((a, b) => parseInt(a.endDate) - parseInt(b.endDate));
  // get all trips in the past from "closest" to "farthest"
  props.trips &&
    props.trips.map(trip => {
      if (trip.endDate < moment(today).valueOf()) {
        pastTrips.push(trip);
      }
      return true;
    });
  pastTrips.sort((a, b) => parseInt(b.endDate) - parseInt(a.endDate));

  const getDates = (startDate, endDate) => {
    return moment(startDate)
      .twix(endDate, { allDay: true })
      .format({ monthFormat: "MMM", dayFormat: "D" });
  };

  return (
    <React.Fragment>
      <Header
        title="My Trips"
        theme={props.theme}
        auth={props.auth}
        backHide={true}
      />
      {props.trips.length > 0 && (
        <React.Fragment>
          <ButtonContainer>
            <ButtonLink
              to="/trip/add"
              buttonText="Add a Trip"
              buttonType="secondary"
              buttonWidth="50%"
              theme={props.theme}
            />
            <Button
              handleClick={e => setAddExpenseModal(true)}
              buttonText="Add Expense"
              buttonType="primary"
              buttonWidth="50%"
              theme={props.theme}
            />
          </ButtonContainer>
          <Modal
            isOpen={addExpenseModal}
            onRequestClose={e => setAddExpenseModal(false)}
            contentLabel="Add Expense Modal"
            ariaHideApp={props.isTest ? false : true}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,.5)"
              },
              content: {
                borderRadius: "0",
                // minHeight: "20vh",
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
            <ModalHeader>Choose a Trip:</ModalHeader>
            {futureTrips.length > 0 &&
              futureTrips.map((trip, index) => {
                return (
                  <ModalLink
                    to={`/trip-budget/${trip._id}/add-expense`}
                    key={trip._id}
                  >
                    {trip.destination} ({getDates(trip.startDate, trip.endDate)}
                    )
                  </ModalLink>
                );
              })}
            <Button
              handleClick={e => setAddExpenseModal(false)}
              buttonText="Cancel"
              buttonType="link"
              customStyles={{
                background: { padding: "10px 0", margin: "0", float: "right" }
              }}
              dataTestid="closeModal"
            />
          </Modal>
          <CardContainer>
            {/* <h4>Upcoming Trips</h4> */}
            {futureTrips.length > 0 &&
              futureTrips.map(trip => {
                const budgetItems = props.budgetItems.filter(
                  bItem => bItem.tripId === trip._id
                );
                const expenses = props.expenses.filter(
                  expense => expense.tripId === trip._id
                );
                return (
                  <TripCard
                    key={trip._id}
                    destination={trip.destination}
                    photo={trip.photo}
                    photoAttribution={trip.photoAttribution}
                    to={`/trip/${trip._id}`}
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                    budgetItems={budgetItems}
                    expenses={expenses}
                    theme={props.theme}
                  />
                );
              })}
            {pastTrips.length > 0 && (
              <DashboardHeader>Past Trips</DashboardHeader>
            )}
            {pastTrips.length > 0 &&
              pastTrips.map(trip => {
                const budgetItems = props.budgetItems.filter(
                  bItem => bItem.tripId === trip._id
                );
                const expenses = props.expenses.filter(
                  expense => expense.tripId === trip._id
                );
                return (
                  <TripCard
                    key={trip._id}
                    destination={trip.destination}
                    photo={trip.photo}
                    photoAttribution={trip.photoAttribution}
                    to={`/trip/${trip._id}`}
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                    budgetItems={budgetItems}
                    expenses={expenses}
                    theme={props.theme}
                  />
                );
              })}
          </CardContainer>
        </React.Fragment>
      )}
      {props.trips.length === 0 && (
        <OneButtonBackground>
          <OneButtonContainer>
            <ButtonLink
              to="/trip/add"
              buttonText="Add a Trip"
              buttonType="primary"
              customStyles={{
                text: { fontSize: "1.5em" }
              }}
            />
          </OneButtonContainer>
        </OneButtonBackground>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    trips: state.trips,
    budgetItems: state.budgetItems,
    expenses: state.expenses,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
