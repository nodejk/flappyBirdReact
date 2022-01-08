import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthenticationProvider } from "./store/AuthProvider";
ReactDOM.render(
  <AuthenticationProvider>
    <App />
  </AuthenticationProvider>,
  document.getElementById("root")
);
