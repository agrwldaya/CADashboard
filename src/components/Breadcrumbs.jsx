import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ current }) => {
  return (
    <div className="bg-blue-500 py-3">
      <div className="container mx-auto px-4">
        <nav className="text-white text-sm sm:text-base flex flex-wrap items-center">
          {/* Link to Home */}
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          {/* Current Page */}
          <span>{current}</span>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
