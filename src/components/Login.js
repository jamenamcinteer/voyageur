import React, { useContext, useState } from "react";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {} from "twix";
import ButtonLink from "./Buttons/ButtonLink";

const App = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 40px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const AppContainer = styled.div`
  width: 100%;
`;

const AppTitle = styled.h1`
  color: ${props => props.theme.darkFont};
  font-family: "Roboto", sans-serif;
`;

const AppSubtitle = styled.h2`
  color: ${props => props.theme.darkFont};
  font-family: "Roboto", sans-serif;
`;

const Login = props => {
  const { state } = useContext(Store);

  return (
    <div>
      <App>
        <AppContainer>
          <AppTitle>Voyageur</AppTitle>
          <AppSubtitle>Travel Budget Planner</AppSubtitle>
          <ButtonLink
            to="/auth/google"
            buttonText="Sign In with Google"
            buttonType="primary"
            // buttonWidth="50%"
            // customStyles={{ width: "auto", display: "inline-block" }}
            theme={props.theme}
          />
        </AppContainer>
      </App>
    </div>
  );
};

export default Login;
