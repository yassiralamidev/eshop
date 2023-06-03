import React, { useState, useEffect } from "react";
import "../style/account.css";
import { Navbar, MyProfile, MyOrders, EditProfile } from "../components";
import Login from "./Login";
import axios from "axios";

function Account() {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [user, setUser] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));
  if (!userId) {
    return <Login />;
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.post("http://localhost:8080/user/account", {
          userId,
        });
        console.log('data',data)
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);


  return (
    <>
      <Navbar />
      {user && (
        <div className="account">
          <div className="account__left">
            <p
              className={activeTab === "My Profile" ? "active" : ""}
              onClick={() => setActiveTab("My Profile")}
            >
              My Profile
            </p>
            <p
              className={activeTab === "My Orders" ? "active" : ""}
              onClick={() => setActiveTab("My Orders")}
            >
              My Orders
            </p>
            <p
              className={activeTab === "Edit Password" ? "active" : ""}
              onClick={() => setActiveTab("Edit Password")}
            >
              Edit Password
            </p>
          </div>
          <div className="account__right">
            {activeTab === "My Profile" && <MyProfile userId={userId} userData={user} />}
            {activeTab === "My Orders" && <MyOrders userData={user} />}
            {activeTab === "Edit Password" && <EditProfile userData={user} />}
          </div>
        </div>
      )}
    </>
  );
}

export default Account;
