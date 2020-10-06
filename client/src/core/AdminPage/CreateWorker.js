import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { createWorker, } from "../../API/workerAPI"
import { errorHandler } from "../common/errorhandler";
import "./CreateWorker.scss";
import { currentUser } from "../../API/userAPI";

const CreateWorker = ({ history, location }) => {

  const [values, setValues] = useState()
  const [days, setDays] = useState([])
  const [error, setError] = useState("")
  const [user, setUser] = useState()


  useEffect(() => {
    currentUser().then((data) => {
      if (data.errors) {

      } else {
        setUser(data.currentUser)
      }
    }).catch()
  }, [])

  const handleSubmit = (e) => {
    createWorker({ ...values, days, businessId: user.businessId }).then(data => {
      if (data.errors) {
        alert(errorHandler(data.errors))
      } else {
        console.log("Data : ", data)
        alert("Succesfully created")
        window.location.reload()
        setValues({})
      }
    }).catch()
  }

  const handleChange = (option) => (e) => {
    setValues({ ...values, [option]: e.target.value })
  }

  const handleDays = (e) => {
    if (days.includes(e.target.value)) {
      var newArr = [...days]
      var index = newArr.indexOf(e.target.value);
      newArr.splice(index, 1);
      setDays([...newArr])
    } else {
      setDays([...days, e.target.value])
    }
  }

  const createAdminForm = () => {
    return (
      <div className="create-form" >
        <div className="each-form">
          <label>Name:<br /></label>
          <input onChange={handleChange('name')} />
        </div>
        <div className="each-form">
          <label>Email:<br /></label>
          <input onChange={handleChange('email')} />
        </div>
        <div className="each-form">
          <label>Password:<br /></label>
          <input type="password" onChange={handleChange('password')} />
        </div>
        <div className="each-form">
          <label>Address:<br /></label>
          <input onChange={handleChange('address')} />
        </div>
        <div className="each-form">
          <label>Phone:<br /></label>
          <input onChange={handleChange('phone')} />
        </div>
        <div className="each-form">
          <label>Shift:<br /></label>
          <input onChange={handleChange('shift')} />
        </div>
        <div className="each-form">
          <label>Day:<br /></label>
          <form className="row AIC JCC" onChange={handleDays}>
            <input type="checkbox" value="mon" />
            <label for="vehicle1"> Mon</label>
            <input type="checkbox" value="tue" />
            <label for="vehicle2"> Tue</label>
            <input type="checkbox" value="wed" />
            <label for="vehicle3"> Wed</label>
            <input type="checkbox" value="thu" />
            <label for="vehicle1"> Thu</label>
            <input type="checkbox" value="fri" />
            <label for="vehicle2"> Fri</label>
            <input type="checkbox" value="sat" />
            <label for="vehicle3"> Sat</label>
            <input type="checkbox" value="sun" />
            <label for="vehicle3"> Sun</label>
          </form>
        </div>


        <div className="submit-btn btn" onClick={handleSubmit}>Submit</div>
      </div>
    )

  }


  return (
    <AdminLayout >
      <div className="super-cont row AIC JCC">
        {createAdminForm()}
      </div>
    </AdminLayout>
  );
};

export default CreateWorker;
