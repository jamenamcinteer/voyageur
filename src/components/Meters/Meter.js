import React from "react";
import theme from "../../theme";

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

  const meterStyles = {
    width: "100%",
    height: "25px",
    position: "relative",
    background: "#DCE0E3",
    borderRadius: "5px"
  };
  const meterProgressStyles = {
    display: "block",
    height: "100%",
    borderRadius: "5px",
    position: "relative",
    overflow: "hidden"
  };
  const meterAmountsStyles = {
    position: "absolute",
    top: "0",
    color: "white",
    left: "10px",
    lineHeight: "25px"
  };

  return (
    <div style={meterStyles}>
      <span
        style={{ ...meterProgressStyles, ...handleOverviewProgressBar() }}
      />
      <div style={meterAmountsStyles}>{displayOverviewBudget()}</div>
    </div>
  );
};

export default Meter;
