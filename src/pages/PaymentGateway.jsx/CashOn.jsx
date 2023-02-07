import {
  CartDispatchContext,
  CartStateContext,
  clearCart,
} from "contexts/cart";
import { CheckoutStateContext } from "contexts/checkout";
import useAuth from "hooks/useAuth";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const CashOn = () => {
  const { items = [] } = useContext(CartStateContext);
  const [gateway, setGateway] = useState("stripe");
  const { user } = useAuth();
  const { shippingAddress } = useContext(CheckoutStateContext);
  const dispatch = useContext(CartDispatchContext);
  const history = useHistory();
  let totalQuantity = 0;
  let total = 0;

  for (const product of items) {
    if (!product.quantity) {
      product.quantity = 1;
    }
    total = total + product.price * product.quantity;
    totalQuantity = totalQuantity + product.quantity;
  }
  const shipping = total > 0 ? 60 : 0;
  const grandTotal = total + shipping;

  const handleClearCart = () => {
    return clearCart(dispatch);
  };
  const onSubmit = () => {
    const data = {
      items: items,
      user: user.email,
      shippingAddress: shippingAddress,
      order_status: "pending",
      payment_status: "un-paid",
      paymentMethod: "cash-on",
    };
    fetch("https://server-narisha.malihatabassum.com/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          swal("Wow!!!", "Order Processed Successfully", "success");
          handleClearCart();
          history.push("/");
        }
      });
  };

  return (
    <div className="h-96">
      <div className="">
        <div className="h-44 mx-4 text-center py-10">
          <h1 className="text-2xl">Cash On delivery</h1>
          <h1 className="text-gray-700 font-normal">
            Your Payable Ammount is{" "}
            <span className="font-bold text-indigo-700">Tk. {grandTotal}</span>{" "}
          </h1>
        </div>

        <button
          onClick={onSubmit}
          type="submit"
          className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CashOn;
