import React, { useState, useEffect } from "react";
import SuperLayout from "./SuperLayout";
import { getListOfBusiness } from "../../API/businessAPI"
import { createAdmin, } from "../../API/adminAPI"
import { errorHandler } from "../common/errorhandler";
import "./CreateAdmin.scss";

const CreateAdmin = ({ history, location }) => {
  const [values, setValues] = useState({})
  const [error, setError] = useState("")
  const [business, setBusiness] = useState([])
  const [keyword, setKeyword] = useState("")
  const [selectedBusiness, setSelectedBusiness] = useState({})

  const {name,email,phone,address, password }=values

  useEffect(() => {
    getListOfBusiness().then(data => {
      setBusiness(data)
    }).catch()
  }, [])

  const handleSubmit = (e) => {
    console.log({ ...values, businessId: selectedBusiness._id})
    createAdmin({ ...values, businessId: selectedBusiness._id }).then(data => {
      if (data.errors) {
        alert(errorHandler(data.errors))
      } else {
        console.log("Data : ", data)
        alert("Succesfully created")
        window.location.reload()
        setKeyword("")
        setValues({})
      }
    }).catch()
  }

  const handleChange = (option) => (e) => {
    setValues({ ...values, [option]: e.target.value })
  }


  const showListOfBusiness = () => {
    var filtered = business.filter((b) => {
      if (b.name) {
        var lower = b.name?.toLowerCase()
        if (lower.includes(keyword.toLowerCase())) {
          return true
        } else {
          return false
        }
      }

    })

    return keyword !== "" && filtered.map(c => {
      return <div onClick={() => { setSelectedBusiness(c); setKeyword(c.name) }}>{c.name}</div>
    })
  }

  const createAdminForm = () => {
    return (
      <div className="create-form" >
        <div className="each-form">
          <label>Name:<br /></label>
          <input value={name} onChange={handleChange('name')} />
        </div>
        <div className="each-form">
          <label>Email:<br /></label>
          <input value={email} onChange={handleChange('email')} />
        </div>
        <div className="each-form">
          <label>Password:<br /></label>
          <input value={password} type="password" onChange={handleChange('password')} />
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
          <label>Business name:<br /></label>
          <input value={keyword} onChange={(e) => { setKeyword(e.target.value) }} />
          <div className="show-business-cont">
            {showListOfBusiness()}
          </div>
        </div>

        <div className="submit-btn btn" onClick={handleSubmit}>Submit</div>
      </div>
    )

  }


  return (
    <SuperLayout >
      <div className="super-cont row AIC JCC">
        {createAdminForm()}
      </div>
    </SuperLayout>
  );
};

export default CreateAdmin;
