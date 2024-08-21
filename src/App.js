import React from "react";
import LandingPage from "./components/LandingPage";
import Onebox from "./components/Onebox/Onebox";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="font-whole">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onebox" element={<Onebox />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
