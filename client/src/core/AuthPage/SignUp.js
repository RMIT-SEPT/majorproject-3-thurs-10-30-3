import React, { useState, useEffect, useLocation, useHistory } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './SignUp.scss'
import { authenticate, signup, signin } from '../../API/userAPI'
import Parallax from 'parallax-js' // Now published on NPM
import anime from 'animejs';
import queryString from 'query-string';
import { errorHandler } from '../common/errorhandler'
const SignUp = ({ history, visible, flipVisibility, location }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        history.push('/')
    }

    const [error, setError] = useState("")
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    })

    const { name, email, password, address, phone } = values

    const queryParams = new URLSearchParams(window.location.search)
    const [bookingModalOpened, setBookingModalOpened] = useState(queryParams.has('bookingModalOpened'))

    useEffect(() => {

    }, [])

    const handleChange = name => event => {
        formValidation({ field: name, value: event.target.value })
        setValues({ ...values, [name]: event.target.value });
        setError("")
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
        signup({ ...values }).then(
            data => {
                console.log("data : ", data)
                if (data.errors) {
                    console.log("errorHandler(data.errors): ", errorHandler(data.errors))
                    setError(errorHandler(data.errors))
                }
                else {
                    alert("succesful")
                }
            })
    }

    // const signInOnSuccess = () => {
    //     signin({ ...values }).then(
    //         data => {
    //             console.log("data : ", data)
    //             if (data.error) {
    //                 setError(data.error)
    //             }
    //             else {
    //                 localStorage.setItem('jwt', JSON.stringify({ token: data.accessToken }))
    //                 if (bookingModalOpened) {
    //                     history.push('/?bookingModalOpened=true')
    //                 } else {
    //                     history.push('/')
    //                 }
    //             }
    //         })
    // }

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
            <form onKeyDown={handleEnter} data-testid="signup-form" className={`signup-form`} >


                <div className="signup-header">
                    {/* <div>
                        <img src="img/user.png" className="user-icon" />
                    </div> */}
                    <div className="signup-label-main">Sign Up</div>
                </div>


                <div class="form-cont JCC row">
                    <div className="half">
                        <div className="each-form">
                            <input type="text" id="Form-pass1" name="name" class="form-control " onChange={handleChange('name')} />
                            <label className={isFilled("name")} data-error="wrong" for="Form-pass1">Your name</label>
                        </div>
                        <div className="each-form">
                            <input type="email" id="Form-email1" name="email" class="form-control " onChange={handleChange('email')} />
                            <label data-error="wrong" className={isFilled("email")} for="Form-email1">Your email</label>
                        </div>

                        <div className="each-form">
                            <input type="password" id="Form-pass1" name="password" class="form-control " onChange={handleChange('password')} />
                            <label className={isFilled("password")} data-error="wrong" for="Form-pass1">Your password</label>
                        </div>
                    </div>
                    <div className="half">
                        <div className="each-form">
                            <input type="text" id="Form-pass1" class="form-control " onChange={handleChange('address')} />
                            <label className={isFilled("address")} data-error="wrong" for="Form-pass1">Your address</label>
                        </div>
                        <div className="each-form">
                            <input type="text" id="Form-pass1" class="form-control " onChange={handleChange('phone')} />
                            <label className={isFilled("phone")} data-error="wrong" for="Form-pass1">Your phone</label>
                        </div>
                        <div className="error-message">
                            {error !== "" && error}
                        </div>
                    </div>
                </div>

                <div className="signup-button-container">
                    <button type="button" className="signup-button" onClick={handleSubmit}>Sign Up</button>

                    <div className="text-center">
                        <p>Already have an Account?</p>
                    </div>

                    <div className="text-center sign-up-link" onClick={flipVisibility}>
                        Sign In
                    </div>
                </div>

            </form>
        )
    }

    return (
        <div data-testid="signup-container" className={`signup-container ${visible === 1 ? 'sign-up-slide-left' : "sign-up-slide-right"}`}>
            {showForm()}
        </div>
    )
}

export default SignUp