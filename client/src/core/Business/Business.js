import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './Business.scss'
import { signin, authenticate } from '../../API/userAPI'



const Business = ({ history, match }) => {

    useEffect(() => {

    }, [])

    return (
        <div className={'business-cont'}>
            Welcome!
            {match.params.businessId}
        </div>
    )
}

export default Business