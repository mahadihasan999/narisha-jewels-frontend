import AuthProvider from "contexts/auth";
import PrivateRoute from "layouts/PrivateRoute";
import MyOrder from "dashboard/userDashboard/MyOrder";
import React, { Component, useState } from "react";
import { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import AddBlogs from "./adminDashboard/blogs/AddBlogs";
import ManageBlogs from "./adminDashboard/blogs/ManageBlogs";
import UpdateBlogs from "./adminDashboard/blogs/UpdateBlogs";
import Details from "./adminDashboard/orders/Details";

const AddProduct = React.lazy(() =>
  import("./adminDashboard/products/AddProduct")
);
const ManageOrder = React.lazy(() =>
  import("./adminDashboard/orders/ManageOrder")
);
const SideNav = React.lazy(() => import("./SideNav"));
const UpdateProducts = React.lazy(() =>
  import("./adminDashboard/products/UpdateProducts")
);
const ManageProducts = React.lazy(() =>
  import("./adminDashboard/products/ManageProducts")
);

// const MyOrder = React.lazy(() => import("./pages/MyOrder"));

const Dashboard = () => {
  const [sidenav, setSidenav] = useState(true);
  //toggling the side nav
  const handlenav = () => {
    setSidenav(!sidenav);
  };

  return (
    <div className="lg:mt-10 md:mt-15 mt-10">
      <Suspense fallback={"loading"}>
        <BrowserRouter>
          <AuthProvider>
            <main className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="col-span-1">
                <SideNav />
                {/* <SideNavNew></SideNavNew> */}
              </div>
              {/* <div className="col-span-4 my-10 px-6 h-96 w-64 bg-indigo-700"></div> */}
              <div className="col-span-4 my-10 px-6">
                <div>{/* <DashboardSummary /> */}</div>
                <Switch>
                  {/* product section */}
                  <PrivateRoute path="/dashboard/add-product">
                    <AddProduct />
                  </PrivateRoute>
                  <PrivateRoute path="/dashboard/manage-products">
                    <ManageProducts />
                  </PrivateRoute>
                  <PrivateRoute path="/dashboard/product-update/:id">
                    <UpdateProducts />
                  </PrivateRoute>

                  {/* blogs section */}
                  <PrivateRoute path="/dashboard/add-blog">
                    <AddBlogs />
                  </PrivateRoute>

                  <PrivateRoute path="/dashboard/manage-blogs">
                    <ManageBlogs />
                  </PrivateRoute>

                  <PrivateRoute path="/dashboard/blog-update/:id">
                    <UpdateBlogs />
                  </PrivateRoute>

                  {/* order section */}
                  <PrivateRoute path="/dashboard/manage-all-order">
                    <ManageOrder />
                  </PrivateRoute>
                  <PrivateRoute path="/order-details/:id">
                    <Details />
                  </PrivateRoute>
                  <PrivateRoute path="/dashboard/my-order">
                    <MyOrder />
                  </PrivateRoute>

                  {/* <PrivateRoute path="/myOrders">
                      <MyOrder />
                    </PrivateRoute> */}
                </Switch>
              </div>
            </main>
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default Dashboard;
