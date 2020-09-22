import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createSchedule } from "../../API/businessAPI";
import "./Confirm.scss"
import { filterScheduleOnDateAndWorker, formatDate } from "./Calculate"
import { errorHandler } from "../common/errorhandler";
const Confirm = ({ history, reference, selectedDate, worker, selectedTime, selectedBusiness, serviceType, user }) => {
    const { setOpened } = reference.current
    const handleSubmit = () => {
        var businessId = selectedBusiness._id
        var userId = user.id
        var workerId = worker._id
        var scheduledTime = selectedTime
        // var serviceType = serviceType

        var formattedDate = formatDate(selectedDate)

        createSchedule({ businessId, userId, workerId, scheduledTime, serviceType, date: formattedDate }).then((data) => {
            if (data.errors) {
                alert(errorHandler(data.errors))
            } else {
                alert("Your appointment is succesfully scheduled")
                window.location.reload()
            }
        }).catch()
    }

    return (
        <div className="confirm-cont">
            <div className="header">
                Please confirm your appointment detail.
            </div>
            <div className="detail-cont">
                <div>Location : {selectedBusiness.name}</div>
                <div>Date : {formatDate(selectedDate)}</div>
                <div>Worker : {worker?.name}</div>
                <div>Time : {selectedTime}</div>
                <div>ServiceType : {serviceType.map(s => <span>{s.name}</span>)}</div>
            </div>
            <div className="row JCE btn-cont">
                <div className="submit-btn btn" onClick={handleSubmit}>Submit</div>
                <div className="cancel-btn btn" onClick={() => { setOpened(false) }}>Cancel</div>
            </div>
        </div>
    )
}

export default Confirm