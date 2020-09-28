import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { currentUser  } from "../API/userAPI";

const WorkerRoute = ({ component,history, ...rest }) => {

    currentUser().then((data) => {
        if (data.currentUser === null || data.currentUser.role !== 'worker') {
            history.push('/no/access')
            window.location.reload()
        }
    }).catch()

    return <Route {...rest} component={component} />
};

export default withRouter(WorkerRoute);
