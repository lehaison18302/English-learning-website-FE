import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import Pronounce from "./pages/Pronounce";
import LoginPage from "./pages/Login";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />   
        <Route path="/pronounce" element={<Pronounce />} />
      </Routes>
    </div>
  );
}

export default App;
