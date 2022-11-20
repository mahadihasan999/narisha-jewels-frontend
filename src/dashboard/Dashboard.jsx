import AuthProvider from "contexts/auth";
import PrivateRoute from "layouts/PrivateRoute";
import MyOrder from "pages/MyOrder";
import React, { Component } from "react";
import { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import SideNavNew from "./userDashboard/SideNavNew";

const AddProduct = React.lazy(() => import("./adminDashboard/AddProduct"));
const ManageOrder = React.lazy(() => import("./adminDashboard/ManageOrder"));
const SideNav = React.lazy(() => import("./SideNav"));
const UpdateProducts = React.lazy(() =>
  import("./adminDashboard/UpdateProducts")
);
const ManageProducts = React.lazy(() =>
  import("./adminDashboard/ManageProducts")
);

// const MyOrder = React.lazy(() => import("./pages/MyOrder"));

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={"loading"}>
          <BrowserRouter>
            <AuthProvider>
              <main className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="col-span-1">
                  <SideNav />
                  {/* <SideNavNew></SideNavNew> */}
                </div>
                <div className="col-span-4 my-24 px-6">
                  <Switch>
                    <PrivateRoute path="/dashboard/addproduct">
                      <AddProduct />
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/manageOrders">
                      <ManageOrder />
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/manageProducts">
                      <ManageProducts />
                    </PrivateRoute>

                    {/* <PrivateRoute path="/myOrders">
                      <MyOrder />
                    </PrivateRoute> */}
                    <PrivateRoute path="/dashboard/update/:id">
                      <UpdateProducts />
                    </PrivateRoute>
                  </Switch>
                </div>
              </main>
            </AuthProvider>
          </BrowserRouter>
        </Suspense>
      </div>
    );
  }
}
