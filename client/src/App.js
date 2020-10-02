import React from 'react';
import Authentication from './core/AuthPage/Authentication';
import LandingPage from './core/Main/LandingPage';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './Template/GlobalCSS/myBootstrap.scss'
import PrivateRoute from './auth/PrivateRoute'
import SuperRoute from './auth/SuperRoute';
import AdminRoute from './auth/AdminRoute';
import CreateBusiness from './core/SuperPage/CreateBusiness';
import CreateAdmin from './core/SuperPage/CreateAdmin';
import CreateWorker from './core/AdminPage/CreateWorker';
import EditWorker from './core/AdminPage/EditWorker';
import NoAccess from './core/NoAccess';
import UserHistory from './core/UserPage/UserHistory'
import UserProfile from './core/UserPage/UserProfile'
import WorkerRoute from './auth/WorkerRoute';
import WorkerHistory from './core/WorkerPage/WorkerHistory';
import WorkerProfile from './core/WorkerPage/WorkerProfile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/app/authentication" exact component={Authentication} />
        <Route path="/no/access" exact component={NoAccess} />
        <PrivateRoute path="/user/schedule" exact component={UserHistory} />
        <PrivateRoute path="/user/profile" exact component={UserProfile} />

        <WorkerRoute path="/worker/profile" exact component={WorkerProfile} />
        <WorkerRoute path="/worker/schedule" exact component={WorkerHistory} />

        <SuperRoute path="/super/create/business" exact component={CreateBusiness} />
        <SuperRoute path="/super/create/admin" exact component={CreateAdmin} />

        <AdminRoute path="/admin/create/worker" exact component={CreateWorker} />
        <AdminRoute path="/admin/edit/worker" exact component={EditWorker} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
