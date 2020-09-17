import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './Layout.scss'

const Layout = ({ children }) => {

    // Do not think this is similar to how you retrieved History @Lee
    const history = useHistory();

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    })

    useEffect(() => {

    }, [])

    const routeToSignIn = () =>{ 
        let signInPath = `/authentication`; 
        history.push(signInPath);
    }


    return (
        <div className="layout-cont row JCB AIC">
            <div className="row AIC first">
                <div className="img-cont"><img src={require('./Main/img/logo.png')} /></div>
                <div>Scheduler</div>
            </div>
            <div className="second" onClick={routeToSignIn}>Sign in</div>
        </div>
    )
}

export default Layout