import React from "react";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Onebox/Sidebar";
import OneboxHeader from "./components/Onebox/OneboxHeader";
import OneboxLanding from "./components/Onebox/OneboxLanding";
import Onebox from "./components/Onebox/Onebox";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onebox" element={<Onebox />} />
      </Routes>
    </Router>
  );
};

export default App;
