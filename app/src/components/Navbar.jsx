import React, { useState } from "react";
import "../style/navbar.css";
import {ShoppingBag} from './icons'
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

function Navbar(){
  const nav = useNavigate('/');
  const [show,setShow] = useState(false);
  const [scroll,setScroll]= useState(false);
  let userId = parseInt(localStorage.getItem("userId"));
  let username = localStorage.getItem("username");

  const changeBackground = () => {
    if (window.scrollY >= 5) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }
  window.addEventListener('scroll', changeBackground);

  
  const handleLogout=()=>{
    localStorage.removeItem('userId');
    nav('/login')
  }
  const handleLogin=()=>{
    localStorage.removeItem('userId');
    nav('/login')
  }

  return (
    <>
    <div className={scroll ? 'navbar scroll' : 'navbar'}>
      <div className="navbar__left">
        <p>eShop</p>
      </div>
      <div className="navbar__routes">
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/products">
          Products
        </NavLink>
        <NavLink to="/contact">
          Contact Us
        </NavLink>
      </div>
      <div className="navbar__right">
        <NavLink to='/cart'>
          <ShoppingBag/>
        </NavLink>
        <div>
          {
            userId ? 
            <Avatar onClick={()=>{setShow(!show)}} className="avatar" sx={{ bgcolor:'#2D7BD8',height:30,width:30}}>
              {username[0].toUpperCase()}
            </Avatar>
              : 
            <button onClick={handleLogin}> Login </button> 
            }
        </div>
      </div>
    </div>
    {show && (
      <div className="profileDropdown">
        <p>
          <NavLink to='/account'>My Account</NavLink>
        </p>
        <p>
          <button onClick={handleLogout}>Log Out</button>
        </p>
      </div>
    )}
  </>
  );
}

export default Navbar;
