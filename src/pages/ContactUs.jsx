import React, { useState } from "react";
import Select from "react-select";
import {
  FaEnvelope,
  FaSchool,
  FaUser,
  FaRegEdit,
  FaComments,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    subject: "",
    message: "",
  });

  const [reason, setReason] = useState(null);

  const reasonsOptions = [
    { value: "support", label: "Support" },
    { value: "feedback", label: "Feedback" },
    { value: "general-inquiry", label: "General Inquiry" },
    { value: "partnership", label: "Partnership" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setReason(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send data to an API
    console.log("Form Data: ", { ...formData, reason: reason?.value });
    // Reset form
    setFormData({
      name: "",
      email: "",
      school: "",
      subject: "",
      message: "",
    });
    setReason(null);
  };

  return (
    <>
      <Navbar />
      <div className="bg-raisin-black-2 min-h-screen mt-16 text-white py-10 px-4 md:px-20 lg:px-40">
        <h2 className="text-3xl font-bold text-buff-500 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-300 mb-8">
          We’d love to hear from you! Fill out the form below and we’ll be in
          touch.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-raisin-black p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
        >
          <div className="flex flex-col gap-6 mb-6">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-yellow-green text-sm font-semibold mb-2 flex items-center">
                <FaUser className="mr-2" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 rounded bg-raisin-black-4 text-buff-500 outline-none focus:ring-2 focus:ring-buff-600"
                placeholder="Your name"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-yellow-green text-sm font-semibold mb-2 flex items-center">
                <FaEnvelope className="mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 rounded bg-raisin-black-4 text-buff-500 outline-none focus:ring-2 focus:ring-buff-600"
                placeholder="Your email address"
                required
              />
            </div>

            {/* School */}
            <div className="flex flex-col">
              <label className="text-yellow-green text-sm font-semibold mb-2 flex items-center">
                <FaSchool className="mr-2" />
                School
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="px-4 py-2 rounded bg-raisin-black-4 text-buff-500 outline-none focus:ring-2 focus:ring-buff-600"
                placeholder="Your school"
              />
            </div>

            {/* Reason for Contact */}
            <div className="flex flex-col">
              <label className="text-yellow-green text-sm font-semibold mb-2 flex items-center">
                <FaComments className="mr-2" />
                Reason for Contact
              </label>
              <Select
                options={reasonsOptions}
                value={reason}
                onChange={handleSelectChange}
                className="text-raisin-black-100 text-sm"
                placeholder="Select a reason"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label className="text-yellow-green text-sm font-semibold mb-2 flex items-center">
                <FaRegEdit className="mr-2" />
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="px-4 py-2 rounded bg-raisin-black-4 text-buff-500 outline-none focus:ring-2 focus:ring-buff-600"
                placeholder="Subject of your message"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="text-yellow-green text-sm font-semibold mb-2 flex items-center">
                <FaComments className="mr-2" />
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="px-4 py-2 rounded bg-raisin-black-4 text-buff-500 outline-none focus:ring-2 focus:ring-buff-600"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-buff-500 text-raisin-black-700 font-semibold py-2 rounded-lg hover:bg-buff-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
