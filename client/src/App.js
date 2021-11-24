import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="" exact component={} />
      </Switch>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
