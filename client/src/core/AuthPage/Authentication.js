import React, { useState, useEffect } from "react";
import {  isAuthenticated } from '../../API/userAPI'
import Loader from '../Loader'
import SignIn from './SignIn'
import SignUp from "./SignUp";

import './Authentication.scss'

const Main = ({ history }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));


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
        isAuthenticated().then(isTrue => {
            if (isTrue) {
                history.push('/')
            }
        })
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
            <SignIn visible={visible} flipVisibility={flipVisibility} history={history} />
            <SignUp visible={visible} flipVisibility={flipVisibility} history={history} />

            <Loader loading={loading} />
        </div>
    )
}

export default Main