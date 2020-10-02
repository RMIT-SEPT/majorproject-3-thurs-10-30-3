import React, { useState, useEffect, useRef } from "react";
import UserLayout from "./WorkerLayout";
import { readCurrentUser, readUser } from "../../API/userAPI";
import "./WorkerProfile.scss"

const WorkerProfile = ({ history, location }) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    readCurrentUser().then((data) => {
      if (data.errors) {

      } else {
        setUser(data.currentUser)
      }
    }).catch()
  }, [])

  const renderDays = (days) => {

    return days?.map((d, index) => {
      if (index === 0) {
        d = d.charAt(0).toUpperCase() + d.slice(1);
        return <span>{d}</span>
      } else {
        d = d.charAt(0).toUpperCase() + d.slice(1);
        return <span>, {d}</span>
      }
    })
  }

  return (
    <UserLayout >
      <div className="row  user-profile-cont">
        <div className="profile-cont">
          <div className="header">Profile</div>
          <div className="each-field">Name : {user.name}</div>
          <div className="each-field"> Email : {user.email}</div>
          <div className="each-field">Address : {user.address}</div>
          <div className="each-field">Phone : {user.phone}</div>
          <div className="each-field">Shift : {user.shift}</div>
          <div className="each-field">Days : {renderDays(user.days)}</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default WorkerProfile;
