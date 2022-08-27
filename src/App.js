import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import LandingPage from "./components/LandingPage/LandingPage";
import ListPage from "./components/ListPage/ListPage";
import Upload from "./components/Upload/Upload";

import { auth } from "./firebase";

import "./App.css";

function App() {

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // try auto login with navigation here by
        // directly redirectingto landing page!
      } else {
        // maybe loading screen or error screen!
      };
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/listpage" element={<ListPage />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;