import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './SignIn.scss'
import './SignUp.scss'
import { signin, authenticate } from '../API/userAPI'
import Loader from './Loader'
import Parallax from 'parallax-js' // Now published on NPM
import anime from 'animejs';

const SignUp = ({ history, visible, flipVisibility }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        history.push('/dashboard/locations')
    }

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    })
    const { email, password, loading, error } = values;

    useEffect(() => {

    }, [])

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        signin({ email, password }).then(
            data => {
                console.log("data : ", data)
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    authenticate(data, () => {
                        history.push('/dashboard/locations')
                    });
                }
            })
    }

    const showError = () => {

    }

    const ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            if (ValidateEmail(email)) {
                handleSubmit(e)
            } else {
                setValues({ ...values, error: true })
            }
        }
    }

    const isFilled = () => {
        if (email !== '') {
            return 'label label-active'
        } else {
            return 'label'
        }
    }

    const showForm = () => {
        return (
            <form onKeyDown={handleEnter} className={`signup-form`} >
                <div class="header">
                    <div class="row justify-content-center mr-3">
                        <img src="img/user.png" className="user-icon" />
                    </div>
                    <h3 class="" id="" ><strong>Sign Up</strong></h3>
                </div>
                <div class="body">

                    <div class="md-form ">
                        <input type="email" id="Form-email1" class="form-control " onChange={handleChange('email')} />
                        <label data-error="wrong" className={isFilled()} for="Form-email1">Your email</label>
                    </div>

                    <div class="md-form ">
                        <input type="password" id="Form-pass1" class="form-control " onChange={handleChange('password')} />
                        <label className={isFilled()} data-error="wrong" for="Form-pass1">Your password</label>
                    </div>
                    {error && (<div className="position-absolute showError ">{error}</div>)}
                    <div class="row justify-content-center mr-3 mt-5">
                        <button type="button" class="signup-button" onClick={handleSubmit}>Sign in</button>
                    </div>
                    <div className="text-center my-3">
                        Already have account?
                    </div>
                    <div className="text-center my-4 sign-up-link pointer" onClick={flipVisibility}>
                        Sign up
                    </div>
                </div>
            </form>
        )
    }

    return (
        <div className={`signup-container ${visible === 1 ? 'sign-up-slide-left' : "sign-up-slide-right"}`}>
            {showForm()}
        </div>
    )
}

export default SignUp