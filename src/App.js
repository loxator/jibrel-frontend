import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TokenTransactions from "./scenes/TokenTransactions/component";
import AccountTransactions from "./scenes/AccountTransactions/component";
import TopNav from "./components/TopNav/component";

function App() {
  return (
    <Router>
      <TopNav />
      <Switch>
        <Route path="/" exact component={TokenTransactions} />
        <Route path="/account" exact component={AccountTransactions} />
      </Switch>
    </Router>
  );
}

export default App;
