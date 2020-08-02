import React from 'react';
import './GlobalCSS/myBootstrap.scss';
import './GlobalCSS/responsive.scss';
import Main from './core/Main';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />

        {/* <PrivateRoute path="/dashboard/tours" exact component={Tour} />
        <PrivateRoute path="/dashboard/locations" exact component={LocationPage} />
        <AdminRoute path="/dashboard/users" exact component={UserMg} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
