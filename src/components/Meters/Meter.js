import React from "react";
import theme from "../../theme";
import styled from "styled-components";

const StyledMeter = styled.div`
  width: 100%;
  height: 25px;
  position: relative;
  background: #dce0e3;
  border-radius: 5px;
`;

const MeterProgress = styled.span`
  display: block;
  height: 100%;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`;

const MeterAmount = styled.div`
  position: absolute;
  top: 0;
  color: #fff;
  left: 10px;
  line-height: 25px;
`;

const Meter = props => {
  const displayOverviewBudget = () => {
    let actual = Math.ceil(props.actual);
    let budgeted = Math.ceil(props.budgeted);

    return "$" + actual + " of $" + budgeted;
  };
  const handleOverviewProgressBar = () => {
    let actual = props.actual;
    let budgeted = props.budgeted;

    let width = (actual / budgeted) * 100;
    // let backgroundColor = props.theme.themeColor;
    let backgroundColor = theme.themeColor;

    if (width > 100) {
      width = 100;
      // backgroundColor = props.theme.themeColorRed;
      backgroundColor = props.theme.themeColorRed;
    }
    if (budgeted === 0) {
      width = 0;
    }
    width = width + "%";

    return { width, backgroundColor };
  };

  return (
    <StyledMeter>
      <MeterProgress style={handleOverviewProgressBar()} />
      <MeterAmount>{displayOverviewBudget()}</MeterAmount>
    </StyledMeter>
  );
};

export default Meter;
