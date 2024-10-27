import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className=" bg-raisin-black-2">
      <Navbar />

      <div className="flex flex-col  min-h-screen items-center justify-center mt-10">
        <h2 className="text-3xl font-bold text-buff-500 mb-6">Admin Login</h2>
        <div className="bg-raisin-black-600 rounded-lg shadow-lg p-6 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-buff-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-buff-500"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-buff text-white rounded hover:bg-yellow-green transition duration-300"
          >
            Login
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
