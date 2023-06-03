import React,{useState} from "react";
import '../style/product.css'
import { useParams } from "react-router-dom";
import { Navbar, Footer ,ItemCard,AddToCart} from "../components";
import { Toaster } from 'react-hot-toast';

function Product({ products }) {
  const [imageKey,setImageKey]= useState(0);
  let { id } = useParams();
  const allProducts = products;
  const selectedProduct = products.filter((product) => {
    return product.id === parseInt(id);
  });
  const recomProducts = allProducts.filter(pro=>{
    return pro.id !== parseInt(id) && pro.category === selectedProduct[0].category;
  })

  const changeImg =(key)=>{
    setImageKey(key)
  } 

  return (
    <>
    <Navbar/>
      {selectedProduct.length > 0 && (
        <>
          <Toaster/>
          <div className="product">
            <div className="product__info">
              <div className="info__left">
                <img src={selectedProduct[0].images[imageKey].url} alt="" />
              </div>
              <div className="info__right">
                <p className="info__name">{selectedProduct[0].name}</p>
                <p className="info__category">{selectedProduct[0].category}</p>
                <p className="info__price"><span>{selectedProduct[0].price}&nbsp;DH</span></p>
                <div className="info__colors">
                  {selectedProduct[0].images.map((obj,key)=>{
                    return(
                      <div key={key} className={`${imageKey === key  ? 'divColor colorBorder' : 'divColor'}`}>
                        <div 
                          onClick={()=>{changeImg(key)}}
                          className="info__color" 
                          style={{backgroundColor:obj.color}}></div>
                      </div>
                    )
                  })}
                </div>
                <div className="info__button">
                  <AddToCart
                    price={selectedProduct[0].price}
                    name={selectedProduct[0].name}
                    color={selectedProduct[0].images[imageKey].color}
                    image={selectedProduct[0].images[imageKey].url}
                    id={selectedProduct[0].id}
                  />
                </div>
              </div>
            </div>
            <div className="product__description">
              <p className="descriptionTitle">Description du produit : </p>
              <p>
                {selectedProduct[0].description}
              </p>
            </div>
            <div className="product__recom">
              <h2>Similar Products</h2>
              <div className="recomList">
                {
                recomProducts && 
                recomProducts.slice(0,4).map((pro, key) => {
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
                })
              }
              </div>
            </div>
          </div>
        </>
      )}
      <Footer/>
    </>
  );
}

export default Product;
