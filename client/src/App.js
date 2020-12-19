import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";

import Login from "./components/Login";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  console.log(id);

  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login setId={setId} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
