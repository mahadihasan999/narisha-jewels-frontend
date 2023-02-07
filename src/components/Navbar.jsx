import {
  CartDispatchContext,
  CartStateContext,
  toggleCartPopup,
} from "contexts/cart";
import { CommonDispatchContext, setSearchKeyword } from "contexts/common";
import useAuth from "hooks/useAuth";
import react, { useContext, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";
import CartPreview from "./CartPreview";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [close, setCLose] = useState(false);
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
    <div
      className={
        changeHeader
          ? "bg-indigo-500 fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-indigo-100 fixed z-50 top-0 left-0 w-full transition duration-500"
      }
    >
      <section>
        <div className="relative max-w-screen-xl mx-auto  ">
          {/* <img
            className="absolute w-full inset-0 h-full object-cover object-center"
            src="https://cdn.tuk.dev/assets/templates/weCare/hero2-bg.png"
            alt="we care family"
          /> */}
          <nav className="lg:hidden relative z-40">
            <div className="flex py-3.5 justify-between items-center px-2 ">
              <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                {changeHeader ? (
                  <img
                    className="h-12 w-"
                    src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675679879/new_logo-3_henozd.png"
                    alt="narisha-jewels-logo"
                  ></img>
                ) : (
                  <img
                    className="h-12"
                    src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675679870/new_logo_rpauwb.png"
                    alt="narisha-jewels-logo"
                  ></img>
                )}
              </NavLink>
              <div className="flex items-center">
                <ul
                  id="list"
                  className={`${
                    menu ? "" : "hidden"
                  } p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-16 md:mt-16`}
                >
                  <NavLink
                    to="/"
                    className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normalBlogs mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
                  >
                    <h1>
                      <span className="ml-2 font-bold">Home</span>
                    </h1>
                  </NavLink>
                  <NavLink
                    to="/properties"
                    className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                    onclick="dropdownHandler(this)"
                  >
                    <h1>
                      <span className="ml-2 font-bold">Properties</span>
                    </h1>
                  </NavLink>
                  <NavLink
                    to="/blog-s"
                    className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                  >
                    <h1>
                      <span className="ml-2 font-bold">Blogs</span>
                    </h1>
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                    onclick="dropdownHandler(this)"
                  >
                    <h1>
                      <span className="ml-2 font-bold">About</span>
                    </h1>
                  </NavLink>
                  {user.displayName ? (
                    <div>
                      {/* <button
                        class={
                          changeHeader
                            ? "text-gray-100 duration-700 hover:scale-105 hidden md:block lg:block"
                            : "dropbtn ext-gray-600 duration-700 hover:scale-105 hidden md:block lg:block"
                        }
                      >
                        {admin ? "Admin" : "Dashboard"}
                      </button> */}

                      <NavLink
                        className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                        to={admin ? "/dashboard" : "/dashboard"}
                      >
                        <h1 className="ml-2">
                          {admin ? "Dashboard" : "My Order"}
                        </h1>
                      </NavLink>

                      <div className="flex gap-1 items-center">
                        <img
                          src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                          alt={user.displayName}
                          className="w-8 h-8 rounded-full "
                        />

                        <p
                          className={
                            changeHeader
                              ? "text-gray-100 poppins  "
                              : "text-gray-700 poppins  "
                          }
                        >
                          {first}
                        </p>
                      </div>

                      <button
                        onClick={signOutUser}
                        className="focus:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-600 text-white text-[15px] px-2 font-semibold rounded focus:outline-none ml-2"
                      >
                        Log Out{" "}
                      </button>
                    </div>
                  ) : (
                    <NavLink
                      to="/signup"
                      className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-50 focus:text-indigo-100 focus:outline-none flex justify-center bg-indigo-500 text-indigo-50 w-14"
                      onclick="dropdownHandler(this)"
                    >
                      <h1>
                        <span className="ml-2 font-bold">Login</span>
                      </h1>
                    </NavLink>
                  )}
                </ul>
                <div onClick={() => setCLose(!close)}>
                  <div
                    className="relative flex cursor-pointer cart "
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
                </div>
                {/**/}
                <div
                  className={` ${
                    close ? "hidden" : ""
                  }  xl:hidden pl-2 md:pl-4 `}
                >
                  <img
                    id="open"
                    className={` ${menu ? "hidden" : ""} close-m-menu`}
                    onClick={() => setMenu(!menu)}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg1.svg"
                    alt="menu"
                  />
                  <div
                    id="close"
                    className={` ${menu ? "" : "hidden"} close-m-menu`}
                    onClick={() => setMenu(!menu)}
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg2.svg"
                      alt="cross"
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <nav
            role="navigation"
            aria-label="Main"
            tabNavbar="0"
            className="hidden relative  w-full lg:flex justify-between items-center py-3.5"
          >
            <div className="w-1/6">
              <NavLink to="/">
                {changeHeader ? (
                  <img
                    className="h-12"
                    src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675679879/new_logo-3_henozd.png"
                    alt="narisha-jewels-logo"
                  ></img>
                ) : (
                  <img
                    className="h-12"
                    src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675679870/new_logo_rpauwb.png"
                    alt="narisha-jewels-logo"
                  ></img>
                )}
              </NavLink>
            </div>
            <div className="w-5/6">
              <div className="flex items-center justify-end">
                <ul className="text-gray-800 lg:space-x-8 flex items-center leading-none">
                  <NavLink to="/">
                    <span
                      className={
                        changeHeader ? " text-gray-100" : "text-gray-700"
                      }
                    >
                      Home
                    </span>
                  </NavLink>
                  <NavLink
                    to="/properties"
                    className="ml-4 hover:text-indigo-500 "
                  >
                    <span
                      className={
                        changeHeader ? " text-gray-100" : "text-gray-700"
                      }
                    >
                      Properties
                    </span>
                  </NavLink>
                  <NavLink
                    to="/blog-s"
                    className="ml-4 hover:text-indigo-500 focus:text-indigo-500"
                  >
                    <span
                      className={
                        changeHeader ? " text-gray-100" : "text-gray-700"
                      }
                    >
                      Blogs
                    </span>
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="ml-4 hover:text-indigo-500 focus:text-indigo-500"
                  >
                    <span
                      className={
                        changeHeader ? " text-gray-100" : "text-gray-700"
                      }
                    >
                      About
                    </span>
                  </NavLink>

                  <div
                    className="relative flex cursor-pointer cart "
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
                </ul>
                <div className="pl-40">
                  {user.displayName ? (
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
                            to={admin ? "/dashboard" : "/dashboard"}
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
                        src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full hidden lg:block md:block"
                      />

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
                  ) : (
                    <NavLink
                      to="/signup"
                      aria-label="live chat"
                      className="focus:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 font-semibold rounded focus:outline-none"
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>

      <style>
        {`
            /* Top menu */
            .top-100 {
                animation: slideDown 0.5s ease-in-out;
            }
            @keyframes slideDown {
                0% {
                    top: -50%;
                }
                100% {
                    top: 0;
                }
            }
            * {
                outline: none !important;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;
            }`}
      </style>
    </div>
  );
};
export default Navbar;
