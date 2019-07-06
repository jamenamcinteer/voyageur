import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const backgroundStyles = {
    backgroundColor: props.theme.themeColorLight,
    padding: "10px 20px",
    textAlign: "center"
  };
  const headerStyles = {
    fontSize: "1.2em",
    fontFamily: "Roboto",
    fontWeight: "normal",
    color: props.theme.darkFont
  };
  const svgStyles = {
    fill: props.theme.darkFont,
    width: "20px",
    height: "20px",
    float: "left",
    marginTop: "15px"
  };
  return (
    <div style={backgroundStyles}>
      {!props.backHide && (
        <Link to={props.backTo}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 199.404 199.404"
            style={svgStyles}
          >
            <g>
              <polygon points="135.412,0 35.709,99.702 135.412,199.404 163.695,171.119 92.277,99.702 163.695,28.285 	" />
            </g>
          </svg>
        </Link>
      )}
      <h1 style={headerStyles}>{props.title}</h1>
    </div>
  );
};

export default Header;
