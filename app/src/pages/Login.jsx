import React from "react";
import "../style/login.css";
import {NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'
import toast , {Toaster} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

function Login() {

  const nav = useNavigate();

  const validate = (values) => {
    const errors = {};
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

  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/user/auth", values);
      if (!response.data.ok){
        toast.error(response.data.message);
      }else{
        localStorage.setItem('username',response.data.username)
        localStorage.setItem("userId", response.data.userId);
        nav('/')
      }
    } catch (error) {
      console.error(error);
    }
  };


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      console.log(values)
      handleLogin(values);
    },
  });


  return (
    <div className="login">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="login__header">
        <h2>eShop</h2>
        <p>Welcome back! Log in to continue shopping.</p>
      </div>
      <div className="login__form">
        <form onSubmit={formik.handleSubmit} >
          <p><input name="email" onChange={formik.handleChange} value={formik.values.email} type="text" placeholder="Email" /></p>
          {formik.errors.email ? <span>{formik.errors.email}</span> : null}
          <p><input name="password" onChange={formik.handleChange} value={formik.values.password} type="password" placeholder="Password" /></p>
          {formik.errors.password ? <span>{formik.errors.password}</span> : null}
          <br />
          <button type="submit">Log in</button>
        </form>
      </div>
      <div className="login__footer">
        <p>You don't have an account ?</p>
        <NavLink to={'/signup'}>
          Create an account
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
