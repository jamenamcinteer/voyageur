import React, { useEffect, useState } from "react";
import AppRouter from "./routers/AppRouter";
// import "./App.css";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import Modal from "react-modal";

Modal.setAppElement("#root");

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Roboto", sans-serif;
    color: ${props => props.theme.darkFont};
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  figcaption a {
    color: #fff;
  }
  a:focus {
    outline: 3px solid ${props => props.theme.focusBorder};
  }
  body {
    .DateInput {
      width: calc(50% - 12px);
    }

    .SingleDatePicker {
      width: 100%;
    }

    .SingleDatePicker .DateInput {
      width: 100%;
    }

    .DateInput_input {
      color: #000;
      font-family: Arial, sans-serif;
      font-size: 1em;
      padding: 7px 10px 5px 10px;
    }

    .SingleDatePickerInput {
      width: 100%;
    }

    .DateInput_input__focused {
      border-bottom: 2px solid #1aae9f;
    }

    .DateRangePickerInput__withBorder,
    .SingleDatePickerInput__withBorder {
      border: 2px solid #c7d2db;
      border-radius: 5px;
    }
  }
`;

const Offline = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: calc(100vw - 10px);
  padding: 5px;
  background: rgba(51, 51, 51, 0.9);
  color: #fff;
  margin: 5px;
  text-align: center;
  border-radius: 5px;
`;

function App() {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isOffline") === "true") {
      setIsOffline(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <GlobalStyles />
        <AppRouter theme={theme} />
        {isOffline && (
          <Offline>You are offline. This app is now read-only.</Offline>
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;
