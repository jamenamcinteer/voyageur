import React from "react";
import AppRouter from "./routers/AppRouter";
// import "./App.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <GlobalStyles />
        <AppRouter theme={theme} />
      </main>
    </ThemeProvider>
  );
}

export default App;
