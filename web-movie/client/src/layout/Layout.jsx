import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import MobileFooter from "./Footer/MobileFooter";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <Navbar />
        {children}
        <Footer />
        {/* mobile footer*/}
        <MobileFooter />
      </div>
    </>
  );
};

export default Layout;
