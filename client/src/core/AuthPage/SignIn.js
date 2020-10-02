import React, { useState, useEffect } from "react";
import { signin } from '../../API/userAPI'
import './SignIn.scss'
import { errorHandler } from '../common/errorhandler'
import queryString from 'query-string';

const SignIn = ({ history, visible, flipVisibility, location }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        history.push('/')
    }
    const [error,setError]= useState("")
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    })
    const { email, password, loading } = values;

    var query = queryString.parse(window.location.search)
    const [bookingModalOpened, setBookingModalOpened] = useState(query.bookingModalOpened ? true : false)

    useEffect(() => {

    }, [])

    const handleChange = name => event => {
        setValues({ ...values,  [name]: event.target.value });
        setError("")
    };

    const handleSubmit = (e) => {
        // e.preventDefault()
        signin({ email, password }).then(
            data => {
                console.log("data : ", data)
                if (data.errors) {
                    setError(errorHandler(data.errors))
                }
                else {
                    if(data.role==="super"){
                        history.push('/super/create/admin')
                    } else if(data.role==="admin"){
                        history.push('/admin/create/worker')
                    } else{
                        history.push('/')
                    }
                   
                }
            })
    }
  
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            // setValues({ ...values, error: true })
            handleSubmit()
        }
    }

    const isFilled = (field) => {
        if (values[field] !== "") {
            // Set Border of Input to Red
            return 'label-active'
        } else {
            return 'form-control'
        }
    }

    const showForm = () => {
        return (
            <form onKeyDown={handleEnter} data-testid="signin-form" className={`signin-form `}>

                <div className="signin-header column">
                    {/* <div className="signin-element column">
                        <img src="img/user.png" className="user-icon" />
                    </div> */}
                    <div className="signin-label-main column">Sign In</div>
                </div>
                <div className="error-message">
                    {error !== "" && error}
                </div>

                <div className="form-cont">
                    {/* Label Only Used to Show Errors */}
                    <div className="each-form row JCC">
                        <input type="email" name="username" id="Form-email1" onChange={handleChange('email')} />
                        <label data-error="wrong" for="Form-email1" className={isFilled('email')}>Email</label>
                    </div>

                    <div className="each-form row JCC">
                        <input type="password" name="password" id="Form-pass1" onChange={handleChange('password')} />
                        <label className={isFilled('password')} data-error="wrong" for="Form-pass1">Password</label>
                    </div>

                    {error && (<div className="position-absolute showError ">{error}</div>)}
                </div>


                <div className="signin-button-container">
                    <div type="button" className="signin-button btn" onClick={handleSubmit}>Sign in</div>
                    <div className="text-center">
                        <p>Don't have an Account?</p>
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