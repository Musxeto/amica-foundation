import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-raisin-black-2  min-h-screen mt-16 text-white py-10 px-4 md:px-20 lg:px-40">
        <h2 className="text-3xl font-bold text-buff-500 text-center mb-6">
          About Us
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Welcome to the Amica Foundation! We are dedicated to raising awareness about underrepresented issues in Pakistan.
        </p>

        <h3 className="text-2xl font-semibold text-buff-500 mb-4">
          Our Purpose
        </h3>
        <p className="text-gray-300 mb-4">
          Our main contributors are GP students who share unique projects and valuable insights. The website highlights important topics often overlooked in mainstream media, such as the Baloch insurgency and single parenting.
        </p>

        <h3 className="text-2xl font-semibold text-buff-500 mb-4">
          Key Features
        </h3>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Explore research articles on critical issues.</li>
          <li>View informative slides and posters created by students.</li>
          <li>Access content that fosters dialogue and raises awareness.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-buff-500 mb-4">
          Contact Us
        </h3>
        <p className="text-gray-300 mb-4">
          We’d love to hear from you! If you have any questions, suggestions, or would like to collaborate, please reach out to us through our <a href="/contact" className="text-buff-500 underline">Contact Us</a> page.
        </p>

        <p className="text-center text-gray-300">
          Together, we can make a difference and bring attention to important issues in our society!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
