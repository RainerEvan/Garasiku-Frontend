import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Welcome from "./pages/welcome";
import CrudPage from "./pages/Crudpage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/crud" element={<CrudPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
