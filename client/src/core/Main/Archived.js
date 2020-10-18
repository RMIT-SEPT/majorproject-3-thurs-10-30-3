import React, { useState, useEffect } from "react";
import "./archived.scss";
import Layout from "../Layout";
import queryString from "query-string";

const Archived = ({ history, location }) => {
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

  const businessExamples = [
    {
      name: "Sam's butcher"
    },
    {
      name: "Hungry Jacks"
    },
    {
      name: "Mac Donald"
    },
  ]

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
      {/* <Modal
        opened={bookingModalOpened}
        setOpened={setBookingModalOpened}
        options={options}
      >
        <Booking />
      </Modal> */}
    </Layout>
  );
};

export default Archived;
