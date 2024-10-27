import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-raisin-black border-t-light-red-500 border-t-2 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} Amica Foundation. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link to="/about" className="hover:text-buff">About Us</Link>
      </div>
    </footer>
  );
};

export default Footer;
