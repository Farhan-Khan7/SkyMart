import React from "react";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
       <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
};

export default App;
