import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import PronouncePage from "./pages/PronouncePage";
import Task from "./pages/Task";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />   
        <Route path="/pronounce" element={<PronouncePage />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
