import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing pages
import Home from '../pages/Home';
import Interviews from '../pages/Interviews';
import Projects from '../pages/Projects';
import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import Reports from '../pages/Reports';
import Admin from '../pages/Admin';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/interviews" element={<Interviews />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AllRoutes;
