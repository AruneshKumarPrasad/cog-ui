import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import LandingPage from "./components/LandingPage/LandingPage";
import ListPage from "./components/ListPage/ListPage";
import Upload from "./components/Upload/Upload";

import { auth } from "./firebase";

import "./App.css";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landingpage" element={<LandingPage name={userName} />} />
          <Route path="/listpage" element={<ListPage />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;