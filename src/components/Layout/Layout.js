import React from "react";
import NavBar from "./../NavBar/NavBar";
import Footer from "./../Footer/Footer";

const Layout = (props) => {
  return (
    <React.Fragment>
      <NavBar />
      {/* <div>SideDrawer</div> */}
      <main>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
