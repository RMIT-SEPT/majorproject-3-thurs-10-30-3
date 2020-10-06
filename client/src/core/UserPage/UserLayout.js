import React, { useState, useEffect } from "react";
import { withRouter, } from "react-router-dom";
import "./UserLayout.scss";
import queryString from "query-string";
import { createBusiness } from "../../API/businessAPI"
import { errorHandler } from "../common/errorhandler";
import Layout from '../Layout'
const UserLayout = ({ history, children }) => {

    const handleClick = (link) => () => {
        history.push(link)
    }

    return (
        <div className="super-layout-cont row ">
            <Layout />
            <div className="first">
                <div className="each-link" onClick={handleClick('/user/profile')}>Profile</div>
                <div className="each-link" onClick={handleClick('/user/schedule')}>Schedule</div>
            </div>
            <div className="second">
                {children}
            </div>
        </div>

    );
};

export default withRouter(UserLayout);
