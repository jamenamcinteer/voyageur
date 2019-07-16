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
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
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
      <React.Fragment>
        <GlobalStyles />
        <AppRouter theme={theme} />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
