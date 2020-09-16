import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./LandingPage.scss";
import Parallax from "parallax-js"; // Now published on NPM
import anime from "animejs";
import Layout from "../Layout";
import Booking from "../Booking";
import Modal from "../../Template/Modal";
import queryString from "query-string";

const LandingPage = ({ history, location }) => {


  const businessExamples = [
    {
      id: "5wvec6736246whvfev",
      name: "Sam's butcher"
    },
    {
      id: "86vec677dgvfev",
      name: "Hungry Jacks"
    },
    {
      id: "0wv34t646whvffev",
      name: "Mac Donald"
    },
  ]

  var jwt = JSON.parse(localStorage.getItem("jwt"));
  // var query = JSON.parse(location.search)
  var query = queryString.parse(window.location.search);

  const queryParams = new URLSearchParams(location.search);
  const [bookingModalOpened, setBookingModalOpened] = useState(
    queryParams.has("bookingModalOpened")
  );
  const [userLoggedIn, setUserLoggedIn] = useState(
    jwt && jwt.token ? true : false
  );

  const [keyword, setKeyword] = useState()
  const [result, setResult] = useState([])

  if (queryParams.has("bookingModalOpened")) {
    history.push("/");
  }


  useEffect(() => { }, []);

  // const flipVisibility = () => {
  //     if (visible === 1) {
  //         setVisible(0)
  //     } else {
  //         setVisible(1)
  //     }
  // }

  const openBookingModal = () => {
    if (userLoggedIn) {
      setBookingModalOpened(true);
    } else {
      history.push("/authentication?bookingModalOpened=true");
    }
  };

  const options = {
    width: "90vw",
    height: "90vh",
  };

  const renderResult = () => {
    return result.map((c) =>
      <div className="each-business" onClick={() => { history.push(`/business/${c.id}`) }}>{c.name}</div>
    )
  }

  const handleChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleEnter = (e) => {
    if(e.key == "Enter")
      handleClick()
  }

  const handleClick = () => {
    var array = businessExamples.filter((c) => {

      var lowerCase = c.name.toLowerCase()
      var keywordLowerCase = keyword.toLowerCase()

      if (lowerCase.includes(keywordLowerCase)) {
        return true
      } else {
        return false
      }
    })

    console.log("array : ", array)

    setResult(array)
  }

  return (
    <>
      <Layout />
      <div className="landing-page-cont row">
        <div className="first">
          <div className="heading">Welcome to Scheduler</div>
          <div className="description">
            <div> The all-in-one Online Scheduling and Appointment Booker for your favourite local businesses. </div>
            <br></br>
            <div> <b>Use the Search Bar Below to filter through the best in the business.</b> </div>
          </div>
          <div className="row">
            <input className="search-bar" value={keyword} onChange={handleChange} onKeyDown={handleEnter}/>
            <div className="btn search-btn" onClick={handleClick}>Search</div>
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
    </>
  );
};

export default LandingPage;
