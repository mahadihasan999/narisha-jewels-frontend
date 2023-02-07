import Banner from "components/Banner";
import Blogs from "components/blog/Blogs";
import Faq from "components/Faq";
import Footer from "components/Footer";
import HighLights from "components/HightLights";
import Instagram from "components/Instagram";
import Navbar from "components/Navbar";
import Stat from "components/Stat";
import React from "react";
import Home from "./home";

const HomeScreen = () => {
  return (
    <div>
      <Banner />
      <HighLights />
      <Home></Home>
      <Blogs />
      <Stat />
      <Instagram />
      <Faq></Faq>
      <Footer></Footer>
    </div>
  );
};

export default HomeScreen;
