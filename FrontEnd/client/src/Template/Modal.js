import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './Modal.scss';

//!!!Documentation
/*=============================================================
Step 1: In parents container, specify below attributes.

const [opened, setOpened]= useState(false)

const handleClick=()=>{
    setOpened(!opened)
}

const options={
    width:'50vw',
    height: '20vh'
}

Step 1: Feed them in Modal component.
<Modal opened={opened} setOpened={setOpened} options={options}>
<div>
    hi i am inside modal
</div>
</Modal>
============================================================*/

const Modal = ({ opened, setOpened, children, options }) => {

    const clickAway = (e) => {
        var target = e.target.closest(".modal-cont")
        if (target) {
        } else {
            setOpened(!opened)
        }
    }

    return opened ? (
        <div className="modal-background row align-items-center justify-content-center" onClick={clickAway} >
            <div className="modal-cont my-modal" style={{ height: options.height, width: options.width }}>
                {children}
            </div>
        </div>
    ) :
        <div>
        </div>
}

export default Modal