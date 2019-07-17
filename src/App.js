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
  }
  figcaption a {
    color: #fff;
  }
  a:focus {
    outline: 3px solid ${props => props.theme.focusBorder};
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
