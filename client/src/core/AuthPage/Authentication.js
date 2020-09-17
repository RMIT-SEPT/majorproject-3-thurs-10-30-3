import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './Authentication.scss'
import { signin, authenticate } from '../../API/userAPI'
import Loader from '../Loader'
import Parallax from 'parallax-js' // Now published on NPM
import anime from 'animejs';
import SignIn from './SignIn'
import SignUp from "./SignUp";


const Main = ({ history }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        history.push('/')
    }

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    })

    // 0 for sign in and 1 for sign up
    const [visible, setVisible] = useState(0)
    const { email, password, loading, error } = values;

    useEffect(() => {
    
    }, [])

    const flipVisibility = () => {
        if (visible === 1) {
            setVisible(0)
        } else {
            setVisible(1)
        }
    }

    return (
        <div className={`main-cont ${visible === 1 && 'main-cont-enlarged'} row align-items-center justify-content-center`}>
            <SignIn visible={visible} flipVisibility={flipVisibility} history={history}/>
            <SignUp visible={visible} flipVisibility={flipVisibility} history={history}/>
         
            <Loader loading={loading} />
        </div>
    )
}

export default Main