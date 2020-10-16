import React, { useState, useEffect, useRef } from "react";
import UserLayout from "./UserLayout";
import "./UserHistory.scss";
import { readCurrentUser } from "../../API/userAPI";
import "./UserProfile.scss"

const UserProfile = ({ history, location }) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    readCurrentUser().then((data) => {
      if (data.errors) {

      } else {
        setUser(data.currentUser)
      }
    }).catch()
  }, [])

  return (
    <UserLayout >
      <div className="row  user-profile-cont">
        <div className="profile-cont">
          <div className="header">Profile</div>
          <div className="each-field">Name : {user.name}</div>
          <div className="each-field"> Email : {user.email}</div>
          <div className="each-field">Address : {user.address}</div>
          <div className="each-field">Phone : {user.phone}</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
