import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme";

const HeaderBackground = styled.div`
  background-color: ${props => props.theme.themeColorLight};
  padding: 10px 20px;
  text-align: center;
`;

const HeaderText = styled.div`
  font-size: 1.2em;
  font-weight: normal;
`;

const Header = props => {
  const svgStyles = {
    fill: theme.darkFont,
    width: "20px",
    height: "20px",
    float: "left",
    // marginTop: "15px"
    marginTop: "2px"
  };
  return (
    <HeaderBackground>
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
      <HeaderText>{props.title}</HeaderText>
    </HeaderBackground>
  );
};

export default Header;
