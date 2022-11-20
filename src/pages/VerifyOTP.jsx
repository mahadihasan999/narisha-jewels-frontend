// import React, { useContext } from "react";
// import { Formik, Form, Field } from "formik";
// import { useHistory, useLocation } from "react-router-dom";
// import * as Yup from "yup";
// import _get from "lodash.get";
// import { AuthDispatchContext, signIn } from "../contexts/auth";
// import Input from "../components/core/form-controls/Input";
// import { useState } from "react";

// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { authentication } from "../firebase/firebase-config";
// import toast, { Toaster } from "react-hot-toast";

// const AuthPage = () => {
//   const countryCode = +88;
//   //phoneNumber State
//   const [phoneNumber, setPhoneNumber] = useState(countryCode);
//   const [expandForm, setExpandForm] = useState(false);
//   const [OTP, setOTP] = useState();
//   const history = useHistory();
//   const [sidebar, setsidebar] = useState();
//   const generateRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "sign-in-button",
//       {
//         size: "invisible",
//         callback: (response) => {},
//       },
//       authentication
//     );
//   };
//   //function
//   const requestOTP = (e) => {
//     e.preventDefault();

//     if (phoneNumber.length >= 11) {
//       setExpandForm(true);
//       generateRecaptcha();
//       let appVerifier = window.recaptchaVerifier;
//       signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//           window.confirmationResult = confirmationResult;
//           alert("Verification code Send");
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   const verifyOTP = (e) => {
//     let otp = e.target.value;
//     console.log(otp);
//     setOTP(otp);
//     if (otp.length === 6) {
//       //verify otp
//       let confirmationResult = window.confirmationResult;
//       confirmationResult
//         .confirm(otp)
//         .then((result) => {
//           alert("User signed in successfully.");
//           const user = result.user;
//           console.log(user);
//           history.push("/");
//           // ...
//         })
//         .catch((error) => {
//           console.log("Inviled OTP)");
//         });
//     }
//   };
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 w">
//         <form onSubmit={requestOTP} className="bg-white shadow p-6 rounded">
//           <p
//             tabIndex={0}
//             role="heading"
//             aria-label="Login to your account"
//             className="text-2xl font-extrabold leading-6 text-gray-800"
//           >
//             Create an account
//           </p>
//           <p className="text-sm mt-4 font-medium leading-none text-gray-500">
//             Dont have account?{" "}
//             <span
//               tabIndex={0}
//               role="link"
//               aria-label="Sign up here"
//               className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
//             >
//               {" "}
//               Login here
//             </span>
//           </p>

//           <div className="my-5">
//             <h1>Full Name*</h1>
//             <input
//               type="tel"
//               id="phoneNumberInput"
//               // onChange={(e) => setPhoneNumber(e.target.value)}
//               placeholder="Enter your first and last name"
//               className="border-2 w-full py-1.5 px-2"
//             />
//           </div>

//           <div className="my-5">
//             <h1>Phone Number*</h1>
//             <input
//               type="tel"
//               id="phoneNumberInput"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               placeholder="Enter your Phone Number"
//               className="border-2 w-full py-1.5 px-2"
//             />
//           </div>

//           <div className="my-5">
//             <h1>Enter Your Password*</h1>
//             <input
//               type="tel"
//               id="phoneNumberInput"
//               // onChange={(e) => setPhoneNumber(e.target.value)}
//               placeholder="Minimum 6 characters complex password"
//               className="border-2 w-full py-1.5 px-2"
//             />
//           </div>

//           <div id="sign-in-button"></div>

//           {expandForm === true ? (
//             <>
//               <div className="my-3">
//                 <h1>OTP</h1>
//                 <input
//                   type="number"
//                   id="otpInput"
//                   placeholder="Please Enter your OTP"
//                   className="border-2 w-full py-1.5 px-2"
//                   value={OTP}
//                   onChange={verifyOTP}
//                 />
//               </div>
//               <button className="bg-indigo-500 px-8 py-2 w-full text-white">
//                 Verify & Create Account
//               </button>
//             </>
//           ) : null}

//           {expandForm === false ? (
//             <button
//               type="submit"
//               className="bg-indigo-500 px-8 py-2 w-full text-white"
//             >
//               {" "}
//               Request OTP
//             </button>
//           ) : null}
//         </form>
//       </div>
//     </div>
//     // <Formik
//     //   initialValues={{
//     //     username: "",
//     //     password: "",
//     //   }}
//     //   validationSchema={LoginSchema}
//     //   onSubmit={async (values, { resetForm }) => {
//     //     try {
//     //       const userData = { ...values };
//     //       resetForm();
//     //       signInSuccess(userData);
//     //     } catch (err) {
//     //       console.error(err);
//     //     }
//     //   }}
//     // >
//     //   {() => (
//     //     <Form>
//     //       <Field
//     //         name="username"
//     //         type="text"
//     //         placeholder="Mobile Number or Email Address"
//     //         component={Input}
//     //       />
//     //       <Field
//     //         name="password"
//     //         type="password"
//     //         placeholder="Password"
//     //         component={Input}
//     //       />

//     //       <p>
//     //         <a href="/#" onClick={goToForgotPassword}>
//     //           Forgot Password?
//     //         </a>
//     //       </p>
//     //       <button
//     //         className="bg-indigo-500 px-4 my-2 rounded text-white"
//     //         onClick={() => {}}
//     //       >
//     //         Login
//     //       </button>

//     //       <p>
//     //         New here?{" "}
//     //         <a href="/#" onClick={goToRegister}>
//     //           Sign Up Now!
//     //         </a>
//     //       </p>
//     //     </Form>
//     //   )}
//     // </Formik>
//   );
// };

// export default AuthPage;
