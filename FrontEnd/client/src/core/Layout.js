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
<<<<<<< HEAD
            <div className="nav-bar">
                navbar | profile | home 
            </div>
=======
            {/* <div className="nav-bar">
                navbar
            </div> */}
>>>>>>> 1517c1ab232402784c43c0c821080dd53716e8d4
            {children}
        </div>
    )
}

export default Layout