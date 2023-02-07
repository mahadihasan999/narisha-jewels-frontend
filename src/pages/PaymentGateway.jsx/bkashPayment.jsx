import {
  CartDispatchContext,
  CartStateContext,
  clearCart,
} from "contexts/cart";
import { CheckoutStateContext } from "contexts/checkout";
import useAuth from "hooks/useAuth";
import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const BkashPayment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm();
  const { user } = useAuth();
  // const [cart] = useCart();
  const { items = [] } = useContext(CartStateContext);
  const { shippingAddress } = useContext(CheckoutStateContext);
  const history = useHistory();
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
  const userInfo = user.email;
  const subTotal = total;
  const shipping = total > 0 ? 60 : 0;
  const grandTotal = total + shipping;

  const handleClearCart = () => {
    return clearCart(dispatch);
  };
  console.log(shippingAddress);
  const onSubmit = (data) => {
    data.items = cartItems;
    data.user = userInfo;
    data.shippingAddress = shippingAddress;
    data.order_status = "pending";
    data.payment_status = "paid";
    data.paymentMethod = "bkash";
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
          history.push("/");
          handleClearCart();
          reset();
        }
      });
  };

  return (
    <div className="h-96">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                Send Money{" "}
                <span className="font-semibold border-4 ">
                  Tk .{grandTotal}
                </span>{" "}
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
              <div className="py-4 flex items-center">
                <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                  <input
                    defaultChecked
                    type="checkbox"
                    className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
                  />
                  <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
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
                  I have read and agree to the website term and conditions and
                  [payment refund]
                </p>
              </div>
            </div>

            <div>
              <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
      <style>
        {`  .checkbox:checked + .check-icon {
                            display: flex;
                        }`}
      </style>
    </div>
  );
};

export default BkashPayment;
