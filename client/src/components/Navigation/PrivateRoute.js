import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Landing from "../Landing";
import history from './history';
import Reviews from '../Reviews';
import Search from "../Search";
import myPage from "../myPageOld";
import myPage2 from "../myPage";

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/Reviews" exact component={Reviews} />
      <Route path="/Search" exact component={Search} />
      <Route path="/myPage" exact component={myPage2} />
      </Switch>
    </Router>
  );
}