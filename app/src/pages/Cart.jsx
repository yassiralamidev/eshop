import React, { useState, useEffect } from "react";
import "../style/cart.css";
import { Navbar} from "../components";
import Color from "color";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function Cart() {
  const [userCart, setUserCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(
    parseInt(localStorage.getItem("userId"))
  );

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

  const deleteFromCart = async (id, color) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/cart/delete",
        {id,color,userId}
      );
      if (response.data.ok) {
        toast.success(response.data.message);
        setUserCart((prevUserCart) =>
          prevUserCart.filter((item) => item.color !== color || item.id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeQuantity = async (id, color, newQuantity) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/user/cart/edit",
        {id,color,userId,newQuantity}
      );
      if (response.data.ok) {
        toast.success(response.data.message);
        setUserCart((prevUserCart) =>
          prevUserCart.map((item) =>
            item.id === id && item.color === color
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId && userCart.length > 0) {
      let total = 0;
      for (let i = 0; i < userCart.length; i++) {
        total += userCart[i].price * userCart[i].quantity;
      }
      setTotal(total);
    }
  }, [userCart,changeQuantity]);


  return (
    <>
      <Navbar />
      <div className="cart">
        {userCart && userCart.length > 0 ? (
          <>
            <div className="cart__header">
              <div className="header__left">
                <h2>Your Shopping Cart</h2>
                <p>You have {userCart.length} items in your cart.</p>
              </div>
            </div>
            <div className="cart__list">
              <div className="list__row">
                {userCart.map((pro, key) => {
                  return (
                    <div key={key} className="row">
                      <div className="row__left">
                        <div>
                          <img src={pro.image} alt="" />
                        </div>
                      </div>
                      <div className="row__right">
                        <div className="right__top">
                          <h4>
                            {pro.name}
                            &nbsp; (<span>{Color(pro.color).keyword()}</span>)
                          </h4>
                          <div>Price : {pro.price}&nbsp;DH</div>
                          <div>
                            Total price : {pro.price * pro.quantity}&nbsp;DH
                          </div>
                        </div>
                        <div className="right__bottom">
                          <div className="right__quantity">
                            <button
                              onClick={() =>
                                changeQuantity(
                                  pro.id,
                                  pro.color,
                                  pro.quantity > 1 ? pro.quantity - 1 : 1
                                )
                              }
                            >
                              &#8722;
                            </button>
                            <div>{pro.quantity}</div>
                            <button
                              onClick={() =>
                                changeQuantity(
                                  pro.id,
                                  pro.color,
                                  pro.quantity + 1
                                )
                              }
                            >
                              &#43;
                            </button>
                          </div>
                          <div className="right__delete">
                            <button
                              onClick={() => deleteFromCart(pro.id, pro.color)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cart__result">
              <p>Total :&nbsp;{total}&nbsp;DH</p>
              <NavLink to='/checkout'>
                Checkout
              </NavLink>
            </div>
          </>
        ) : (
          <div className="emptyCart">
            <div className="cart__header">
              <div className="header__left">
                <h2>Your Shopping Cart</h2>
                <p>You have {userCart.length} items in your cart.</p>
              </div>
            </div>
            <NavLink to={"/products"}>Go back to shopping</NavLink>
          </div>
        )}
        <Toaster />
      </div>
    </>
  );
}

export default Cart;
