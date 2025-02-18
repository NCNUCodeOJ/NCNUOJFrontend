import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/admin/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/admin/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));

class Admin extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/logins" name="Login Page" render={props => <Login {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </>
    );
  }
}

export default Admin;
