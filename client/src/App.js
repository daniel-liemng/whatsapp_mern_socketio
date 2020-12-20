import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";

import { ContactsProvider } from "./contexts/ContactsContext";
import { ConversationsProvider } from "./contexts/ConversationsContext";
import { SocketProvider } from "./contexts/SocketContext";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  console.log(id);

  return id ? (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  ) : (
    <Login setId={setId} />
  );
};

export default App;
