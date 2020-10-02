import React, { useState, useEffect } from "react";
import {  withRouter,} from "react-router-dom";
import "./SuperLayout.scss";
import Layout from '../Layout'
const SuperLayout = ({ history, children }) => {

    const handleClick = (link) => () => {
        history.push(link)
    }

    return (
        <div className="super-layout-cont row ">
            <Layout />
            <div className="first">
                <div className="each-link" onClick={handleClick('/super/create/business')}>Create business</div>
                <div className="each-link" onClick={handleClick('/super/create/admin')}>Create admin</div>
            </div>
            <div className="second">
                {children}
            </div>
        </div>

    );
};

export default withRouter(SuperLayout);
