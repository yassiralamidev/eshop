import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddToCart({ price,name,color,image,id }) {

  const addToCart=async()=>{
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login to add products to your cart");
    }else{
      try{
      const response = await axios.post("http://localhost:8080/user/cart/add",
        {userId,price,name,color,image,id}
      );
      if(response.data.ok){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }    
    }
    catch(error){
      console.error(error);
    }
    }
  }

  const style = {
    height: "35px",
    color: "#D7E2E9",
    backgroundColor: "#2D7BD8",
    padding: "0px 8px",
    borderRadius: "7px",
    border: 0,
    outline: 0,
    cursor: "pointer",
  };

  return (
    <>
      <button onClick={() => addToCart()} style={style}>
        Add To Cart
      </button>
    </>
  );
}

export default AddToCart;
