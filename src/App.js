import React, { Component } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <PublicRoute exact restricted={false} path="/login" name="Login Page" component={Login} />
              <PublicRoute exact restricted={true} path="/register" name="Register Page" component={Register} />
              <PublicRoute exact restricted={false} path="/500" name="Page 500" component={Page500} />
              <PublicRoute exact restricted={false} path="/404" name="Page 404" component={Page404} />
              <PrivateRoute path="/" name="Home" component={TheLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
