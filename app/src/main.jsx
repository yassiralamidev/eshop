import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "swiper/css/bundle";

ReactDOM.createRoot(document.getElementById("root")).render(  
  <BrowserRouter>
    <App />
  </BrowserRouter>

);
