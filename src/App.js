import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import User from './User';
import Admin from './Admin';


const RouterSelector = () => {
  return (
    <Switch>
      <Route path="/admin/" component={Admin} />
      <Route path="/" exact component={User} />
      <Redirect from="/" to="/" />
    </Switch>
  )
}


class App extends Component {
  render() {
    return (
      <BrowserRouter forceRefresh={true} >
        <RouterSelector />
      </BrowserRouter>
    );
  }
}

export default App;
