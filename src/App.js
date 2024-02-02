import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {Home} from "./components/Home/Home";
import {Register} from "./components/Home/Register";
import {Edit} from "./components/Home/Edit";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/edit" element={<Edit/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
