import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Admin Panel</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/crud">Manage Items</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
