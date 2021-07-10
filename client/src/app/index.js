import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { NavBar } from "../components";
import { BackupsList, BackupsInsert, BackupsUpdate } from "../pages";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/backups/list" exact component={BackupsList} />
        <Route path="/backups/create" exact component={BackupsInsert} />
        <Route path="/backups/update/:id" exact component={BackupsUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
