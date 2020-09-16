import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { signin, authenticate } from '../../API/userAPI'
import Loader from '../Loader'
import Parallax from 'parallax-js' // Now published on NPM
import anime from 'animejs';
import './SignIn.scss'

import queryString from 'query-string';

const SignIn = ({ history, visible, flipVisibility, location }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        history.push('/')
    }

    const [values, setValues] = useState({
        username: "",
        password: "",
        error: "",
        loading: false,
    })

    var query = queryString.parse(window.location.search)
    const [bookingModalOpened, setBookingModalOpened] = useState(query.bookingModalOpened ? true : false)
    const { username, password, loading, error } = values;

    useEffect(() => {

    }, [])

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        // e.preventDefault()
        signin({ username, password }).then(
            data => {
                console.log("data : ", data)
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    localStorage.setItem('jwt', JSON.stringify({ token: data.accessToken }))

                    if (bookingModalOpened) {
                        history.push('/?bookingModalOpened=true')
                    } else {
                        history.push('/')
                    }
                }
            })
    }

    const showError = () => {

    }


    // const ValidateEmail = (mail) => {
    //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    //         return (true)
    //     }
    //     return (false)
    // }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            // setValues({ ...values, error: true })
            handleSubmit()
        }
    }

    const isFilled = () => {
        if (username !== '') {
            return 'label label-active'
        } else {
            return 'label'
        }
    }

    const showForm = () => {
        return (
            <form onKeyDown={handleEnter} data-testid="signin-form" className={`signin-form `}>

                <div className="signin-header column">
                    <div className="signin-element column">
                        <img src="img/user.png" className="user-icon" />
                    </div>
                    <div className="signin-label column">Sign In</div>
                </div>

                <div className="signin-body">

                    <div className="signin-element">
                        <div>
                            <input type="email" name="username" id="Form-email1" className="form-control " onChange={handleChange('username')} placeholder="Username / Email" />
                        </div>
                    </div>

                    <div className="signin-element">
                        <div>
                            <input type="password" name="password" id="Form-pass1" className="form-control " onChange={handleChange('password')} placeholder="Password" />
                        </div>
                    </div>

                    {error && (<div className="position-absolute showError ">{error}</div>)}


                    <div className="signin-button-container">
                        <button type="button" className="signin-button" onClick={handleSubmit}>Sign in</button>
                    </div>


                    <div className="text-center">
                        <p>Have not had account yet?</p>
                    </div>

                    <div className="text-center sign-up-link" onClick={flipVisibility}>
                        <p>Sign Up</p>
                    </div>

                </div>
            </form>


        )
    }

    return (
        <div data-testid="signin-container" className={`signin-container ${visible === 0 ? 'sign-in-slide-down' : "sign-in-slide-up"}`}>
            {showForm()}
        </div>
    )
}

export default SignIn