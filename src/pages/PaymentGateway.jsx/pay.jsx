// import React from "react";

// import {
//   CardCvcElement,
//   CardElement,
//   CardExpiryElement,
//   CardNumberElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import { useEffect } from "react";

// import {
//   CartDispatchContext,
//   CartStateContext,
//   clearCart,
// } from "contexts/cart";
// import { useContext } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "hooks/useAuth";
// import { CheckoutStateContext } from "contexts/checkout";
// import { useHistory } from "react-router-dom";
// import swal from "sweetalert";
// const CheckoutForm = ({ price }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [success, setSuccess] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [err, setErr] = useState();
//   const [clientSecret, setClientSecret] = useState("");

//   //order section {}
//   const { user } = useAuth();
//   const { items = [] } = useContext(CartStateContext);
//   const { shippingAddress } = useContext(CheckoutStateContext);
//   const history = useHistory();
//   const dispatch = useContext(CartDispatchContext);
// const handleClearCart = () => {
//   return clearCart(dispatch);
// };
//   useEffect(() => {
//     fetch("https://server-narisha.malihatabassum.com/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({ price }),
//     })
//       .then((res) => res.json())
//       .then((res) => setClientSecret(res.clientSecret));
//   }, [price]);

//   let totalQuantity = 0;
//   let total = 0;
//   for (const product of items) {
//     if (!product.quantity) {
//       product.quantity = 1;
//     }
//     total = total + product.price * product.quantity;
//     totalQuantity = totalQuantity + product.quantity;
//   }

//   const subTotal = total;
//   const shipping = total > 0 ? 60 : 0;
//   const grandTotal = total + shipping;

//   const handleClearCart = () => {
//     return clearCart(dispatch);
//   };
//   console.log(shippingAddress);

//   const onSubmit = () => {
//     // data.items = cartItems;
//     // data.user = userInfo;
//     // data.totalQuantity = totalQuantity;
//     // data.subTotal = subTotal;
//     // data.shipping = shipping;
//     // data.grandTotal = grandTotal;
//     // data.address = shippingAddress;
//     // data.status = "paid";
//     // data.paymentGateway = "stripe";
//     const data = {
//       items: items,
//       shippingAddress: shippingAddress,
//       user: user.email,
//       status: "paid",
//       paymentMethod: "stripe",
//     };
//     fetch("https://server-narisha.malihatabassum.com/orders", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         if (result.insertedId) {
//           swal("Wow!!!", "Order Processed Successfully", "success");
//           history.push("/");
//           handleClearCart();
//         }
//       });
//   };

//   const handleSubmitStripe = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     if (card === null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log(error);
//       setCardError(error.message);
//     } else {
//       setCardError("");
//     }
//     setSuccess("");
//     setProcessing(true);
//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             name: patient,
//             email: email,
//           },
//         },
//       });

//     if (confirmError) {
//       setCardError(confirmError.message);
//       return;
//     }
//     if (paymentIntent.status === "succeeded") {
//       console.log("card info", card);
//       // store payment info in the database
//       const payment = {
//         price,
//         transactionId: paymentIntent.id,
//         email,
//         bookingId: _id,
//       };
//       fetch("https://doctors-portal-server-rust.vercel.app/payments", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           authorization: `bearer ${localStorage.getItem("accessToken")}`,
//         },
//         body: JSON.stringify(payment),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           if (data.insertedId) {
//             setSuccess("Congrats! your payment completed");
//             setTransactionId(paymentIntent.id);
//           }
//         });
//     }
//     setProcessing(false);
//   };

//   return (
//     <div className="h-96">
//       <form onSubmit={handleSubmitStripe}>
//         <div>
//           <label htmlFor="card-number">Card Number</label>
//           <CardNumberElement />
//         </div>

//         <div>
//           <label htmlFor="card-expiry">Expiration Date</label>
//           <CardExpiryElement />
//         </div>

//         <div>
//           <label htmlFor="card-cvc">CVC</label>
//           <CardCvcElement />
//         </div>

//         <button type="submit" disabled={!stripe}>
//           Pay
//         </button>
//       </form>
//       {err && <p className="text-red-500">{err}</p>}
//       {success && <p className="text-green-500">{success}</p>}
//     </div>
//   );
// };

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// // const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

// // const App = () => {
// //   return (
// //     <Elements stripe={stripePromise}>
// //       <CheckoutForm />
// //     </Elements>
// //   );
// // };

// export default CheckoutForm;
