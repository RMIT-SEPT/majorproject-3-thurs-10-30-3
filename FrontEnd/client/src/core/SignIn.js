import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { signin, authenticate } from '../API/userAPI'
import Loader from './Loader'
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
            <form onKeyDown={handleEnter} className={`signin-form `}>
                <div class="signin-header">
                    <div class="row justify-content-center mr-3">
                        <img src="img/user.png" className="user-icon" />
                    </div>
                    <h3 class="" id="" ><strong>Sign in</strong></h3>
                </div>
                <div class="signin-body">

                    <div class="md-form ">
                        <input type="email" id="Form-email1" class="form-control " onChange={handleChange('username')} />
                        <label data-error="wrong" className={isFilled()} for="Form-email1">Your username</label>
                    </div>

                    <div class="md-form ">
                        <input type="password" id="Form-pass1" class="form-control " onChange={handleChange('password')} />
                        <label className={isFilled()} data-error="wrong" for="Form-pass1">Your password</label>
                    </div>
                    {error && (<div className="position-absolute showError ">{error}</div>)}
                    <div class="row justify-content-center mr-3 mt-5">
                        <button type="button" class="signin-button" onClick={handleSubmit}>Sign in</button>
                    </div>
                    <div className="text-center my-4">
                        Have not had account yet?
                    </div>
                    <div className="text-center my-4 sign-up-link pointer" onClick={flipVisibility}>
                        Sign up
                    </div>
                </div>
            </form>
        )
    }

    return (
        <div className={`signin-container ${visible === 0 ? 'sign-in-slide-down' : "sign-in-slide-up"}`}>
            {showForm()}
        </div>
    )
}

export default SignIn