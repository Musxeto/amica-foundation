import React from 'react';
import Navbar from './Navbar'; 

const Layout = ({ children }) => {
  console.log("Children in Layout: ", children); // This should log the component being passed
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
