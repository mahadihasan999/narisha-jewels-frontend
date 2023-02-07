import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartStateContext } from "contexts/cart";
import React, { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import CheckoutForm from "./CheckOutForm";
import BkashPayment from "./PaymentGateway.jsx/bkashPayment";
import CashOn from "./PaymentGateway.jsx/CashOn";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51MUxo5FnZvWI4wW0vjJAkB19MpueExzCDYYKo6xYeBi94IAaFIxTJoSXLRQB8xtJdDFUG9qBby6h4puqamRm4CSU00av889fgp"
  );
  const { items = [] } = useContext(CartStateContext);
  const [gateway, setGateway] = useState("stripe");
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

  return (
    <div className="py-10 mx-auto">
      <div>
        <div class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 lg:py-40 md:py-40">
          <div class="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 w-[600px]">
            <div class="w-full pt-1 pb-5">
              <div class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                <i class="mdi mdi-credit-card-outline text-3xl"></i>
              </div>
            </div>
            <div class="mb-10">
              <h1 class="text-center font-bold text-xl uppercase">
                Secure payment info
              </h1>
            </div>
            <div class="mb-3 flex lg:flex-row md:flex-row flex-col gap-2 -mx-2 ">
              <div class="px-2">
                <label
                  for="type1"
                  class="flex items-center cursor-pointer"
                  onClick={() => setGateway("stripe")}
                >
                  <input
                    type="radio"
                    class="form-radio h-5 w-5 text-indigo-500"
                    name="type"
                    id="type1"
                    checked
                  />
                  <img
                    src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                    class="h-8 ml-3"
                  />
                </label>
              </div>
              <div class="px-2">
                <label
                  for="type2"
                  class="flex items-center cursor-pointer"
                  onClick={() => setGateway("bkash")}
                >
                  <input
                    type="radio"
                    class="form-radio h-5 w-5 text-indigo-500"
                    name="type"
                    id="type2"
                  />
                  <img
                    src="https://travelplanbd.com/wp-content/uploads/2019/02/bkash-train-ticket--796x445.jpg"
                    class="h-8 ml-3 rounded border border-pink-50"
                  />
                </label>
              </div>
              <div class="px-2">
                <label
                  for="type3"
                  class="flex items-center cursor-pointer"
                  onClick={() => setGateway("cash-on")}
                >
                  <input
                    type="radio"
                    class="form-radio h-5 w-5 text-indigo-500"
                    name="type"
                    id="type3"
                  />
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/952/799/small/cash-on-delivery-steacker-free-vector.jpg"
                    class="h-8 ml-3 rounded border border-pink-50"
                  />
                </label>
              </div>
            </div>

            <div className="py-4">
              {gateway === "stripe" && (
                <div>
                  {grandTotal && (
                    <Elements stripe={stripePromise}>
                      <CheckoutForm price={grandTotal} />
                    </Elements>
                  )}
                </div>
              )}
              {gateway === "bkash" && (
                <div>
                  <BkashPayment />
                </div>
              )}
              {gateway === "cash-on" && (
                <div>
                  <CashOn />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
