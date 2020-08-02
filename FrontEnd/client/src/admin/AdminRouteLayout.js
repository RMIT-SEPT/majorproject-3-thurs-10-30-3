import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { BrowserRouter, Router, Switch, Route, Link, withRouter } from "react-router-dom";
import AdminProductCreate from "./AdminProductCreate";
import AdminProductManage from "./AdminProductManage";
import AdminProductUpdate from "./AdminProductUpdate";

const AdminRouteLayout = ({ children, history, location, keywordIn }) => {

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return "dashboard-sidebar-item dashboard-sidebar-item-active ";
        } else {
            return "dashboard-sidebar-item ";
        }
    };

    const showSideBar = () => {
        return (
            <div className="dashboard-sidebar" >
                <div className="dashboard-sidebar-title">Admin Options</div>
                <ul className="dashboard-sidebar-item-box">
                    <Link to={'/admin/dashboard/category/create'}>
                        <li className={isActive(history, '/admin/dashboard/category/create')}>create category</li>
                    </Link>
                    <Link to={'/admin/dashboard/category/manage'}>
                        <li className={isActive(history, '/admin/dashboard/category/manage')}>manage category</li>
                    </Link>
                    <Link to={'/admin/dashboard/product/create'}>
                        <li className={isActive(history, '/admin/dashboard/product/create')}>create</li>
                    </Link>
                    <Link to={'/admin/dashboard/product/manage'}>
                        <li className={isActive(history, '/admin/dashboard/product/manage')}>manage product</li>
                    </Link>

                </ul>
            </div>
        )
    }

    return (
        <Layout keywordIn={keywordIn}>
            <div className="row mt-5">
                <div className="col-3">
                    {showSideBar()}
                </div>
                <div className="col-9">
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(AdminRouteLayout)