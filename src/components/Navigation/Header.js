import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme";
import PropTypes from "prop-types";

const HeaderBackground = styled.div`
  background-color: ${props => props.theme.headerBackground};
  padding: 10px 20px;
  // text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.h1`
  font-size: 1.2em;
  font-weight: normal;
  color: ${props => props.theme.headerForeground};
`;

const ProfileButton = styled.button`
  background: 0;
  border: 0;
  padding: 0;
  border: 3px solid
    ${props =>
      props.selected
        ? props.theme.themeColor
        : props.theme.themeColorSecondary};
  border-radius: 100px;

  &:focus {
    outline: 0;
    border: 3px solid ${props => props.theme.focusBorder};
  }
`;
const ProfileImage = styled.img`
  border-radius: 100px;
  width: 45px;
  height: 45px;
  display: block;
`;
const ProfileMenu = styled.div`
  position: absolute;
  background: #fff;
  z-index: 1;
  padding: 0;
  right: 0;
  top: 68px;
  width: calc(100vw - 50px);
  height: calc(100vh - 69px);
  box-shadow: -3px 3px 4px 2px rgba(0, 0, 0, 0.2);
  max-width: 400px;
`;
const ProfileMenuLink = styled.a`
  color: ${props => props.theme.darkFont};
  text-decoration: none;
  border-bottom: 1px solid ${props => props.theme.themeColorSecondary};
  display: block;
  padding: 20px;
  text-align: left;
  font-size: 1.2em;
`;

const Header = props => {
  const [menuOpen, setMenuOpen] = useState(false);

  const svgStyles = {
    fill: theme.headerForeground,
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
            aria-label="Go Back"
          >
            <g>
              <polygon points="135.412,0 35.709,99.702 135.412,199.404 163.695,171.119 92.277,99.702 163.695,28.285 	" />
            </g>
          </svg>
        </Link>
      )}
      <HeaderText>{props.title}</HeaderText>
      <ProfileButton onClick={e => setMenuOpen(!menuOpen)} selected={menuOpen}>
        <ProfileImage src={props.auth.photoURL} alt="Account Options" />
        {menuOpen && (
          <ProfileMenu>
            <ProfileMenuLink href="/auth/logout">Sign Out</ProfileMenuLink>
          </ProfileMenu>
        )}
      </ProfileButton>
    </HeaderBackground>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  backHide: PropTypes.bool,
  backTo: PropTypes.string
};

export default Header;
