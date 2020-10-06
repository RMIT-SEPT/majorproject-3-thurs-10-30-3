import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import './NoAccess.scss'

const NoAccess = ({ children }) => {
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