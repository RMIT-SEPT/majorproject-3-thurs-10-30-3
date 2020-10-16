import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { currentUser  } from "../API/userAPI";

const PrivateRoute = ({ component,history, ...rest }) => {

    currentUser().then((data) => {
        if (data.currentUser === null || data.currentUser.role !== 'user') {
            history.push('/no/access')
            window.location.reload()
        }
    }).catch()

    return <Route {...rest} component={component} />
};

export default withRouter(PrivateRoute);
