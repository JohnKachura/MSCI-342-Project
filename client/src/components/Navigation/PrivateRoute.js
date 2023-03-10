import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import SignIn from '../SignIn';
import Landing from '../Landing';
import history from './history';
import JoinEvent from '../JoinEvent';
import AddEvent from "../AddEvent";
import AddFriend from "../AddFriend";
import AddRun from "../AddRun";
import Profile from "../Profile";

export default function PrivateRoute({

}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/Home" exact component={Home} />
      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/" exact component={Landing} />
      <Route path="/AddEvent" exact component={AddEvent} />
      <Route path="/JoinEvent" exact component={JoinEvent} />
      <Route path="/AddFriend" exact component={AddFriend} />
      <Route path="/AddRun" exact component={AddRun} />
      <Route path="/Profile" exact component={Profile} />
      </Switch>
    </Router>
  );
}