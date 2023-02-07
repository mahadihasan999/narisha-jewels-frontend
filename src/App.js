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
import AddProduct from "dashboard/adminDashboard/products/AddProduct";
import Header from "components/Header";
import Checkouts from "pages/Checkouts";
import Dashboard from "dashboard/Dashboard";
import HomeScreen from "pages/HomeScreen";
import Register from "pages/Register";
import SignIn from "pages/SignIn";
import MyOrder from "dashboard/userDashboard/MyOrder";
import Payment from "pages/Payment";
import Navbar from "components/Navbar";
import BlogDetails from "components/blog/BlogDetails";
import Properties from "components/properties/Properties";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Blogs from "components/blog/Blogs";
import About from "components/About";

const App = () => {
  return (
    <AuthProvider>
      <CommonProvider>
        <ProductsProvider>
          <CartProvider>
            <CheckoutProvider>
              <Router>
                <Navbar />
                <FloatingWhatsApp
                  phoneNumber="+8801757044229"
                  avatar="https://res.cloudinary.com/dhucdoev3/image/upload/v1675453177/9463fc20-24e6-400f-8a4f-64d136552566_adfqil.jpg"
                  accountName="Narisha Jewels"
                />
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
                  <Route path="/properties" layout={CommonLayout}>
                    <Properties />
                  </Route>
                  <Route path="/blog-s" layout={CommonLayout}>
                    <Blogs />
                  </Route>
                  <Route path="/about" layout={CommonLayout}>
                    <About />
                  </Route>
                  <Route path="/signup" layout={CommonLayout}>
                    <Register />
                  </Route>
                  <Route path="/blogs/:id" layout={CommonLayout}>
                    <BlogDetails />
                  </Route>

                  <Route path="/signin" layout={CommonLayout}>
                    <SignIn />
                  </Route>
                  <Route path="/payment-gateway" layout={CommonLayout}>
                    <Payment />
                  </Route>
                  <Route path="/checkouts" layout={CommonLayout}>
                    <Checkouts />
                  </Route>
                  <Route path="/dashboard" layout={CommonLayout}>
                    <Dashboard />
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
