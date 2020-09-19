import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { currentUser  } from "../API/userAPI";

const AdminRoute = ({ history, component, ...rest }) => {

    currentUser().then((data) => {
        if (data.currentUser.role !== 'admin') {
            history.push('/no/access')
        }
    }).catch()

    return <Route {...rest} component={component} />
};

export default withRouter(AdminRoute);
