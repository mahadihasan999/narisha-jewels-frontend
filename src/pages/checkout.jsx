import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress,
} from "../contexts/checkout";

import { CartStateContext } from "../contexts/cart";
import {
  AuthStateContext,
  AuthDispatchContext,
  signOut,
} from "../contexts/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Input from "../components/core/form-controls/Input";
import useLocalStorage from "../hooks/useLocalStorage";

const LoginStep = () => {
  const history = useHistory();
  const { user, isLoggedIn } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const handleContinueShopping = () => {
    history.push("/");
  };
  const handleLoginAsDiffUser = () => {
    signOut(authDispatch);
    history.push("/auth");
  };
  const handleGotoLogin = () => {
    history.push("/auth");
  };
  const handleProceed = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  return (
    <div className="detail-container">
      <h2>Sign In now!</h2>
      <div className="auth-message">
        {isLoggedIn ? (
          <>
            <p>
              Logged in as <span>{user.username}</span>
            </p>
            <button onClick={() => handleLoginAsDiffUser()}>
              Login as Different User
            </button>
          </>
        ) : (
          <>
            <p>Please login to continue.</p>
            <button onClick={() => handleGotoLogin()}>Login</button>
          </>
        )}
      </div>
      <div className="actions">
        <button className="outline" onClick={() => handleContinueShopping()}>
          <i className="rsc-icon-arrow_back" /> Continue Shopping
        </button>
        <button
          disabled={!isLoggedIn}
          className="bg-indigo-700 px-6 py-2"
          onClick={() => handleProceed()}
        >
          Proceed
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );
};

const clearTheCart = () => {
  useLocalStorage.removeItem("cartItems");
};

const AddressStep = (d) => {
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleSaveAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
  };
  const { isLoggedIn, user } = useContext(AuthStateContext);
  const notify = () => toast("Here is your toast.");
  // const handleBackToLogin = () => {
  //   setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.AUTH);
  // };

  return (
    <div className="detail-container">
      <h2>Shipping Address</h2>
      <Toaster position="top-center" reverseOrder={false} />
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          addressLine: "",
          city: "",
          state: "",
          code: "",
          country: "",
          // paymentStatus: "",
          // trxId: "",
          // bkashNumber: " ",
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            const addressData = { ...values };
            resetForm();
            handleSaveAddress(addressData);
            toast.success("Your Address Successfully Saved!");
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {() => (
          <Form>
            <button onClick={notify}>man</button>{" "}
            <div className="field-group">
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                component={Input}
                required
              />
              <Field
                name="phoneNumber"
                type="number"
                placeholder="Phone Number"
                component={Input}
                required
              />
            </div>
            <Field
              name="addressLine"
              type="text"
              placeholder="Door No. & Street"
              component={Input}
              required
            />
            <div className="field-group">
              <Field
                name="city"
                type="text"
                placeholder="City"
                component={Input}
                required
              />
              <Field
                name="state"
                type="text"
                placeholder="State"
                component={Input}
                required
              />
            </div>
            <div className="field-group">
              <Field
                name="code"
                type="text"
                placeholder="ZIP/Postal Code"
                component={Input}
                required
              />
              <Field
                name="country"
                type="text"
                placeholder="Country"
                component={Input}
                required
              />
            </div>
            {/* cash on delivery & payment section */}
            <div className="actions">
              {/* <button
                type="button"
                className="outline"
                onClick={() => handleBackToLogin()}
              >
                <i className="rsc-icon-arrow_back" /> Login in as Different User
              </button> */}
              <button type="submit">
                Save Address
                <i className="rsc-icon-arrow_forward" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

//Paymanet Step
// *************************************

const PaymentStep = () => {
  const { shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const handleBackToAddress = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  const handlePlaceOrder = (paymentData) => {
    saveShippingAddress(checkoutDispatch, paymentData);
  };
  const [openTab, setOpenTab] = React.useState(1);
  const handlePayment = () => {};

  return (
    <div className="detail-container">
      <h2>Shipping Address</h2>
    </div>
  );
};

//checkout
const Checkout = () => {
  const { items = [] } = useContext(CartStateContext);
  const { isLoggedIn, user } = useContext(AuthStateContext);
  const { step, shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const totalItems = items.length;

  let totalQuantity = 0;
  let total = 0;
  let shipping = 60;
  //summary calclution

  for (const product of items) {
    if (!product.quantity) {
      product.quantity = 1;
    }
    total = total + product.price * product.quantity;
    totalQuantity = totalQuantity + product.quantity;
  }
  const subtotal = total;
  const grandTotal = total + shipping;
  console.log(grandTotal);

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="order-details">
          <ul className="timeline">
            <li
              className={classNames({
                done: isLoggedIn,
                active: step === CHECKOUT_STEPS.AUTH,
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.AUTH)}
            >
              <h2>Sign In</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            <li
              className={classNames({
                done: shippingAddress !== null,
                active: step === CHECKOUT_STEPS.SHIPPING,
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.SHIPPING)}
            >
              <h2>Shipping</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            <li
              className={classNames({
                done: false,
                active: step === CHECKOUT_STEPS.PAYMENT,
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.PAYMENT)}
            >
              <h2>Payment</h2>
              <i className="rsc-icon-check_circle" />
            </li>
          </ul>
          {step === CHECKOUT_STEPS.AUTH && <LoginStep />}
          {step === CHECKOUT_STEPS.SHIPPING && <AddressStep />}
          {step === CHECKOUT_STEPS.PAYMENT && <PaymentStep />}
        </div>
        <div className="order-summary">
          <h2>
            Summary
            <span>{` (${totalItems}) Items`}</span>
          </h2>
          <ul className="cart-items">
            {items.map((product) => {
              return (
                <li className="cart-item" key={product.name}>
                  <img
                    className="product-image"
                    alt="product-images"
                    src={product.image}
                  />
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{product.price}</p>
                  </div>
                  <div className="product-total">
                    <p className="quantity">
                      {`${product.quantity} ${
                        product.quantity > 1 ? "Nos." : "No."
                      }`}
                    </p>
                    <p className="amount">{product.quantity * product.price}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="total-breakup">
            <li>
              <p>Subtotal</p>
              <p className="font-bold">{subtotal}</p>
            </li>
            <li>
              <p>Shipping</p>
              <p className="font-bold">{shipping}</p>
            </li>
            <hr />
            <li>
              <h2>Total</h2>
              <h2 className="font-bold">{grandTotal}</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
