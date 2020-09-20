import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import './NoAccess.scss'

const NoAccess = ({ children }) => {
    console.log("")
    return (
        <>
            <Layout />
            <div className="no-access-cont row JCC AIC">
                No access
             </div>
        </>
    )
}

export default NoAccess