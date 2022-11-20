import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
const SideNavNew = () => {
  return (
    <div className="container mx-4 mt-20">
      <Menu isOpen={true} className="bg-indigo-600">
        <NavLink
          exact
          to="/dashboard/addProduct"
          className="p-3"
          activeClassName="border-l-2 border-white w-full p-3"
        >
          AddProduct
        </NavLink>
      </Menu>
    </div>
  );
};

export default SideNavNew;
