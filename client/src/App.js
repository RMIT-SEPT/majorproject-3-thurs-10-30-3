import React from 'react';
import Authentication from './core/AuthPage/Authentication';
import LandingPage from './core/Main/LandingPage';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import myBootstrap from './Template/GlobalCSS/myBootstrap.scss'
import PrivateRoute from './auth/PrivateRoute'
import Business from './core/Business/Business'
import SuperRoute from './auth/SuperRoute';
import AdminRoute from './auth/AdminRoute';
import CreateBusiness from './core/SuperPage/CreateBusiness';
import CreateAdmin from './core/SuperPage/CreateAdmin';
import CreateWorker from './core/AdminPage/CreateWorker';
import EditWorker from './core/AdminPage/EditWorker';
import NoAccess from './core/NoAccess';
import UserHistory from './core/UserPage/UserHistory'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/app/authentication" exact component={Authentication} />
        <Route path="/no/access" exact component={NoAccess} />
        <PrivateRoute path="/user/history" exact component={UserHistory} />

        <SuperRoute path="/super/create/business" exact component={CreateBusiness} />
        <SuperRoute path="/super/create/admin" exact component={CreateAdmin} />

        <AdminRoute path="/admin/create/worker" exact component={CreateWorker} />
        <AdminRoute path="/admin/edit/worker" exact component={EditWorker} />
        {/* <PrivateRoute path="/dashboard/tours" exact component={Tour} /> */}
        {/* <PrivateRoute path="/dashboard/locations" exact component={LocationPage} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
