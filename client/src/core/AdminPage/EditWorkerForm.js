import React, { useState, useEffect } from "react";
import { createWorker, editWorker } from "../../API/workerAPI"
import { errorHandler } from "../common/errorhandler";
import "./EditWorkerForm.scss";

const EditWorkerForm = ({ history, reference, worker }) => {

  const { setOpened } = reference
  const [values, setValues] = useState({})
  const [days, setDays] = useState([])
  const [error, setError] = useState("")
  // const [user, setUser] = useState()

  const { name, address, phone, shift } = values;

  useEffect(() => {
    setValues({ ...worker })
    setDays(worker.days)
  }, [])

  const handleSubmit = (e) => {
    editWorker({ ...values, days, workerId:worker._id }).then(data => {
      if (data.errors) {
        alert(errorHandler(data.errors))
      } else {
        window.location.reload()
        
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

  const isChecked = (day) => {
    console.log("dat : ", day, " include:? ", days.includes(day))
    if (days.includes(day)) {
      return true
    } else {
      return false
    }

  }

  const editWorkerForm = () => {
    return (
      <div className="edit-worker-form" >
        <div className="each-form">
          <label>Name:<br /></label>
          <input value={name} onChange={handleChange('name')} />
        </div>
        <div className="each-form">
          <label>Address:<br /></label>
          <input value={address} onChange={handleChange('address')} />
        </div>
        <div className="each-form">
          <label>Phone:<br /></label>
          <input value={phone} onChange={handleChange('phone')} />
        </div>
        <div className="each-form">
          <label>Shift:<br /></label>
          <input value={shift} onChange={handleChange('shift')} />
        </div>
        <div className="each-form">
          <label>Day:<br /></label>
          <form className="row AIC JCC" onChange={handleDays}>
            <input type="checkbox" value="mon" checked={isChecked("mon")} />
            <label for="vehicle1"> Mon</label>
            <input type="checkbox" value="tue" checked={isChecked("tue")} />
            <label for="vehicle2"> Tue</label>
            <input type="checkbox" value="wed" checked={isChecked("wed")} />
            <label for="vehicle3"> Wed</label>
            <input type="checkbox" value="thu" checked={isChecked("thu")} />
            <label for="vehicle1"> Thu</label>
            <input type="checkbox" value="fri" checked={isChecked("fri")} />
            <label for="vehicle2"> Fri</label>
            <input type="checkbox" value="sat" checked={isChecked("sat")} />
            <label for="vehicle3"> Sat</label>
            <input type="checkbox" value="sun" checked={isChecked("sun")} />
            <label for="vehicle3"> Sun</label>
          </form>
        </div>

        <div className="submit-btn btn" onClick={handleSubmit}>Submit</div>
      </div>
    )
  }


  return (
    <div>
      {editWorkerForm()}
    </div>
  );
};

export default EditWorkerForm;
