import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import AccountsPage from "./AccountsPage";
import NFTPage from "./NFTPage";

const CustomRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/accounts" component={AccountsPage} />
        <Route path="/nft" component={NFTPage} />
      </Switch>
    </Router>
  );
};

export default CustomRouter;
