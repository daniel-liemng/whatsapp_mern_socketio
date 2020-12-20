import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { ContactsProvider } from "./contexts/ContactsContext";
import { ConversationsProvider } from "./contexts/ConversationsContext";

ReactDOM.render(
  <ContactsProvider>
    <ConversationsProvider>
      <App />
    </ConversationsProvider>
  </ContactsProvider>,
  document.getElementById("root")
);
