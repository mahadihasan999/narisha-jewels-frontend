import React, { useContext } from "react";
import classNames from "classnames";
import { NavLink, useHistory } from "react-router-dom";
import {
  CartStateContext,
  CartDispatchContext,
  toggleCartPopup,
} from "../contexts/cart";
import { CommonDispatchContext, setSearchKeyword } from "../contexts/common";
import CartPreview from "../components/CartPreview";

import { BsCart2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import useAuth from "hooks/useAuth";
import { useState } from "react";
const Header = (props) => {
  const { items: cartItems, isCartOpen } = useContext(CartStateContext);
  const commonDispatch = useContext(CommonDispatchContext);
  const cartDispatch = useContext(CartDispatchContext);
  const { user, signOutUser } = useAuth();
  const [show, setshow] = useState(false);
  const { admin } = useAuth();
  const cartQuantity = cartItems.length;
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);

  const handleSearchInput = (event) => {
    return setSearchKeyword(commonDispatch, event.target.value);
  };

  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(cartDispatch);
  };

  const [changeHeader, setChangeHeader] = useState(false);

  //header change function
  const onChangeHeader = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };

  //change header by scrolling
  window.addEventListener("scroll", onChangeHeader);

  const fullName = user?.displayName;
  const splitOnSpace = fullName?.split(" ");
  const first = splitOnSpace?.[0];
  return (
    <header
      className={
        changeHeader
          ? "bg-indigo-500 fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-indigo-100 fixed z-50 top-0 left-0 w-full transition duration-500"
      }
    >
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-6 py-3 flex ">
        {/* left  */}
        <div className="flex ">
          <NavLink to="/">
            <span
              className={
                changeHeader
                  ? "text-3xl lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-100 duration-700 hover:scale-105"
                  : "text-3xl lg:text-3xl font-semibold leading-7 lg:leading-9   text-indigo-700  duration-700 hover:scale-105"
              }
            >
              Narisha Jewels
            </span>
          </NavLink>
        </div>
        {/* middle */}
        <div class="pt-2 relative mx-auto text-gray-600 hidden lg:block md:block">
          <input
            onChange={handleSearchInput}
            class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
        </div>
        {/* right  */}
        <div className="flex justify-center items-center gap-4">
          <div
            className="relative flex cursor-pointer cart"
            onClick={handleCartButton}
          >
            {cartQuantity ? (
              <span
                className={
                  changeHeader
                    ? "bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-gray-600 poppins absolute -right-2 -top-2 animate-bounce"
                    : "bg-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2 animate-bounce"
                }
              >
                {cartQuantity}
              </span>
            ) : (
              ""
            )}
            <BsCart2
              className={
                changeHeader
                  ? "cursor-pointer w-6 h-6 text-gray-200"
                  : "cursor-pointer w-6 h-6 text-gray-700"
              }
            />
            <CartPreview />
          </div>

          {/* Mobile Dropdown */}

          <div className="flex items-center  space-x-2  block md:hidden lg:hidden ">
            <div className="dropdown ">
              <button>
                <ol className="space-y-[-15px] ">
                  <li
                    className={
                      changeHeader
                        ? "bg-gray-100  p-[3px] rounded-full "
                        : "bg-indigo-500  p-[3px] rounded-full "
                    }
                  ></li>
                  <li
                    className={
                      changeHeader
                        ? "bg-gray-100  p-[3px] rounded-full "
                        : "bg-indigo-500  p-[3px] rounded-full "
                    }
                  ></li>
                  <li
                    className={
                      changeHeader
                        ? "bg-gray-100  p-[3px] rounded-full "
                        : "bg-indigo-500  p-[3px] rounded-full "
                    }
                  ></li>
                </ol>
              </button>
              <div class="dropdown-content ">
                <NavLink
                  className="text-gray-100 ab"
                  to={admin ? "/dashboard" : "/myOrders"}
                >
                  {admin ? "Dashboard" : "My Order"}
                </NavLink>
                <h1
                  onClick={signOutUser}
                  className="text-gray-100 ab cursor-pointer hidden"
                >
                  Log Out{" "}
                </h1>
              </div>
            </div>
          </div>
          {user.displayName ? (
            <>
              <div className="flex items-center justify-end space-x-4">
                <div class="dropdown">
                  <button
                    class={
                      changeHeader
                        ? "text-gray-100 duration-700 hover:scale-105 hidden md:block lg:block"
                        : "dropbtn ext-gray-600 duration-700 hover:scale-105 hidden md:block lg:block"
                    }
                  >
                    {admin ? "Admin" : "Dashboard"}
                  </button>
                  <div class="dropdown-content">
                    <NavLink
                      className="text-gray-100 ab"
                      to={admin ? "/dashboard" : "/myOrders"}
                    >
                      {admin ? "Dashboard" : "My Order"}
                    </NavLink>
                    <h1
                      onClick={signOutUser}
                      className="text-gray-100 ab cursor-pointer hidden"
                    >
                      Log Out{" "}
                    </h1>
                  </div>
                </div>

                <img
                  src={user?.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full hidden lg:block md:block"
                />
                {console.log(user.photoURL)}
                <p
                  className={
                    changeHeader
                      ? "text-gray-100 poppins hidden md:block lg:block"
                      : "text-gray-700 poppins hidden md:block lg:block"
                  }
                >
                  {first}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-end space-x-6 hidden md:block lg:block">
                <NavLink
                  to="/signup"
                  className={
                    changeHeader
                      ? "text-indgo-600 bg-gray-100 px-6 py-2 text-indigo-600 poppins rounded-md  focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
                      : "text-gray-600 bg-indigo-500 px-6 py-2 text-white poppins rounded-md  focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
                  }
                >
                  Sign Up
                </NavLink>
              </div>

              {/* <div className="flex items-center justify-end space-x-6 mt-3 block md:hidden lg:hidden">
                <NavLink to="">
                  <ol className="space-y-[-15px] ">
                    <li
                      className={
                        changeHeader
                          ? "bg-gray-100  p-[3px] rounded-full "
                          : "bg-indigo-500  p-[3px] rounded-full "
                      }
                    ></li>
                    <li
                      className={
                        changeHeader
                          ? "bg-gray-100  p-[3px] rounded-full "
                          : "bg-indigo-500  p-[3px] rounded-full "
                      }
                    ></li>
                    <li
                      className={
                        changeHeader
                          ? "bg-gray-100  p-[3px] rounded-full "
                          : "bg-indigo-500  p-[3px] rounded-full "
                      }
                    ></li>
                  </ol>
                </NavLink>
              </div> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
// <header>
//     <div className="container">
//       <div className="">
//         <Link to="/">
//           <h1 className="text-2xl font-bold">Narisha Jewels</h1>
//         </Link>
//       </div>

//       <div className="search">
//         <form>
//           <div class="flex">
//             <div class="relative w-full">
//               <input
//                 type="search"
//                 id="search-dropdown"
//                 class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-70 dark:border-l-gray-700  dark:border-gray-600  dark:text-gray dark:focus:border-indigo-500"
//                 placeholder="Search products"
//                 required=""
//                 onChange={handleSearchInput}
//               />
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* cart preview */}
//       <div className="cart mt-1 mr-2">
//         <div className="" onClick={handleCartButton}>
//           <div className="relative flex cursor-pointer ">
//             {cartQuantity ? (
//               <span className="bg-indigo-500 w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2 animate-bounce">
//                 {cartQuantity}
//               </span>
//             ) : (
//               ""
//             )}

//             <BsCart2 className="cursor-pointer w-6 h-6 text-gray-700 " />
//           </div>
//         </div>

//         <CartPreview />
//       </div>

//       {user.displayName ? (
//         <>
//           <NavLink
//             to="/dashboard"
//             onClick={() => setshow(!show)}
//             className="rounded-md flex space-x-1  font-normal text-sm leading-3 text-indigo-700 bg-white  focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center px-2"
//           >
//             Dashboard
//           </NavLink>
//         </>
//       ) : (
//         <>
//           <NavLink
//             to="/signin"
//             onClick={() => setshow(!show)}
//             className="rounded-md flex space-x-1  duration-150 justify-center items-center"
//           >
//             <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 mx-2 border border-gray-400 rounded shadow">
//               Login
//             </button>
//           </NavLink>
//         </>
//       )}

//       {user.displayName ? (
//         <button onClick={signOutUser} class=" py-1 ">
//           <img src="https://img.icons8.com/ios-glyphs/30/null/logout-rounded-down.png" />
//         </button>
//       ) : (
//         ""
//       )}
//     </div>
//   </header>
