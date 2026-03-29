import React from "react";
import { Outlet } from "react-router-dom";
import JemaatNavbar from "../components/JemaatNavbar";
import JemaatFooter from "../components/JemaatFooter";

const JemaatLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar khusus Jemaat yang sudah login */}
      <JemaatNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* Footer khusus Jemaat */}
      <JemaatFooter />
    </div>
  );
};

export default JemaatLayout;