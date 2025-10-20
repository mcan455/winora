import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Raffles from "./pages/Raffles";
import Profile from "./pages/Profile";
import Winners from "./pages/Winners";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/raffles" element={<Raffles />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

