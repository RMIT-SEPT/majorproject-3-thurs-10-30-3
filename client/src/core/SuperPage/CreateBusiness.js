import React, { useState, useEffect } from "react";
import "./CreateBusiness.scss";
import { createBusiness } from "../../API/businessAPI"
import { errorHandler } from "../common/errorhandler";
import SuperLayout from "./SuperLayout";
const CreateBusiness = ({ history, location }) => {

  const [values, setValues] = useState()
  const [serviceProvided, setServiceProvided] = useState([{ name: "", time: "" }])
  const [error, setError] = useState("")

  const handleChangeName = (index) => (e) => {
    var newArr = [...serviceProvided]
    newArr[index].name = e.target.value
    setServiceProvided(newArr)
  }

  const handleChangeTime = (index) => (e) => {
    var newArr = [...serviceProvided]
    newArr[index].time = e.target.value
    setServiceProvided(newArr)
  }

  const handleAdd = () => {
    setServiceProvided([...serviceProvided, { name: "", time: "" }])
  }

  const handleDelete = (index) => (e) => {
    var newArr = [...serviceProvided]
    newArr.splice(index, 1)

    setServiceProvided([...newArr])
  }
  const showServiceProvided = () => {
    return serviceProvided.map((s, index) => {
      return <div className="each-form row AIC service-provided-form">

        <label>Service name:</label>
        <input onChange={handleChangeName(index)} />
        <label>Service time:</label>
        <input onChange={handleChangeTime(index)} />
        {index !== 0 && <div className="delete-option btn" onClick={handleDelete(index)}>x</div>}
        {index === 0 && <div className="add-option btn" onClick={handleAdd}>Add</div>}
      </div>
    })
  }

  const handleSubmit = (e) => {
    createBusiness({ ...values, serviceProvided }).then(data => {
      if (data.errors) {
        alert(errorHandler(data.errors))
      } else {
        alert("Succesfully created")
        window.location.reload()
        setValues({})
        setServiceProvided([])
      }
    }).catch()
  }

  const handleChange = (option) => (e) => {
    setValues({ ...values, [option]: e.target.value })
  }

  const createBusinessForm = () => {
    return (
      <div className="create-form" >
        <div className="each-form">
          <label>Business name:</label>
          <input onChange={handleChange('name')} />
        </div>
        <div className="each-form">
          <label className="mr-1">Service type: </label>
          <input onChange={handleChange('serviceType')} />
        </div>
        {showServiceProvided()}
        <div className="submit-btn btn" onClick={handleSubmit}>Submit</div>
      </div>
    )

  }


  return (
    <SuperLayout >
      <div className="super-cont row AIC JCC">
        {createBusinessForm()}
      </div>
    </SuperLayout>

  );
};

export default CreateBusiness;
