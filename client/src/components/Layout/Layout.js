import React, { useState } from "react";
import NavBar from "./../NavBar/NavBar";
import Footer from "./../Footer/Footer";
import SideDrawer from "./../SideDrawer/SideDrawer";

const Layout = (props) => {
  const [sdOpen, setSDOpen] = useState(false);

  const toggleHandler = () => {
    setSDOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <NavBar toggleSD={toggleHandler} sd={sdOpen} />
      <SideDrawer sdOpen={sdOpen} toggleSD={toggleHandler} />
      <main>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
