import React, { useState } from "react";

const Product = ({ _product,openCart, setCart, carts }: any) => {
  // let [quantity, setQuantity] = useState(1);





  const addToCart = (product) => {
    const existingItem = carts.find((item) => item.product.id === product.id);
    console.log(existingItem);
    if (existingItem) {
      setCart(
        carts.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...carts, { product, quantity: 1 }]);
    }
  };

  return (
    <li className="product">
      <img src={_product.files[0].path} className="product-image" alt="" />
      <div className="product-details">
        <h2>{_product.name}</h2>
        <h3>NGN {_product.price / 100}</h3>
        <div>
          <button className="add-to-cart" onClick={() => {
            addToCart(_product)
            openCart(true)
          }}> <span className="fa fa-shopping-bag"></span>
          <span style={{margin:"0 6px"}}>Add to Bag</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default Product;
