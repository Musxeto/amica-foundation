import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-raisin-black-2 min-h-screen mt-16 text-white py-10 px-4 md:px-20 lg:px-40">
        <h2 className="text-3xl font-bold text-buff-500 text-center mb-6">
          About Us
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Welcome to our platform! We are dedicated to providing exceptional
          services that cater to the needs of our users. Our mission is to
          create a seamless experience for everyone who interacts with our
          application.
        </p>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-buff-500 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-300 mb-4">
            Our mission is to empower individuals by providing innovative
            solutions that simplify communication and foster connections.
            We believe in the importance of user feedback and continually strive
            to improve our services to meet your needs.
          </p>
          
          <h3 className="text-2xl font-semibold text-buff-500 mb-4">
            Our Values
          </h3>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <li>Integrity: We uphold the highest standards of honesty.</li>
            <li>Innovation: We embrace creativity and continuously seek new ways to improve.</li>
            <li>Customer Focus: Our users are at the heart of everything we do.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-buff-500 mb-4">
            Join Us
          </h3>
          <p className="text-gray-300">
            We invite you to explore our services and experience the difference.
            If you have any questions or feedback, feel free to reach out
            through our Contact Us page.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
