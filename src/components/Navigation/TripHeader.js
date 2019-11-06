import React, { useState, useEffect } from "react";
import Header from "./Header";
import Meter from "../Meters/Meter";
import moment from "moment";
import {} from "twix";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import styled from "styled-components";
import PropTypes from "prop-types";

const DestinationHeader = styled.h2`
  font-size: 1.7em;
  margin-top: 24px;
  margin-bottom: 20px;
`;
const DatesHeader = styled.h3`
  font-weight: normal;
  margin: 0;
`;
const BudgetHeader = styled.h3`
  font-weight: normal;
  margin: 0;
`;

const SubheaderContaienr = styled.section`
  position: relative;
`;

const SubheaderBackground = styled.div`
  background-image: url("${props =>
    props.photo}&w=${props => props.vw}&h=150&fit=crop&crop=focalpoint");
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(0.6);
  height: 150px;
`;

const Subheader = styled.div`
  height: 150px;
  padding: 0 20px;
  color: #fff;
  font-size: 1em;
  font-weight: normal;
  position: absolute;
  width: 100%;
  top: 0;
  max-width: 960px;
  width: 100%;

  @media (min-width: 1024px) {
    left: calc(50% - 480px);
  }
`;

const SubheaderText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

const TripHeader = props => {
  const budgetItems = props.budgetItems.filter(
    bItem => bItem.tripId === props.trip._id
  );
  const expenses = props.expenses.filter(
    expense => expense.tripId === props.trip._id
  );

  const actual = useBudgetCalculation("actual", expenses);
  const budgeted = useBudgetCalculation("budgeted", budgetItems);

  const dates = moment(props.trip.startDate)
    .twix(props.trip.endDate, { allDay: true })
    .format({ monthFormat: "MMM", dayFormat: "D" });

  const [vw, setVw] = useState(window.innerWidth)
  useEffect(() => {
    function updateSize() {
      setVw(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  return (
    <React.Fragment>
      {props.trip && (
        <React.Fragment>
          <Header title={props.title} backTo={props.backTo} auth={props.auth} />
          <SubheaderContaienr>
            <SubheaderBackground photo={props.trip.photo} vw={vw} />
            <Subheader>
              <DestinationHeader>{props.trip.destination}</DestinationHeader>
              <SubheaderText>
                <DatesHeader>{dates}</DatesHeader>
                <BudgetHeader>
                  ${Math.ceil(actual)} / ${Math.ceil(budgeted)}
                </BudgetHeader>
              </SubheaderText>
              <Meter actual={actual} budgeted={budgeted} />
            </Subheader>
          </SubheaderContaienr>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

TripHeader.propTypes = {
  trip: PropTypes.object.isRequired,
  budgetItems: PropTypes.array.isRequired,
  expenses: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  backTo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default TripHeader;
