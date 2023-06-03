import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Home,
  Products,
  Contact,
  Login,
  Signup,
  Product,
  Cart,
  Checkout,
  Account
} from "./pages";
import { Routes, Route } from "react-router";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js'


function App() {
  const stripePromis = loadStripe('pk_test_51MduZLKg7kuxJ9Df921PpM21DZUjn9ZCMAHPtYmc6GXp7oSXGlcbOFyIvUyf3n70BgLITcEL4jZ4eWVzV5mlHorf0042YQUqZY')
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      axios.get("http://localhost:8080/products").then((res) => {
        setProducts(res.data);
      });
    };
    getProducts();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/products/:id" element={<Product products={products} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart products={products} />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromis}>
              <Checkout/>
            </Elements>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
