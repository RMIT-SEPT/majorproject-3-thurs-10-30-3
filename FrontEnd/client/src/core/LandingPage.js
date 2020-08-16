import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./LandingPage.scss";
import { signin, authenticate } from "../API/userAPI";
import Loader from "./Loader";
import Parallax from "parallax-js"; // Now published on NPM
import anime from "animejs";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Layout from "./Layout";
import Booking from "./Booking";
import Modal from "../Template/Modal";
import queryString from "query-string";

const LandingPage = ({ history, location }) => {
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
  if (queryParams.has("bookingModalOpened")) {
    history.push("/");
  }
  console.log("bookingModalOpened : ", bookingModalOpened);
  // 0 for sign in and 1 for sign up

  useEffect(() => {}, []);

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

  return (
    <Layout>
      <div class="header">
        <div id="company_header">
          <p>(Company Name)</p>
        </div>
        <div id="user_header">
          <p>Welcome, (User's Name)</p>
        </div>
      </div>

      <div class="main_container">
        <div id="side_bar">
          <div class="sidebar_links">
            <div class="pagelink active">
              <p>Home</p>
            </div>
            <div class="pagelink">
              <p>View Bookings</p>
            </div>
            <div class="pagelink">
              <p>Edit Profile</p>
            </div>
          </div>
        </div>
        <div class="page_container">
          <div id="new_booking">
            <div id="company_info">
              <p>Company Logo</p>
            </div>
            <div id="button_book" onClick={openBookingModal}>
              <p>New Booking</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        opened={bookingModalOpened}
        setOpened={setBookingModalOpened}
        options={options}
      >
        <Booking />
      </Modal>
    </Layout>
  );
};

export default LandingPage;
