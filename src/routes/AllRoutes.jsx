import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";

const Admin = () => {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");

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
      <div className="min-h-screen mt-16 bg-raisin-black-2 p-6 text-buff-600">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">{greeting}, Admin!</h1>
          <p className="mt-2 text-lg italic">{quote}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          <button className="bg-yellow-green-500 hover:bg-yellow-green-400 text-raisin-black-100 font-bold py-2 px-4 rounded">
            Manage Reports
          </button>
          <button className="bg-yellow-green-500 hover:bg-yellow-green-400 text-raisin-black-100 font-bold py-2 px-4 rounded">
            Add New Report
          </button>
          <button className="bg-yellow-green-500 hover:bg-yellow-green-400 text-raisin-black-100 font-bold py-2 px-4 rounded">
            Manage Interviews
          </button>
          <button className="bg-yellow-green-500 hover:bg-yellow-green-400 text-raisin-black-100 font-bold py-2 px-4 rounded">
            Add New Interview
          </button>
          <button className="bg-yellow-green-500 hover:bg-yellow-green-400 text-raisin-black-100 font-bold py-2 px-4 rounded">
            Manage Projects
          </button>
          <button className="bg-yellow-green-500 hover:bg-yellow-green-400 text-raisin-black-100 font-bold py-2 px-4 rounded">
            Add New Project
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin;
