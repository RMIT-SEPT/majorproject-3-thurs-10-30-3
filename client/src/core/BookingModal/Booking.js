import React, { useState, useEffect, useRef } from "react";
import {  readUser } from "../../API/userAPI";
import './Booking.scss'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { calculateAvailability } from './Calculate'
import Modal from "../../Template/Modal"
import Confirm from "./Confirm";

const Booking = ({ history, selectedBusiness, reference, user}) => {

    const {  setOpened } = reference

    const [business, setBusiness] = useState(selectedBusiness)
    const [worker, setWorker] = useState()
    const [selectedTime, setSelectedTime] = useState()
    const [date, setDate] = useState()
    const [service, setService] = useState([])

    const [confirmModal, setConfirmModal] = useState(false)
    useEffect(() => {
        populateWorkerData(business.workers)
    }, [])

    const populateWorkerData = (workers) => {
        var length = workers.length
        var count = 0
        var newWorkers = []
        workers.map((w) => {
            readUser({ userId: w }).then((data) => {
                if (length - 1 === count) {
                    newWorkers.push(data)
                    setBusiness({ ...business, workers: newWorkers })

                } else {
                    newWorkers.push(data)
                    count = +1
                }
            }).catch()
        })
    }

    const isActiveTime = (t) => {
        if (t === selectedTime) {
            return "active-each-time each-time"
        } else {
            return "each-time"
        }
    }

    const renderAvailableTime = () => {
        // worker.shift // worker.schedules
        var totalServiceTime = 0


        service.map((s) => {
            totalServiceTime = totalServiceTime + parseInt(s.time)
        })
        if (worker) {

            const { shift, name } = worker

            // var filteredSchedule = filterScheduleOnDateAndWorker({ date, worker, businessSchedule: business.schedules })
            var arr = calculateAvailability({ shift, schedules: business.schedules, totalServiceTime, worker, date })

            return (
                <div className="available-time-cont">
                    <div className="header">Select time</div>
                    {arr.length > 0 ? <div className="row-w AIC times-cont">
                        {arr.map(t => <div className={isActiveTime(t)} onClick={() => { setSelectedTime(t) }}>{t}</div>)}
                    </div> :
                        <div className="not-available-message">{worker.name} is not available on this date</div>
                    }
                </div>
            )
        }
    }

    const isActiveWorker = (w) => {
        if (w?.name === worker?.name) {
            return 'active-each-worker each-worker'
        } else {
            return 'each-worker'

        }
    }

    const renderWorker = () => {
        return (
            <div className="select-worker-cont ">
                <div className="header">Select worker</div>
                <div className="row AIC">
                    {business.workers?.map(w => <div className={isActiveWorker(w)} onClick={() => { setWorker(w) }}>{w.name}</div>)}
                </div>
            </div>
        )
    }

    var week = new Date();
    week.setDate(week.getDate() + 7);
    const renderCalender = () => {
        return (
            <>
                <div className="header">Select date</div>
                <Calendar
                    maxDate={week}
                    minDate={new Date()}
                    onChange={setDate}
                    value={date}
                />
            </>
        )
    }

    const handleServices = (e) => {
        var value = JSON.parse(e.target.value)
        var alreadyExist = false
        service.map(s => {
            if (s.name === value.name) {
                alreadyExist = true
            }
        })

        if (alreadyExist) {
            var filteredArr = service.filter(s => {
                if (s.name === value.name) {
                    alreadyExist = true

                } else {
                    return s
                }
            })
            setService([...filteredArr])
        } else {
            setService([...service, value])
        }
    }

    const renderServiceProvided = () => {
        return (
            <div className="service-provided-cont">
                <div className="header">Please select service</div>
                <form className="row-w AIC " onChange={handleServices}>
                    {business.serviceProvided.map((s) =>
                        <div className="each-service">
                            <input type="checkbox" value={JSON.stringify(s)} />
                            <label for="vehicle1"> {s.name}</label>
                        </div>
                    )}
                </form>
            </div>
        )
    }

    const isActive = () => {
        if (date !== undefined && service.length !== 0) {
            return 'second'
        } else {
            return 'second display-none'
        }
    }

    return (
        <>
            <div className="booking-cont">
                {console.log("business : ", business)}
                <div className="header text-center"> Welcome to {business.name}</div>
                <div className="row content-cont">
                    <div className="first">
                        {renderCalender()}
                        {renderServiceProvided()}
                    </div>
                    <div className={isActive()}>
                        {renderWorker()}
                        {renderAvailableTime()}
                        {selectedTime && worker && <div className="btn submit-btn" onClick={() => setConfirmModal(true)}>Submit</div>}

                    </div>
                </div>

            </div>
            <Modal opened={confirmModal} setOpened={setConfirmModal}>
                <Confirm reference={useRef({ setOpened: setConfirmModal })}
                    selectedDate={date} worker={worker} selectedTime={selectedTime}
                    selectedBusiness={selectedBusiness} serviceType={service} user={user} />
            </Modal>
        </>
    )
}

export default Booking