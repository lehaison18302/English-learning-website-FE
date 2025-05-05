import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import Pronounce from "./pages/Pronounce";
import Task from "./pages/Task";
import LoginPage from "./pages/Login";
import { Route, Routes } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />   
        <Route path="/pronounce" element={<Pronounce />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </div>
  );
}

export default App;
