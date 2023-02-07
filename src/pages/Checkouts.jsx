import {
  CartDispatchContext,
  CartStateContext,
  clearCart,
} from "../contexts/cart";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { clearTheCart, getStoredCart } from "../../utilities/fakedb";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import useAuth from "hooks/useAuth";
import SignIn from "./SignIn";
import { useContext } from "react";
import ModalImage from "react-modal-image";
import Button from "assets/Form/Button";

import { useState } from "react";
import {
  CheckoutDispatchContext,
  saveShippingAddress,
} from "contexts/checkout";
const Checkouts = () => {
  const [name, setName] = useState("");
  const [customerEmail, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useAuth();
  // const [cart] = useCart();
  const { items = [] } = useContext(CartStateContext);

  let history = useHistory();

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

  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const addressData = { name, customerEmail, city, number, address };
    saveShippingAddress(checkoutDispatch, addressData);
    history.push("/payment-gateway");
  };

  return (
    <div>
      <div className="overflow-y-hidden mt-20">
        <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
          <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-around items-center lg:space-x-6 2xl:space-x-24 space-y-12 lg:space-y-0">
            <div className="">
              {user.displayName ? (
                <form onSubmit={onSubmit} className="w-96">
                  <div className>
                    <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                      Check out
                    </p>
                  </div>

                  <div className="mt-12">
                    <p className="text-xl font-semibold leading-5 text-gray-800">
                      Shipping Details
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                    <input
                      className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 w-full"
                      type="text"
                      placeholder="Full Name"
                      defaultValue=""
                      required
                      onChange={(e) => setName(e.target.value)}
                    />

                    <input
                      className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 w-full"
                      type="email"
                      placeholder="Email"
                      defaultValue=""
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 w-full"
                      type="text"
                      placeholder="Address"
                      defaultValue=""
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />

                    <input
                      className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 w-full"
                      type="text"
                      placeholder="City"
                      required
                      defaultValue=""
                      onChange={(e) => setCity(e.target.value)}
                    />

                    <input
                      className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3   w-full"
                      type="text"
                      placeholder="Phone Number"
                      defaultValue=""
                      required
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <Button type="submit" text="Save & Continue"></Button>
                </form>
              ) : (
                <>
                  <SignIn />
                </>
              )}
            </div>

            <div className="flex flex-col justify-start items-start bg-gray-200 w-full p-6 md:p-14">
              <div>
                <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                  Order Summary
                </h1>
              </div>

              <div className="flex mt-7 flex-col items-end w-full space-y-6">
                {items.map((product) => (
                  <div className="flex justify-between w-full items-center">
                    <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200 justify-between">
                      {/* <img
                        src={product.image}
                        alt={product.image}
                        className="h-full w-full object-cover object-center"
                      /> */}
                      <ModalImage
                        className=""
                        small={product.image}
                        large={product.image}
                        alt={product.title}
                      />
                    </div>
                    <p className="text-lg font-semibold leading-4 text-gray-800 pl-3">
                      {product.title}{" "}
                      <span className="text-sm text-gray-600">
                        {" "}
                        ৳{product.price}
                      </span>{" "}
                    </p>
                    <p className="text-lg font-semibold leading-4 text-gray-100 bg-indigo-400 p-2">
                      {product.quantity}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">Total items</p>
                  <p
                    className="text-lg font-semibold leading-4 text-gray-600"
                    // defaultValue={totalQuantity}
                    // {...register("totalQuantity")}
                  >
                    {totalQuantity}
                  </p>
                </div>

                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">
                    Total Charges
                  </p>
                  <p className="text-lg font-semibold leading-4 text-green-600">
                    ৳ {total}
                  </p>
                </div>

                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">
                    Shipping charges
                  </p>
                  <p className="text-lg font-semibold leading-4 text-green-600">
                    {" "}
                    <span className=" text-sm leading-2 text-gray-400">
                      Reguler Delivery Charge
                    </span>{" "}
                    ৳ {shipping}
                  </p>
                </div>

                <div className="flex justify-between w-full items-center mt-32">
                  <p className="text-xl font-semibold leading-4 text-gray-800">
                    Estimated Total{" "}
                  </p>
                  <p className="text-lg font-semibold leading-4 text-green-800">
                    ৳ {grandTotal}
                  </p>
                  {/* <input className="" type="hidden" defaultValue={grandTotal} {...register("estimatedTotal")} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkouts;
