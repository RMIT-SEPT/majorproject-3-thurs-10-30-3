import React, { useState, useEffect, useLocation, useHistory } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './SignIn.scss'
import './SignUp.scss'
import { authenticate, register, signin } from '../API/userAPI'
import Loader from './Loader'
import Parallax from 'parallax-js' // Now published on NPM
import anime from 'animejs';
import queryString from 'query-string';

const SignUp = ({ history, visible, flipVisibility, location }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        history.push('/dashboard/locations')
    }

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
    })

    const { username, email, password, name, address, phone } = values

    const queryParams = new URLSearchParams(window.location.search)
    const [bookingModalOpened, setBookingModalOpened] = useState(queryParams.has('bookingModalOpened'))
    const [error, setError] = useState(false)

    useEffect(() => {

    }, [])

    const handleChange = name => event => {
        formValidation({ field: name, value: event.target.value })
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const formValidation = ({ field, value }) => {
        if (field === "passwrod") {

        } else if (field === "phone") {

        } else if (field === "username") {

        } else if (field === "name") {

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register({ ...values }).then(
            data => {
                console.log("data : ", data)
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else if (data.success === "true") {
                    signInOnSuccess()
                }
            })
    }

    const signInOnSuccess = () => {
        signin({ username, password }).then(
            data => {
                console.log("data : ", data)
                if (data.error) {
                    setError(data.error)
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

    const isFilled = (field) => {
        if (values[field] !== "") {
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
                <div class="body row">
                    <div className="col-6">
                        <div class="md-form ">
                            <input type="text" id="Form-pass1" class="form-control " onChange={handleChange('username')} />
                            <label className={isFilled("username")} data-error="wrong" for="Form-pass1">Your username</label>
                        </div>
                        <div class="md-form ">
                            <input type="email" id="Form-email1" class="form-control " onChange={handleChange('email')} />
                            <label data-error="wrong" className={isFilled("email")} for="Form-email1">Your email</label>
                        </div>

                        <div class="md-form ">
                            <input type="password" id="Form-pass1" class="form-control " onChange={handleChange('password')} />
                            <label className={isFilled("password")} data-error="wrong" for="Form-pass1">Your password</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div class="md-form ">
                            <input type="text" id="Form-pass1" class="form-control " onChange={handleChange('name')} />
                            <label className={isFilled("name")} data-error="wrong" for="Form-pass1">Your name</label>
                        </div>
                        <div class="md-form ">
                            <input type="text" id="Form-pass1" class="form-control " onChange={handleChange('address')} />
                            <label className={isFilled("address")} data-error="wrong" for="Form-pass1">Your address</label>
                        </div>
                        <div class="md-form ">
                            <input type="text" id="Form-pass1" class="form-control " onChange={handleChange('phone')} />
                            <label className={isFilled("phone")} data-error="wrong" for="Form-pass1">Your phone</label>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mr-3 mt-5">
                    <button type="button" class="signup-button" onClick={handleSubmit}>Sign Up</button>
                </div>
                {error && (<div className="position-absolute showError ">{error}</div>)}

                <div className="text-center my-3">
                    Already have account?
                </div>
                <div className="text-center my-4 sign-up-link pointer" onClick={flipVisibility}>
                    Sign up
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