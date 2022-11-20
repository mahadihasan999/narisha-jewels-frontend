import React from "react";
import CheckoutPage from "./pages/checkout";
import AuthProvider from "./contexts/AuthProvider";
import CommonProvider from "./contexts/common";
import ProductsProvider from "./contexts/products";
import CartProvider from "./contexts/cart";
import CheckoutProvider from "./contexts/checkout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RouteWrapper from "./layouts/RouteWrapper";
import AuthLayout from "./layouts/AuthLayout";
import CommonLayout from "./layouts/CommonLayout";
import AuthPage from "./pages/auth";
import Home from "./pages/home";
import "../src/assets/scss/style.scss";
import AddProduct from "dashboard/adminDashboard/AddProduct";
import Header from "components/Header";
import Checkouts from "pages/Checkouts";
import Dashboard from "dashboard/Dashboard";
import HomeScreen from "pages/HomeScreen";
import Register from "pages/Register";
import SignIn from "pages/SignIn";
import MyOrder from "pages/MyOrder";

const App = () => {
  return (
    <AuthProvider>
      <CommonProvider>
        <ProductsProvider>
          <CartProvider>
            <CheckoutProvider>
              <Router>
                <Header></Header>
                <Switch>
                  {/* <RouteWrapper
                    path="/"
                    exact
                    component={Home}
                    layout={CommonLayout}
                  />
                  <RouteWrapper
                    path="/checkout"
                    component={CheckoutPage}
                    layout={CommonLayout}
                  />
                  <RouteWrapper
                    path="/auth"
                    component={AuthPage}
                    layout={AuthLayout}
                  /> */}
                  <Route exact path="/" layout={CommonLayout}>
                    <HomeScreen></HomeScreen>
                  </Route>
                  <Route exact path="/signup" layout={CommonLayout}>
                    <Register />
                  </Route>
                  <Route exact path="/signin" layout={CommonLayout}>
                    <SignIn />
                  </Route>
                  <Route exact path="/checkouts" layout={CommonLayout}>
                    <Checkouts />
                  </Route>
                  <Route exact path="/dashboard" layout={CommonLayout}>
                    <Dashboard />
                  </Route>
                  <Route exact path="/myOrders" layout={CommonLayout}>
                    <MyOrder />
                  </Route>
                </Switch>
              </Router>
            </CheckoutProvider>
          </CartProvider>
        </ProductsProvider>
      </CommonProvider>
    </AuthProvider>
  );
};

export default App;

// <AuthProvider>
//       <CommonProvider>
//         <ProductsProvider>
//           <CartProvider>
//             <Router>
//               <Header></Header>
//               <Switch>
//                 <Route path="/" layout={CommonLayout}>
//                   <Home />
//                 </Route>
//                 <Route path="/addProduct" layout={CommonLayout}>
//                   <AddProduct />
//                 </Route>
//                 <Route path="/signin" layout={CommonLayout}>
//                   <SignIn />
//                 </Route>
//                 <Route path="/signup" layout={CommonLayout}>
//                   <Register />
//                 </Route>
//                 <Route path="/checkouts">
//                   <Checkouts></Checkouts>
//                 </Route>
//               </Switch>
//             </Router>
//           </CartProvider>
//         </ProductsProvider>
//       </CommonProvider>
//     </AuthProvider>
