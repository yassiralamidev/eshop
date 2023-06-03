import React, { useState, useEffect } from "react";
import { Login } from "./";
import "../style/checkout.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const nav = useNavigate();
  const [userCart, setUserCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(
    parseInt(localStorage.getItem("userId"))
  );
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const { data } = await axios.post("http://localhost:8080/user/account", {
          userId,
        });
        setUserCart(data.cart);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      getUserCart();
    }
  }, [userId]);

  useEffect(() => {
    let sum = 0;
    userCart.forEach((item) => {
      sum += item.quantity * item.price;
    });
    setTotal(sum);
  }, [userCart]);

  const handleSubmit = async () => {
    const { firstName, lastName, email, address, city, zipCode } =
      formik.values;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error && userId) {
      const response = await axios.post("http://localhost:8080/user/cart/checkout", {
        userId,
        firstName,
        lastName,
        email,
        address,
        city,
        zipCode,
        paymentMethodId: paymentMethod.id,
        total,
      });
      if (response.data.ok) {
        toast.success(response.data.message);
        nav('/cart');
      }
    } else {
      toast.error(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    },
    onSubmit: () => {
      handleSubmit();
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = "Required";
      }
      if (!values.lastName) {
        errors.lastName = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.address) {
        errors.address = "Required";
      }
      if (!values.city) {
        errors.city = "Required";
      }
      if (!values.zipCode) {
        errors.zipCode = "Required";
      }
      return errors;
    },
  });

  return (
    <div className="checkout">
      {userId ? (
        <>
          <Toaster />
          <div className="checkout__header">
            <h2>Checkout</h2>
            <p>Fill out this form to confirm your order</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="checkout__form">
              <div className="checkout__left">
                <h3>Your Cart :</h3>
                <div>
                  {userCart.map((item, key) => {
                    return (
                      <p key={key}>
                        {item.quantity}x&nbsp;
                        {item.name}&nbsp;:&nbsp;
                        {item.quantity * item.price}&nbsp;DH
                      </p>
                    );
                  })}
                </div>
                <p>Total: {total} DH</p>
              </div>
              <div className="checkout__right">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <span className="error">{formik.errors.firstName}</span>
                ) : null}
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <span className="error">{formik.errors.lastName}</span>
                ) : null}
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="error">{formik.errors.email}</span>
                ) : null}
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Adresse"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  <span className="error">{formik.errors.address}</span>
                ) : null}
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city ? (
                  <span className="error">{formik.errors.city}</span>
                ) : null}
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="Zip / Postal Code"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.zipCode}
                />
                {formik.touched.zipCode && formik.errors.zipCode ? (
                  <span className="error">{formik.errors.zipCode}</span>
                ) : null}
                <CardElement
                  className="cardElement"
                  options={{ hidePostalCode: true }}
                />
              </div>
            </div>
            <div className="checkout__footer">
              <NavLink to="/cart">Back to cart</NavLink>
              <button type="submit">Confirm</button>
            </div>
          </form>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Checkout;
