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
            window.location.reload()
        }).catch()
    }

    const showOptions = () => {
        if (user.role === "super") {
            return (
                <>
                    <div onClick={() => history.push('/admin/create/admin')}>Create admin</div>
                    <div onClick={() => history.push('/admin/create/business')}>Create business</div>
                </>
            )
        } else if (user.role === "admin") {
            return (
                <>
                    <div onClick={() => history.push('/admin/create/worker')}>Create worker</div>
                    <div onClick={() => history.push('/admin/edit/worker')}>Edit worker</div>
                </>
            )

        } else if (user.role === "worker") {
            return (
                <>
                    <div onClick={() => history.push('/worker/profile')}>Profile</div>
                    <div onClick={() => history.push('/worker/schedule')}>History</div>
                </>
            )

        } else if (user.role === "user") {
            return (
                <>
                    <div onClick={() => history.push('/user/profile')}>Profile</div>
                    <div onClick={() => history.push('/user/schedule')}>History</div>
                </>
            )

        }
    }

    const conditionalRender = () => {
        return !user ?
            <div className="second signin-btn" onClick={routeToSignIn}>Sign in</div>
            :
            <div className="user-name">Hi {user.name}

                <div className="drop-down" >
                    <div onClick={handleSignOut}>Sign out</div>
                    {showOptions()}
                </div>
            </div>
    }

    return (
        <div className="layout-cont row JCB AIC">
            <div className="row AIC first btn" onClick={() => { history.push('/') }}>
                <div className="img-cont " ><img src={require('./Main/img/logo.png')} /></div>
                <div>Scheduler</div>
            </div>
            {conditionalRender()}
        </div>
    )
}

export default Layout