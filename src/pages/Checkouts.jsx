import {
  CartDispatchContext,
  CartStateContext,
  clearCart,
} from "../contexts/cart";

import React from "react";
import { useForm } from "react-hook-form";
// import { clearTheCart, getStoredCart } from "../../utilities/fakedb";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import useAuth from "hooks/useAuth";
import SignIn from "./SignIn";
import { useContext } from "react";
import ModalImage from "react-modal-image";
const Checkouts = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm();
  const { user } = useAuth();
  // const [cart] = useCart();
  const { items = [] } = useContext(CartStateContext);

  const history = useHistory();
  const [openTab, setOpenTab] = React.useState(1);
  const dispatch = useContext(CartDispatchContext);
  let totalQuantity = 0;
  let total = 0;

  for (const product of items) {
    if (!product.quantity) {
      product.quantity = 1;
    }
    total = total + product.price * product.quantity;
    totalQuantity = totalQuantity + product.quantity;
  }

  const cartItems = items;
  const userInfo = user;
  const subTotal = total;
  const shipping = total > 0 ? 60 : 0;
  const grandTotal = total + shipping;
  const handleClearCart = () => {
    return clearCart(dispatch);
  };
  const onSubmit = (data) => {
    data.items = cartItems;
    data.user = userInfo;
    data.totalQuantity = totalQuantity;
    data.subTotal = subTotal;
    data.shipping = shipping;
    data.grandTotal = grandTotal;

    fetch("https://nameless-refuge-09989.herokuapp.com/orders", {
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
          history.push("/");
          handleClearCart();
          reset();
        }
      });
  };

  return (
    <div>
      <div className="overflow-y-hidden mt-20">
        <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
          <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-around items-center lg:space-x-6 2xl:space-x-24 space-y-12 lg:space-y-0">
            <div className="flex w-full  flex-col justify-start items-start">
              {user.displayName ? (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                        defaultValue={user.displayName}
                        {...register("name")}
                      />

                      <input
                        className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 w-full"
                        type="email"
                        placeholder="Email"
                        defaultValue={user.email}
                        {...register("email", { required: true })}
                      />

                      <input
                        className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 w-full"
                        type="text"
                        placeholder="Address"
                        defaultValue=""
                        {...register("address")}
                      />

                      <input
                        className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 w-full"
                        type="text"
                        placeholder="City"
                        defaultValue=""
                        {...register("city")}
                      />

                      <input
                        className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3   w-full"
                        type="text"
                        placeholder="Phone Number"
                        defaultValue=""
                        {...register("phone")}
                      />
                    </div>

                    {/* 
                               

                                        {/* cash on delivery & payment section */}

                    <div class="flex justify-center pt-2">
                      <div className="mx-auto py-5 flex justify-center">
                        {/* Code block starts */}
                        <div className="flex items-center ">
                          <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              type="radio"
                              onClick={() => setOpenTab(!openTab)}
                              name="radio"
                              className="checkbox a appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                              value="Cash On"
                              {...register("payment")}
                            />
                            <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" />
                          </div>
                          <p className="ml-2 text-sm leading-4 font-normal text-gray-800 text-gray-600">
                            Cash On Delivery
                          </p>
                        </div>
                        {/* Code block ends */}
                        <style>
                          {`  .checkbox:checked + .check-icon {
                            display: flex;
                        }`}
                        </style>
                        <style>
                          {`  .checkbox:checked {
                        border: none;
                    }
                    .checkbox:checked + .check-icon {
                        display: flex;
                    }`}
                        </style>
                        {/* Code block starts */}
                        <div className="flex items-center ml-6">
                          <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              onClick={(e) => {
                                setOpenTab(2);
                              }}
                              type="radio"
                              name="radio"
                              className="checkbox b appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                              value="Paid"
                              {...register("payment")}
                            />
                            <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" />
                          </div>
                          <div className="flex flex-row items-center justify-center">
                            <button className="ml-2 text-sm leading-4 font-normal text-gray-800 text-gray-600 pr-2">
                              Pay by
                            </button>
                            <img
                              src="https://www.poshakferi.com/wp-content/uploads/2021/12/bkash-logo.png"
                              alt=""
                              className="h-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {openTab === 2 ? (
                      <div>
                        <div>
                          <div className="">
                            <div className="flex justify-center items-center bg-pink-600">
                              <div className="flex flex-row justiy-around items-center">
                                <div class="grid grid-cols-11 gap-1 text-gray-100 py-3 px-2 ">
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    0
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    1
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    7
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    3
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    1
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    5
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    1
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    2
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    1
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    0
                                  </div>
                                  <div className="flex justify-center items-center p-1 text-xl leading-4 bg-white text-gray-800">
                                    1
                                  </div>
                                </div>
                                <h1 className="p-1 text-xl leading-4 text-gray-200">
                                  [Personal]
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center items-center py-3">
                            <p className=" text-xl  leading-4 text-gray-800">
                              Send Money a total of{" "}
                              <span className="font-semibold border-4 ">
                                {grandTotal}
                              </span>{" "}
                              BDT
                            </p>
                          </div>
                          <div className="py-2">
                            <input
                              className="px-2 focus:outline-none focus:ring-2 focus:ring-red-600 border-b border-red-500 leading-4 text-base placeholder-gray-600  py-3 w-full"
                              type="text"
                              required
                              placeholder="Transaction ID"
                              defaultValue=""
                              {...register("trxID")}
                            />
                          </div>
                          <input
                            className="focus:outline-none focus:ring-2 focus:ring-red-600 border-b border-red-500 px-2 leading-4 text-base placeholder-gray-600 py-3   w-full"
                            required
                            type="text"
                            placeholder="Bkash Number"
                            defaultValue=""
                            {...register("bkashNumber")}
                          />
                        </div>
                        <div>
                          <div className="py-2 flex items-center">
                            <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                              <input
                                required
                                type="checkbox"
                                className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
                              />
                              <div className="check-icon hidden bg-primary text-white rounded-sm">
                                <svg
                                  className="icon icon-tabler icon-tabler-check"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                              </div>
                            </div>
                            <p className="ml-3 text-base leading-2 font-normal text-gray-600 text-gray-600">
                              I have read and agree to the website term and
                              conditions and [payment refund]
                            </p>
                          </div>

                          <div>
                            <button
                              type="submit"
                              className="focus:outline-none px-6 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-indigo-700 py-3 w-full md:w-4/12 lg:w-full text-white bg-indigo-500"
                            >
                              Place Order
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="py-2 flex items-center">
                          <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              required
                              type="checkbox"
                              className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
                            />
                            <div className="check-icon hidden bg-primary text-white rounded-sm">
                              <svg
                                className="icon icon-tabler icon-tabler-check"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M5 12l5 5l10 -10" />
                              </svg>
                            </div>
                          </div>
                          <p className="ml-3 text-base leading-2 font-normal text-gray-600 text-gray-600">
                            I have read and agree to the website term and
                            conditions and [payment refund]
                          </p>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="focus:outline-none px-6 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-indigo-700 py-3 w-full md:w-4/12 lg:w-full text-white bg-indigo-500"
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </>
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
                    defaultValue={totalQuantity}
                    {...register("totalQuantity")}
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
