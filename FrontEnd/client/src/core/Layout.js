import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './Layout.scss'

const Layout = ({ children }) => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    })

    useEffect(() => {

    }, [])



    return (
        <div className="layout-cont row JCB AIC">
            <div className="row AIC first">
                <div className="img-cont"><img src={require('./Main/img/logo.png')} /></div>
                <div>Scheduler</div>
            </div>
            <div className="second">Sign in</div>
        </div>
    )
}

export default Layout