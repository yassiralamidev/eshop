import React from "react";
import "../style/signup.css"
import {  NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'
import toast , {Toaster} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

function Signup() {
  const nav = useNavigate();
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = '* Required';
    } else if (values.username.length < 6) {
      errors.username = '* Must be 6 characters or more';
    }
  
    if (!values.password) {
      errors.password = '* Required';
    } else if (values.password.length < 8) {
      errors.password = '* Must be 8 characters or more';
    }
  
    if (!values.email) {
      errors.email = '* Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = '* Invalid email address';
    }
  
    return errors;
  };

  const handleSignup = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/user/account/create", values);
      if (response.data.ok){
        console.log('response from server ==> ',response.data);
        toast.success(response.data.message);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem('username',response.data.username)
        nav('/')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const formik = useFormik({
    initialValues: {
      username:'',
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      handleSignup(values);
    },
  });

  return (
    <div className="signup">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="signup__header">
        <h2>eShop</h2>
        <p>Create an account to access our exclusive features.</p>
      </div>
      <div className="signup__form">
        <form onSubmit={formik.handleSubmit} >
          <p>
            <input name="username" onChange={formik.handleChange} value={formik.values.username} type="text" placeholder="Username" />
          </p>
          {formik.errors.username ? <span>{formik.errors.username}</span> : null}
          <p>
            <input name="email" onChange={formik.handleChange} value={formik.values.email} type="text" placeholder="Email" />
          </p>
          {formik.errors.email ? <span>{formik.errors.email}</span> : null}
          <p>
            <input name="password" onChange={formik.handleChange} value={formik.values.password} type="password" placeholder="Password" />
          </p>
          {formik.errors.password ? <span>{formik.errors.password}</span> : null}
          <br />
          <button type="submit">Create an account</button>
        </form>
      </div>
      <div className="signup__footer">
        <p>You have an account ?</p>
        <NavLink to='/login'>
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Signup;
