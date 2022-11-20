import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CartStateContext,
  CartDispatchContext,
  removeFromCart,
  toggleCartPopup,
} from "../contexts/cart";

const CartPreview = () => {
  const { items, isCartOpen } = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  const history = useHistory();
  const cartDispatch = useContext(CartDispatchContext);

  const handleRemove = (productId) => {
    return removeFromCart(dispatch, productId);
  };

  const handleProceedCheckout = () => {
    history.push("/checkouts");
    toggleCartPopup(dispatch);
  };
  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(cartDispatch);
  };
  return (
    <div className={classNames("cart-preview", { active: isCartOpen })}>
      <ul className="cart-items">
        {items.map((product) => {
          return (
            <li className="cart-item" key={product.name}>
              <img
                className="product-image"
                alt="products-images"
                src={product.image}
              />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="">{product.price} Tk</p>
              </div>
              <div className="product-total">
                <p className="quantity">
                  {`${product.quantity} ${
                    product.quantity > 1 ? "Nos." : "No."
                  }`}
                </p>
                <p className="">{product.quantity * product.price} Tk</p>
              </div>
              <button
                className="product-remove"
                onClick={() => handleRemove(product._id)}
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
      <div
        onClick={handleCartButton}
        className="
          flex items-center justify-center"
      >
        <button
          type="button"
          className={
            classNames({ disabled: items && items.length === 0 }) +
            `bg-indigo-600 text-gray-100  py-2 rounded px-4 transform transition duration-700 hover:scale-105`
          }
          onClick={handleProceedCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPreview;
