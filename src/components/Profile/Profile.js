import "./profile.css";
import React from 'react'
import Nav from "../Nav/Nav";
import { auth } from "../../firebase";
function Profile() {
  return (
    <>
    <Nav/>
    <br/>
    <br/>
    <div className="profile">
    <div className="left">
        <img src="./dp.jpg"/>
        <div className="lable">
            <label>userName:</label><span></span>
            <label>Time Of Login:</label>
            <label>Email:</label>
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </div>
    <div className="right">

    </div>
    </div>
    </>
  )
}

export default Profile