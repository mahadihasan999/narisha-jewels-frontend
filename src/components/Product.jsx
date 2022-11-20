import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "../contexts/cart";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import ModalImage from "react-modal-image";
const ProductCard = (data) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const { image, title, price, id, stock, category } = data;

  const handleAddToCart = () => {
    const product = { ...data, quantity: 1 };
    addToCart(dispatch, product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3500);
  };

  return (
    <section className="flex justify-center items-center">
      <div className="w-80 rounded shadow my-3 ">
        <div className="h-48 w-full  flex flex-col justify-between p-4  bg-center shadow">
          <ModalImage small={image} large={image} alt={title} />
          <div className="flex justify-end mt-[-28px] mx-2">
            <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
              available
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col items-center ">
          <h1 className="text-gray-800 text-center mt-1 sm:text-xs] w-full">
            {title}
          </h1>
          <p className="text-center text-gray-800 mt-1">Tk {price}</p>

          <button
            onClick={handleAddToCart}
            className={
              !isAdded
                ? "py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                : "py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
            }
          >
            {!isAdded ? "Add to cart" : "✔ Added"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;

/* <div className="product">
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
      <h4 className="product-title mx-2">{title}</h4>
      <p className="font-bold text-center text-2xl">Tk. {price}</p>
      <div className="product-action">
        <button
          className={!isAdded ? "" : "added"}
          type="button"
          onClick={handleAddToCart}
        >
          {!isAdded ? "ADD TO CART" : "✔ ADDED"}
        </button>
      </div>
    </div> */
