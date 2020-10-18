import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.scss";
import Layout from "../Layout";
import Booking from "../BookingModal/Booking";
import Modal from "../../Template/Modal";
import queryString from "query-string";
import { getListOfBusiness } from "../../API/businessAPI";
import { errorHandler } from "../common/errorhandler";
import { currentUser, isAuthenticated } from "../../API/userAPI";

const LandingPage = ({ history, location }) => {


  var jwt = JSON.parse(localStorage.getItem("jwt"));
  // var query = JSON.parse(location.search)
  var query = queryString.parse(window.location.search);

  const queryParams = new URLSearchParams(location.search);
  const [bookingModalOpened, setBookingModalOpened] = useState();
  const [user, setUser] = useState();

  const [keyword, setKeyword] = useState()
  const [result, setResult] = useState([])
  const [business, setBusiness] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState()

  if (queryParams.has("bookingModalOpened")) {
    history.push("/");
  }

  useEffect(() => {
    getListOfBusiness().then((data) => {
      if (data.errors) {
        alert(errorHandler(data.errors))
      } else {
        setBusiness(data)
      }
    }).catch()

    currentUser().then((data) => {
      if (data.currentUser === null) {
      } else {
        setUser(data.currentUser)
      }
    })

  }, []);

  const handleClickBusiness = (b) => (e) => {
    if (user) {
      setBookingModalOpened(true)
      setSelectedBusiness(b)
    } else {
      alert("Please login to make appointment")
    }
  }

  const renderResult = () => {

    var array = business.filter((c) => {

      var lowerCase = c.name.toLowerCase()
      var keywordLowerCase = keyword?.toLowerCase()

      if (lowerCase.includes(keywordLowerCase)) {
        return true
      } else {
        return false
      }
    })

    return array.map((b) =>
      <div className="each-business" onClick={handleClickBusiness(b)}>{b.name}</div>
    )
  }

  const handleChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.key == "Enter")
      handleClick()
  }

  const handleClick = () => {
    var array = business.filter((c) => {

      var lowerCase = c.name.toLowerCase()
      var keywordLowerCase = keyword.toLowerCase()

      if (lowerCase.includes(keywordLowerCase)) {
        return true
      } else {
        return false
      }
    })

    setResult(array)
  }

  const options = {
    width: "90vw",
    height: "90vh",
  };

  return (
    <>
      <Layout />
      <div className="landing-page-cont row">
        <div className="first">
          <div className="heading">Welcome to Scheduler!</div>
          <div className="description">
            <div> The all-in-one Online Scheduling and Appointment Booker for your favourite local businesses. </div>
            <br></br>
            <div> <b>Use the Search Bar Below to filter through the best in the business.</b> </div>
          </div>
          <div className="row">
            <input className="search-bar" value={keyword} onChange={handleChange} onKeyDown={handleEnter} />
            <div className="btn search-btn">Search</div>
          </div>
          <div className="result-cont">
            {renderResult()}
          </div>
        </div>
        <div className="second">
          <img className="first-img" src={require('./img/illustration.jpg')} />
          <img className="second-img" src={require('./img/illustration2.jpg')} />
        </div>
      </div>

      <Modal opened={bookingModalOpened} setOpened={setBookingModalOpened}>
        <Booking reference={useRef({ setOpened: setBookingModalOpened })} selectedBusiness={selectedBusiness} user={user}/>
      </Modal>
    </>
  );
};

export default LandingPage;
