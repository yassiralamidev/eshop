import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
import axios from 'axios'

function MyProfile({ userData,userId }) {
  const nav = useNavigate();
  let username = localStorage.getItem("username");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  const handleLogout=()=>{
    localStorage.removeItem('userId');
    nav('/login')
  }

  const handleDeleteAcc = async() =>{
    localStorage.removeItem('userId');
    try {
      const response = await axios.post(
        "http://localhost:8080/user/account/delete",
        {userId}
      );
      if (response.data.ok) {
        console.log(response.data.message);
        nav('/user/auth')
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userData && userData.accDate) {
      const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
      const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
      setDateStr(
        new Date(userData.accDate).toLocaleDateString("en-EN", dateOptions)
      );
      setTimeStr(
        new Date(userData.accDate).toLocaleTimeString("en-EN", timeOptions)
      );
    }
  }, [userData]);

  return (
    <div className="myProfile">
      <Avatar
        className="avatar"
        sx={{ bgcolor: "#2D7BD8", height: 70, width: 70 }}
      >
        {username[0].toUpperCase()}
      </Avatar>
      <p className="username">{userData.username}</p>
      <p>{userData.email}</p>
      <span>You created this account on:&nbsp;{dateStr}&nbsp;at&nbsp;{timeStr}</span>
      <button onClick={handleLogout} className="logout">
        Logout
      </button>
      <button onClick={handleDeleteAcc}>
        Delete My Account
      </button>
    </div>
  );
}

export default MyProfile;
