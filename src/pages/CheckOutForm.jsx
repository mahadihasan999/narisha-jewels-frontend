import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  CartDispatchContext,
  CartStateContext,
  clearCart,
} from "contexts/cart";
import { CheckoutStateContext } from "contexts/checkout";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const { items = [] } = useContext(CartStateContext);
  const { shippingAddress } = useContext(CheckoutStateContext);
  const history = useHistory();
  const dispatch = useContext(CartDispatchContext);
  const handleClearCart = () => {
    return clearCart(dispatch);
  };
  useEffect(() => {
    fetch("https://server-narisha.malihatabassum.com/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((res) => setClientSecret(res.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setSuccess("");
    } else {
      setError("");
      console.log(paymentMethod);
    }

    // payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            // name: patientName,
            // email: user.email,
          },
        },
      });

    if (intentError) {
      setError(intentError.message);
      setSuccess("");
    } else {
      setError("");
      console.log(paymentIntent);
      setProcessing(false);
      // save to database
      const data = {
        items: items,
        shippingAddress: shippingAddress,
        user: user.email,
        order_status: "pending",
        payment_status: "paid",
        paymentMethod: "stripe",
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
            history.push("/");
            handleClearCart();
          }
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-20 py-10">
        <CardElement
          className="py-10"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {processing ? (
          "Loading..."
        ) : (
          <button
            type="submit"
            disabled={!stripe || success}
            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
          >
            Pay ${price}
          </button>
        )}
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CheckoutForm;
