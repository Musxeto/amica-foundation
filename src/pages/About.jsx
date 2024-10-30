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
          Welcome to the Amica Foundation, where progress meets purpose. Our mission is to create a better environment in Pakistan through advocacy and initiatives across healthcare, animal welfare, environmental conservation, and human rights.
        </p>

        <h3 className="text-2xl font-semibold text-buff-500 mb-4">
          Our Mission
        </h3>
        <p className="text-gray-300 mb-4">
          We are committed to addressing critical issues that impact our communities and our planet. By bringing together dedicated individuals and sharing insights and projects, we aim to spotlight topics that are essential for a sustainable and equitable Pakistan.
        </p>

        <h3 className="text-2xl font-semibold text-buff-500 mb-4">
          Our Focus Areas
        </h3>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Healthcare: Enhancing accessibility and promoting public health initiatives.</li>
          <li>Animal Welfare: Advocating for the humane treatment and well-being of animals.</li>
          <li>Environmental Conservation: Raising awareness and working towards a greener, cleaner Pakistan.</li>
          <li>Human Rights: Standing up for justice, equity, and the protection of fundamental rights.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-buff-500 mb-4">
          Get Involved
        </h3>
        <p className="text-gray-300 mb-4">
          If you’re passionate about creating positive change, we invite you to share your projects, insights, or research. Together, we can inspire others and amplify voices that often go unheard.
        </p>

        <h3 className="text-2xl font-semibold text-buff-500 mb-4">
          Contact Us
        </h3>
        <p className="text-gray-300 mb-4">
          We’d love to connect with you! For questions, collaborations, or suggestions, please reach out through our <a href="/contact" className="text-buff-500 underline">Contact Us</a> page.
        </p>

        <p className="text-center text-gray-300">
          Join us in making a lasting impact and building a brighter future for Pakistan!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
