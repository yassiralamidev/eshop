import React,{useState} from "react";
import "../style/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navbar, Footer, Newsletter, ItemCard } from "../components";
import { categoriesData } from "../data/homeData";
import { Toaster } from "react-hot-toast";
import {
  SupportAgentOutlinedIcon,
  LocalShippingOutlinedIcon,
  AttachMoneyOutlinedIcon,
  GppGoodOutlinedIcon,
} from "../components/icons";

function Home({ products }) {

  return (
    <>
      <Navbar />
      <Toaster/>
      <div className="home">
        <div className="home__title">
          <p>Welcome to our online store 👋</p>
        </div>
        <div className="home__slider">
          <Swiper className="mySwiper">
            {categoriesData &&
              categoriesData.slice(0, 3).map((slide, key) => {
                return (
                  <SwiperSlide
                    className="mySwipper__slide"
                    style={{ backgroundColor: slide.color }}
                    key={key}
                  >
                    <p>
                      Get the best <span>{slide.text}</span> just from your home
                      !
                    </p>
                    <img src={slide.img} alt="" />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="home__whyus">
          <div className="maid">
            <div className="maidIcon">
              <SupportAgentOutlinedIcon />
            </div>
            <p>Customer service</p>
          </div>
          <div className="maid">
            <div className="maidIcon">
              <LocalShippingOutlinedIcon />
            </div>
            <p>Free delivery</p>
          </div>
          <div className="maid">
            <div className="maidIcon">
              <GppGoodOutlinedIcon />
            </div>
            <p>Secure payment</p>
          </div>
          <div className="maid">
            <div className="maidIcon">
              <AttachMoneyOutlinedIcon />
            </div>
            <p>Best prices</p>
          </div>
        </div>
        <div className="home__categories">
          <h2>Our categories</h2>
          <div className="cards">
            {categoriesData &&
              categoriesData.map((cat, key) => {
                return (
                  <div
                    style={{ backgroundColor: cat.color }}
                    className="card"
                    key={key}
                  >
                    <p>{cat.text}</p>
                    <img src={cat.img} alt="" />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="home__newProducts">
          <h2>New products</h2>
          <div className="newProducts__list">
            {products.length > 0 &&
              products.slice(0, 8).map((pro, key) => {
                return (
                  <ItemCard
                    key={key}
                    id={pro.id}
                    name={pro.name}
                    price={pro.price}
                    image={pro.images[0].url}
                    color={pro.images[0].color}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
