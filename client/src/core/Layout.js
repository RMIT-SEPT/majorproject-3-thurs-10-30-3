import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './Layout.scss'
import { currentUser, signout } from '../API/userAPI'


const Layout = ({ children }) => {

    // Do not think this is similar to how you retrieved History @Lee
    const history = useHistory();

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    })

    const [user, setUser] = useState()

    useEffect(() => {
        currentUser().then((data) => {
            if (data.currentUser === null) {

            } else {
                setUser(data.currentUser)
            }
        }).catch()

    }, [])

    const routeToSignIn = () => {
        let signInPath = `/app/authentication`;
        history.push(signInPath);
    }

    const handleSignOut = () => {
        signout().then((data) => {
            history.push('/')
        }).catch()
    }

    const conditionalRender = () => {
        return !user ?
            <div className="second signin-btn" onClick={routeToSignIn}>Sign in</div>
            :
            <div className="user-name">Hi {user.name}

                <div className="drop-down" onClick={handleSignOut}>
                    <div>Sign out</div>
                </div>
            </div>
    }

    return (
        <div className="layout-cont row JCB AIC">
            <div className="row AIC first btn" onClick={()=>{history.push('/')}}>
                <div className="img-cont " ><img src={require('./Main/img/logo.png')} /></div>
                <div>Scheduler</div>
            </div>
            {conditionalRender()}
        </div>
    )
}

export default Layout