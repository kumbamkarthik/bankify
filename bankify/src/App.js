import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banking from "./components/DigitalBanking/Banking";
import Main from "./components/Main";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/digital" element={<Banking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
