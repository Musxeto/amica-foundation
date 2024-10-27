import React from "react";

const Footer = () => {
  return (
    <footer className="bg-raisin-black border-t-light-red-500 border-t-2 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} Amica Foundation. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="/about" className="hover:underline">About Us</a>
      </div>
    </footer>
  );
};

export default Footer;
