import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import UserLayout from "./UserLayout";
import { createWorker, } from "../../API/workerAPI"
import { errorHandler } from "../common/errorhandler";
import "./UserHistory.scss";
import { readCurrentUser, readUser } from "../../API/userAPI";
import { getBusiness, cancelSchedule } from "../../API/businessAPI";
import Modal from "../../Template/Modal"
import "./UserHistory.scss"

const UserHistory = ({ history, location }) => {

  const [error, setError] = useState("")
  const [user, setUser] = useState({})
  const [business, setBusiness] = useState({})

  const [schedules, setSchedules] = useState([])

  const populateWorkerAndBusiness = (ss) => {
    ss.map((s, index) => {

      getBusiness({ businessId: s.businessId }).then((data) => {
        console.log("schedules in read busiens :", ss)
        var newArr = [...ss]
        newArr[index].business = data
        setSchedules([...newArr])
        console.log("schedules after :", [...newArr])

      }).catch()

      readUser({ userId: s.workerId }).then((data) => {
        console.log("schedules in read wokrer :", ss)
        var newArr = [...ss]
        newArr[index].worker = data
        setSchedules([...newArr])
        console.log("schedules after :", [...newArr])

      }).catch()
    })
  }

  useEffect(() => {
    readCurrentUser().then((data) => {
      if (data.errors) {

      } else {
        setUser(data.currentUser)
        setSchedules(data.currentUser.schedules)
        console.log("data.currentUser.schedules :", data.currentUser.schedules)
        populateWorkerAndBusiness(data.currentUser.schedules)
      }
    }).catch()


  }, [])


  const handleCancel = (schedule) => () => {
    var r = window.confirm("Do you want to cancel this schedule?");

    if (r) {
      console.log("scheduleId:schedule._id : ", schedule._id)
      console.log("userId : ", schedule.userId)
      console.log("businessID : ", schedule.businessId)
      var userId = schedule.userId
      var businessId = schedule.businessId
      var scheduleId = schedule._id
      cancelSchedule({ userId, businessId, scheduleId }).then((data) => {
        if (data.errors) {
          alert(errorHandler(data.errors))
        } else {
          window.location.reload()
        }
      }).catch()
    } 

  }

  const renderSchedule = () => {
    // return schedules?.map(s => <div>{JSON.stringify(s)}</div>)
    return (
      <table className="table-cont" >
        <tr>
          <th>Location</th>
          <th>Worker Name</th>
          <th>Date</th>
          <th>Time</th>
        </tr>

        {schedules?.map((s, index) => {
          return (
            <tr className="tr">
              <td>{s.business?.name}</td>
              <td>{s.worker?.name}</td>
              <td>{s.date}</td>
              <td>{s.scheduledTime}</td>
              <td className="cancel-btn btn" onClick={handleCancel(s)}>Cancel</td>
            </tr>
          )
        })}
      </table >
    )
  }


  const editWorkerModalStyle = {
    width: '50vw',
    height: '47vw'
  }

  return (
    <UserLayout >
      <div className="schedule-cont">
        <div className="header">My schedule</div>
        {renderSchedule()}
      </div>
    </UserLayout>
  );
};

export default UserHistory;
