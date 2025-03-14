import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banking from "./components/DigitalBanking/Banking";
import Main from "./components/Main";
import Login from "./components/Login";
import { AuthProvider } from "./AuthProvider";
import UserAccounts from "./components/Accounts/UserAccounts";
import AppContext from "./AppContext";
import Services from "./components/AccountServices/Services";
import Payments from './components/Payments/Payments';
import Wealth from "./components/Wealth/Wealth";

function App() {

  const [accounts, setAccounts] = useState([]);

  return (
    <AppContext.Provider value={{accounts, setAccounts}}>
    <AuthProvider>
      <div className="App">
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/wealth" element={<Wealth />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/services" element={<Services />} />
              <Route path="/digital" element={<Banking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/accounts" element={<UserAccounts />} />
              <Route path="/" element={<Main />} />
            </Routes>
          </div>
        </Router>
      </div>
    </AuthProvider>
    </AppContext.Provider>
  );
}

export default App;
