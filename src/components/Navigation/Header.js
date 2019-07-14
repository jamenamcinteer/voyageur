import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme";

const HeaderBackground = styled.div`
  background-color: ${props => props.theme.themeColorLight};
  padding: 10px 20px;
  // text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.div`
  font-size: 1.2em;
  font-weight: normal;
`;

const ProfileButton = styled.div``;
const ProfileImage = styled.img`
  border-radius: 100px;
  border: 2px solid
    ${props =>
      props.selected
        ? props.theme.themeColor
        : props.theme.themeColorSecondaryLight};
  width: 45px;
  height: 45px;
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
`;
const ProfileMenuLink = styled.a`
  color: ${props => props.theme.darkFont};
  text-decoration: none;
  border-bottom: 1px solid ${props => props.theme.themeColorSecondary};
  display: block;
  padding: 20px;
`;

const Header = props => {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <ProfileButton>
        <ProfileImage
          src={props.auth.photoURL}
          alt=""
          onClick={e => setMenuOpen(!menuOpen)}
          selected={menuOpen}
        />
        {menuOpen && (
          <ProfileMenu>
            <ProfileMenuLink href="/auth/logout">Sign Out</ProfileMenuLink>
          </ProfileMenu>
        )}
      </ProfileButton>
    </HeaderBackground>
  );
};

export default Header;
