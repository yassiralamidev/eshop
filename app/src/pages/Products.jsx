import React, { useState } from "react";
import "../style/products.css";
import { SearchIcon } from "../components/icons";
import { categoriesData } from "../data/homeData";
import { Navbar, Footer, Newsletter, ItemCard } from "../components";
import { Toaster } from 'react-hot-toast';

function Products({ products }) {
  const [select, setSelect] = useState("all");
  const [search, setInput] = useState("");

  const filteredProducts = products
    .filter((product) => {
      if (select === "all") {
        return true;
      } else {
        return product.category.toLowerCase() === select.toLowerCase();
      }
    })
    .filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <>
      <Navbar/>
      <Toaster/>
      {products && (
        <div className="products">
          <div className="products__title">
            <p>Browse through our inventory to find the newest products 🌟 !</p>
          </div>
          <div className="products__filters">
            <div className="filters__select">
              <select onChange={(e) => setSelect(e.target.value)}>
                <option value="all" defaultValue={"all"}>
                  All Categories
                </option>
                {categoriesData &&
                  categoriesData.map((cat, key) => {
                    return (
                      <option key={key} value={cat.text}>
                        {cat.text}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="filters__input">
              <span>
                <SearchIcon />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for something ..."
              />
            </div>
          </div>
          <div className="products__list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((pro, key) => {
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
            ) : (
              <h1 className="proNotFound">Product not found 😶</h1>
            )}
          </div>
        </div>
      )}
      <Newsletter/>
      <Footer/>
    </>
  );
}

export default Products;
