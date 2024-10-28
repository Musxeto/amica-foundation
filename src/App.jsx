import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import { AuthProvider } from "./contexts/AuthContext";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className="bg-raisin-black-2">
            <ToastContainer />
            <AllRoutes />
          </div>
        </Worker>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
