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
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <AppRouter theme={theme} />
      </div>
    </ThemeProvider>
  );
}

export default App;
