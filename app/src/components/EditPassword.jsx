import React, { useState } from 'react';
import { VisibilityIcon } from './icons';
import axios from 'axios'
import { Toaster, toast } from "react-hot-toast";

function EditPassword() {
  const [oldPassword,setOldPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState({});
  const handlePasswordVisibility = (id) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const handleEditPassword=async()=>{
    const userId = localStorage.getItem("userId");
    if (!newPassword && !oldPassword) {
      toast.error("Please enter your current password & the new password");
    }
    else if( newPassword === oldPassword) {
      toast.error("The new password must be different from the curent password")
    }else if(newPassword.length < 8){
      toast.error("Must be 8 characters or more")
    }
    else{
      try{
      const response = await axios.post("http://localhost:8080/user/account/update_password",
        {userId,oldPassword,newPassword}
      );
      if(response.data.ok){
        toast.success(response.data.message);
        setNewPassword('');
        setOldPassword('');
      }else{
        toast.error(response.data.message);
      }    
    }
    catch(error){
      console.error(error);
    }
    }
  }

  return (
    <div className="editPassword">
      <Toaster />
      <div className="editPassword__header">
        <h3>Edit Password</h3>
        <p>You can change the password anytime you want 🔑.</p>
      </div>
      <div className="editPassword__body">
        <div className="inputField">
          <input
            type={showPassword['current'] ? 'text' : 'password'}
            value={oldPassword}
            onChange={e=>setOldPassword(e.target.value)}
            placeholder="Current Password"
          />
          <VisibilityIcon onClick={() => handlePasswordVisibility('current')} />
        </div>
        <div className="inputField">
          <input
            type={showPassword['new'] ? 'text' : 'password'}
            value={newPassword}
            onChange={(e)=>{setNewPassword(e.target.value)}}
            placeholder="New Password"
          />
          <VisibilityIcon onClick={() => handlePasswordVisibility('new')} />
        </div>
        <button onClick={()=>{handleEditPassword()}}>Change Password</button>
      </div>
    </div>
  );
}

export default EditPassword;
