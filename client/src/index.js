import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { ContactsProvider } from "./contexts/ContactsContext";
ReactDOM.render(
  <ContactsProvider>
    <App />
  </ContactsProvider>,
  document.getElementById("root")
);
