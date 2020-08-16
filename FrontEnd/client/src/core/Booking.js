import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './Booking.scss'

const Booking = ({ history }) => {

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
        <div className="">
            welcome to booking modal
        </div>
    )
}

export default Booking