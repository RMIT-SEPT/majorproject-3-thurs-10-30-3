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
        <div >
            <div className="nav-bar">
                navbar | profile | home 
            </div>
            {children}
        </div>
    )
}

export default Layout