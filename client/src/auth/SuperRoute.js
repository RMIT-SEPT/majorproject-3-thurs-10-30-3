import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../API/userAPI";

const SuperRoute = ({ component, ...rest }) => {
    return isAuthenticated() && isAuthenticated().user.role === 1? 
    <Route {...rest} component={component} />: <Redirect to={'/noAccess'}/>
};

export default SuperRoute;
