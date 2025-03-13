import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route>
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
