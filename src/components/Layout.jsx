import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes with specific layout behavior
  const noHeaderOrFooterRoutes = ["/dash2"];
  const headerOnlyRoutes = ["/login"];

  // Determine layout logic
  const isNoHeaderOrFooter = noHeaderOrFooterRoutes.includes(location.pathname);
  const isHeaderOnly = headerOnlyRoutes.includes(location.pathname);

  return (
    <>
      {!isNoHeaderOrFooter && <Header />}
      {children}
      {!isNoHeaderOrFooter && !isHeaderOnly && <Footer />}
    </>
  );
};

export default Layout;
