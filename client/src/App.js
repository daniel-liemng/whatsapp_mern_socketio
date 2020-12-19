import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  console.log(id);

  return id ? <Dashboard id={id} /> : <Login setId={setId} />;
};

export default App;
