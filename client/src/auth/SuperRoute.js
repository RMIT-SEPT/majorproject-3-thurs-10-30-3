import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { currentUser } from "../API/userAPI";

const SuperRoute = ({ history, component, ...rest }) => {

    currentUser().then((data) => {
        if (data.currentUser.role !== 'super') {
            history.push('/no/access')
        }
    }).catch()

    return <Route {...rest} component={component} />
};

export default withRouter(SuperRoute);
