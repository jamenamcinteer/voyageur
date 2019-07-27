import React from "react";
import theme from "../../theme";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledMeter = styled.div`
  width: 100%;
  height: 10px;
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

const Meter = props => {
  const handleOverviewProgressBar = () => {
    let actual = props.actual;
    let budgeted = props.budgeted;

    let width = (actual / budgeted) * 100;
    // let backgroundColor = props.theme.themeColor;
    let backgroundColor = theme.themeColor;

    if (width > 100) {
      width = 100;
      // backgroundColor = props.theme.themeColorRed;
      backgroundColor = theme.themeColorRed;
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
    </StyledMeter>
  );
};

Meter.propTypes = {
  actual: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  budgeted: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default Meter;
