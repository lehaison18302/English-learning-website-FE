import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import Pronounce from "./pages/Pronounce";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/pronounce" element={<Pronounce />} />
      </Routes>
    </div>
  );
}

export default App;
