import React from 'react';
<<<<<<< HEAD
import './GlobalCSS/myBootstrap.scss';
import './GlobalCSS/responsive.scss';
import Authentication from './core/Authentication';
import LandingPage from './core/LandingPage';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
||||||| merged common ancestors
import './GlobalCSS/myBootstrap.scss';
import './GlobalCSS/responsive.scss';
import Main from './core/Main';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> master

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/authentication" exact component={Authentication} />
        {/* <PrivateRoute path="/dashboard/tours" exact component={Tour} />
        <PrivateRoute path="/dashboard/locations" exact component={LocationPage} />
        <AdminRoute path="/dashboard/users" exact component={UserMg} /> */}
      </Switch>
    </BrowserRouter>
||||||| merged common ancestors
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />

        {/* <PrivateRoute path="/dashboard/tours" exact component={Tour} />
        <PrivateRoute path="/dashboard/locations" exact component={LocationPage} />
        <AdminRoute path="/dashboard/users" exact component={UserMg} /> */}
      </Switch>
    </BrowserRouter>
=======
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> master
  );
}

export default App;
