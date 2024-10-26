import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
const App = () => {
  return (
    <BrowserRouter>
        <ToastContainer />
        <AllRoutes />
    </BrowserRouter>
  );
};

export default App;
