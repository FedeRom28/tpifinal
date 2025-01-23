// Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">INICIO</Link>
    <Link to="/productos">PRODUCTOS</Link>
    <Link to="/contacto">CONTACTO</Link>
    <Link to="/preguntas-frecuentes">PREGUNTAS FRECUENTES</Link>
    <Link to="/stock">STOCK</Link>
  </nav>
);

export default Navbar;
