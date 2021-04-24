import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Pages from "./Pages";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import mainTheme from "./layout/mainTheme";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={mainTheme}>
      <SnackbarProvider maxSnack={3}>      
        <Pages />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
