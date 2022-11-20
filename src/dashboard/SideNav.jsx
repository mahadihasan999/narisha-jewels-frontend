import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const { user, admin } = useAuth();

  const [sidenav, setSidenav] = useState(true);
  //toggling the side nav
  const handlenav = () => {
    setSidenav(!sidenav);
  };

  // auto hide
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1098) {
      setSidenav(false);
    } else {
      setSidenav(true);
    }
  });

  const menuy = [{ id: 1, text: "My Order", to: "/dashboard/myOrders" }];

  const menux = [
    { id: 1, text: "Add product", to: "/dashboard/addProduct" },
    { id: 2, text: "Manage orders", to: "/dashboard/manageOrders" },
    { id: 3, text: "Manage Products", to: "/dashboard/manageProducts" },
  ];

  return (
    <div className="pt-10">
      {sidenav && (
        <>
          <nav
            className={`${
              admin ? "block" : "hidden"
            } flex fixed flex-col w-64 bg-indigo-500 h-screen px-4`}
          >
            <div className="flex items-center mt-14 mb-4 px-2">
              <div className="w-10 h-10 bg-cover rounded-md mr-3">
                <img
                  src={user?.photoURL}
                  className="rounded-md "
                  alt={user?.displayName}
                />
              </div>
              <div>
                <p className="text-gray-100 text-sm font-medium">
                  {user.displayName}{" "}
                  <span className="text-green-500"> Admin</span>
                </p>
                <p className="text-gray-100 text-xs">{user.email}</p>
              </div>
            </div>

            <div>
              <ul className="ml-4">
                {menux.map((item) => (
                  <li className="flex items-center" key={item.id}>
                    <NavLink
                      exact
                      to={item.to}
                      className="p-3"
                      activeClassName="border-l-2 border-white w-full p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="ml-2 text-white poppins">
                          {item.text}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <nav
            className={`${
              admin ? "hidden" : "block"
            } flex fixed flex-col w-64 bg-indigo-500 h-screen px-4`}
          >
            <div className="flex items-center mt-14 mb-4 px-8">
              <div className="w-10 h-10 bg-cover rounded-md mr-3">
                <img
                  src={user?.photoURL}
                  className="rounded-md "
                  alt={user?.displayName}
                />
              </div>
              <div>
                <p className="text-gray-100 text-sm font-medium">
                  {user.displayName}
                  <span className="text-green-500"> User</span>
                </p>
                <p className="text-gray-100 text-xs">{user.email}</p>
              </div>
            </div>

            <div>
              <ul className="ml-4">
                {menuy.map((item) => (
                  <li className="flex items-center" key={item.id}>
                    <NavLink
                      exact
                      to={item.to}
                      className="p-3"
                      activeClassName="border-l-2 border-white w-full p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="ml-2 text-white poppins">
                          {item.text}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </>
      )}
      <div></div>
      {/* //menu icons  */}
      <div
        className="lg:hidden block fixed bottom-10 left-10 bg-white p-2 rounded-full cursor-pointer shadow-xl border border-indigo"
        onClick={handlenav}
      >
        <img
          className={`${sidenav ? "hidden" : ""}`}
          width={24}
          height={24}
          src="https://img.icons8.com/material-outlined/50/000000/forward.png"
          alt="arrow-button"
        />

        <svg
          className={`${sidenav ? "block" : "hidden"}`}
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SideNav;
