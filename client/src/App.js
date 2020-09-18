import React from 'react';
import Authentication from './core/AuthPage/Authentication';
import LandingPage from './core/Main/LandingPage';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import myBootstrap from './Template/GlobalCSS/myBootstrap.scss'
import PrivateRoute from './auth/PrivateRoute'
import Business from './core/Business/Business'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/app/authentication" exact component={Authentication} />
        <PrivateRoute path="/business/:businessId" exact component={Business} />

        {/* <AdminRoute path="/dashboard/users" exact component={UserMg} /> */}


        {/* <PrivateRoute path="/dashboard/tours" exact component={Tour} /> */}
        {/* <PrivateRoute path="/dashboard/locations" exact component={LocationPage} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
