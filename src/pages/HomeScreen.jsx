import Faq from "components/Faq";
import Footer from "components/Footer";
import React from "react";
import Home from "./home";

const HomeScreen = () => {
  return (
    <div>
      <Home></Home>
      <Faq></Faq>
      <Footer></Footer>
    </div>
  );
};

export default HomeScreen;
