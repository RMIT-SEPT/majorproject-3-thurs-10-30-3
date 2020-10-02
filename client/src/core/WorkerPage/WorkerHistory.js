import React, { useState, useEffect, useRef } from "react";
import UserLayout from "./WorkerLayout";
import { errorHandler } from "../common/errorhandler";
import "./WorkerHistory.scss";
import { readCurrentUser, readUser } from "../../API/userAPI";
import { getBusiness, cancelSchedule } from "../../API/businessAPI";

const WorkerHistory = ({ history, location }) => {

  const [error, setError] = useState("")
  const [user, setUser] = useState({})
  const [business, setBusiness] = useState({})
  const [schedules, setSchedules] = useState([])

  const populateUser = (ss) => {
    ss.map((s, index) => {
      readUser({ userId: s.userId }).then((data) => {
        var newArr = [...ss]
        newArr[index].user = data
        setSchedules([...newArr])
      }).catch()
    })
  }

  const getWorkerSchedule = (currentUser) => {
    getBusiness({ businessId: currentUser.businessId }).then((data) => {
      if (data.errors) {
        alert(errorHandler(data.errors))
      } else {

        var filterdSchedule = data.schedules.filter((s) => {
          if (s.workerId === currentUser._id) {
            return true
          } else {
            return false
          }
        })

        setSchedules(filterdSchedule)
        populateUser(filterdSchedule)

      }
    }).catch()
  }

  useEffect(() => {
    readCurrentUser().then((data) => {
      if (data.errors) {
        alert(errorHandler(data.errors))
      } else {
        setUser(data.currentUser)
        getWorkerSchedule(data.currentUser)

      }
    }).catch()
  }, [])

  const renderServiceType = (serviceType) => {
    return serviceType?.map((d, index) => {

      return <div>{d.name}</div>
    })
  }


  const renderSchedule = () => {
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
              <td>{s.user?.name}</td>
              <td>{s.user?.phone}</td>
              <td>{s.date}</td>
              <td>{s.scheduledTime}</td>
              <td>{renderServiceType(s.serviceType)}</td>
            </tr>
          )
        })}
      </table >
    )
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

export default WorkerHistory;
