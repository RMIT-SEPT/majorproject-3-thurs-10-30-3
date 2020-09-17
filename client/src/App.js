import React from 'react';
import Authentication from './core/AuthPage/Authentication';
import LandingPage from './core/Main/LandingPage';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import myBootstrap from './Template/GlobalCSS/myBootstrap.scss'
import PrivateRoute from './auth/PrivateRoute'
import Business from './core/Business/Business'
import Archived from './core/Main/Archived'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/authentication" exact component={Authentication} />
        <PrivateRoute path="/business/:businessId" exact component={Business} />
        <Route path="/test" exact component={Archived} />
        {/* <PrivateRoute path="/dashboard/tours" exact component={Tour} /> */}
        {/* <PrivateRoute path="/dashboard/locations" exact component={LocationPage} />
        <AdminRoute path="/dashboard/users" exact component={UserMg} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
