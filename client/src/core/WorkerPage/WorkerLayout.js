import React, { useState, useEffect } from "react";
import { withRouter, } from "react-router-dom";
import "./WorkerLayout.scss";
import Layout from '../Layout'
const WorkerLayout = ({ history, children }) => {

    const handleClick = (link) => () => {
        history.push(link)
    }

    return (
        <div className="super-layout-cont row ">
            <Layout />
            <div className="first">
                <div className="each-link" onClick={handleClick('/worker/profile')}>Profile</div>
                <div className="each-link" onClick={handleClick('/worker/schedule')}>Schedule</div>
            </div>
            <div className="second">
                {children}
            </div>
        </div>

    );
};

export default withRouter(WorkerLayout);
