import React from "react";

const Loader = ({ loading }) => {
    return (
        <div style={{ display: loading ? "" : "none" }} class="loading row justify-content-center align-items-center mx-0" >
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-yellow-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader