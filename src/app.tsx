import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import "./app.css";
import Characters from "./pages/Characters";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/vehicles" exact component={Vehicles} />
        <Route path="/characters" exact component={Characters} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
