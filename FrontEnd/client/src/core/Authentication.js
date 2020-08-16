import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './Main.scss'
import { signin, authenticate } from '../API/userAPI'
import Loader from './Loader'
import Parallax from 'parallax-js' // Now published on NPM
import anime from 'animejs';
import SignIn from './SignIn'
import SignUp from "./SignUp";


const Main = ({ history }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        history.push('/dashboard/locations')
    }

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    })

    // 0 for sign in and 1 for sign up
    const [visible, setVisible] = useState(0)
    const { email, password, loading, error } = values;

    useEffect(() => {
        // var parallax = new Parallax(document.getElementById('scene'))

        // anime({
        //     targets: '.morph',
        //     easing: 'easeInOutQuint',
        //     duration: 1000,
        //     loop: false,
        //     d: [
        //         {
        //             value: middleValue
        //         }

        //         // {
        //         //     value: "M0,0S35.68,426.3,270.517,423.268,414.871,297.2,590.707,297.2c106.908,0,277.86,195.024,310.862,194.475,84.187-1.4,283.11-278.521,469.674-281.556s126.164,323.813,272.15,378.21,240.9-18.452,265.62-31.059S1922.585,1080,1922.585,1080H0Z"
        //         // },
        //         // {value: "M0,1080s24.4-.675,254.065,0,145.874,0,321.71,0,233.022.586,322.1,0,194.1-.675,379.879,0,107.792-.586,258.4,0,217.906-.675,244.382,0,142.046,0,142.046,0H0Z" }
        //     ],
        // });
    }, [])

    const flipVisibility = () => {
        if (visible === 1) {
            setVisible(0)
        } else {
            setVisible(1)
        }
    }

    return (
        <div className={`main-cont ${visible === 1 && 'main-cont-enlarged'} row align-items-center justify-content-end`}>
            <SignIn visible={visible} flipVisibility={flipVisibility} />
            <SignUp visible={visible} flipVisibility={flipVisibility} />

            {/* <ul id="scene">
                <li class="layer polygons" data-depth="0.15"><img src="img/main/polygons.png" alt="image" /></li>
                <li class="layer filledpolygon" data-depth="0.09"><img src="img/main/filledpolygon.png" alt="image" /></li>
                <li class="layer tour" data-depth="-0.34"><img src="img/main/userfriendly.png" alt="a" /></li>
                <li class="layer unicorn" data-depth="0.09"><img src="img/main/business.png" alt="image" /></li>
                <li class="layer ease" data-depth="-0.1"><img src="img/main/easeofuse.png" alt="image" /></li>
                <li class="layer smart" data-depth="-0.05"><img src="img/main/efficiency.png" alt="image" /></li>
                <li class="layer tour" data-depth="-0.11"><img src="img/main/inspiration.png" alt="a" /></li>
                <li class="layer tour" data-depth="-0.14"><img src="img/main/locations.png" alt="a" /></li>
                <li class="layer tour" data-depth="-0.04"><img src="img/main/management.png" alt="a" /></li>
                <li class="layer tour" data-depth="0.34"><img src="img/main/plan.png" alt="a" /></li>
                <li class="layer tour" data-depth="0.14"><img src="img/main/schedule.png" alt="a" /></li>
                <li class="layer tour" data-depth="-0.24"><img src="img/main/smarttour.png" alt="a" /></li>
                <li class="layer tour" data-depth="0.24"><img src="img/main/travel.png" alt="a" /></li>
            </ul> */}
            <Loader loading={loading} />
        </div>
    )
}

export default Main