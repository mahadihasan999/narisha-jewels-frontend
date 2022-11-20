import Header from "../components/Header";
import React from "react";

const CommonLayout = ({ children }) => {
  return (
    <div className="container common-layout">
      {/* <Header></Header> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
