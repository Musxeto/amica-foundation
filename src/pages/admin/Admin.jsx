import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();
  const quotes = [
    "Believe you can, and you're halfway there.",
    "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Dream big, work hard, stay focused, and surround yourself with good people.",
  ];

  // Set greeting based on current time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else if (hour < 21) setGreeting("Good evening");
    else setGreeting("Good night");

    // Random motivational quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen mt-16 bg-raisin-black-2 p-4 sm:p-6 lg:p-8 text-buff-600">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {greeting}, Admin!
          </h1>
          <p className="mt-2 text-md sm:text-lg lg:text-xl italic">{quote}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          <button
            onClick={() => navigate("/admin/reports")}
            className="bg-yellow-green-500 transition-all ease-in-out duration-100 hover:bg-buff text-raisin-black-100 font-bold py-2 px-4 rounded w-full"
          >
            Manage Reports
          </button>
          <button
            onClick={() => navigate("/admin/reports/new")}
            className="bg-yellow-green-500 transition-all ease-in-out duration-100 hover:bg-buff text-raisin-black-100 font-bold py-2 px-4 rounded w-full"
          >
            Add New Report
          </button>
          <button
            onClick={() => navigate("/admin/interviews")}
            className="bg-yellow-green-500 transition-all ease-in-out duration-100 hover:bg-buff text-raisin-black-100 font-bold py-2 px-4 rounded w-full"
          >
            Manage Interviews
          </button>
          <button
            onClick={() => navigate("/admin/interviews/new")}
            className="bg-yellow-green-500 transition-all ease-in-out duration-100 hover:bg-buff text-raisin-black-100 font-bold py-2 px-4 rounded w-full"
          >
            Add New Interview
          </button>
          <button
            onClick={() => navigate("/admin/projects")}
            className="bg-yellow-green-500 transition-all ease-in-out duration-100 hover:bg-buff text-raisin-black-100 font-bold py-2 px-4 rounded w-full"
          >
            Manage Projects
          </button>
          <button
            onClick={() => navigate("/admin/projects/new")}
            className="bg-yellow-green-500 transition-all ease-in-out duration-100 hover:bg-buff text-raisin-black-100 font-bold py-2 px-4 rounded w-full"
          >
            Add New Project
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin;
