import React, { useState, useEffect } from "react";
import { withRouter, } from "react-router-dom";
import "./AdminLayout.scss";
import Layout from '../Layout'
const AdminLayout = ({ history, children }) => {

    const handleClick = (link) => () => {
        history.push(link)
    }

    return (
        <div className="super-layout-cont row ">
            <Layout />
            <div className="first">
                <div className="each-link" onClick={handleClick('/admin/create/worker')}>Create worker</div>
                <div className="each-link" onClick={handleClick('/admin/edit/worker')}>List of workers</div>
            </div>
            <div className="second">
                {children}
            </div>
        </div>

    );
};

export default withRouter(AdminLayout);
