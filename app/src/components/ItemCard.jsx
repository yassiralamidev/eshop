import React from 'react'
import '../style/itemCard.css'
import { useNavigate } from 'react-router';
import AddToCart from './AddToCart' 

function ItemCard({id,image,name,price,color}) {
  const navigate = useNavigate();
  const truncate=(str,n)=>{
    return str?.length > n  ? str.substr(0,n-1) + "..." : str;
  }
  const getProduct=()=>{
    navigate(`/products/${id}`);
  }
  return (
    <div className='itemCard'>
      <img onClick={getProduct} src={image} alt="" />
      <p>{truncate(name,20)}</p>
      <div>
        <AddToCart
          price={price}
          color={color}
          image={image}
          name={name}
          id={id}
        />
        <span>{price} DH</span>
      </div>
    </div>
  )
}

export default ItemCard