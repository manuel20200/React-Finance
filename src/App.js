import "./App.css";
import React, { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Header from "./components/layout/Header";
import Index from "./components/pages/index/Index";
import Buy from "./components/pages/buy/Buy";
import History from "./components/pages/history/History";
import Login from "./components/pages/login/Login";
import Quote from "./components/pages/quote/Quote";
import Register from "./components/pages/register/Register";
import Sell from "./components/pages/sell/Sell";

function App() {
  const [userName, setUserName] = useState(null);
  const [isLogging, setIsLogging] = useState(false);
  return (
    <div className="App">
      <AuthContext.Provider
        value={{ userName, setUserName, isLogging, setIsLogging }}
      >
        <Header></Header>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/buy" element={<Buy />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/quote" element={<Quote />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/sell" element={<Sell />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
