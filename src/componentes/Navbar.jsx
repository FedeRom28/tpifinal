import React from "react";
import { NavLink } from "react-router-dom";
import "./Stock.css";

const Navbar = () => (
  <nav className="navbar">
    <NavLink to="/Inicio">INICIO</NavLink>
    <NavLink to="/Inicio">CONTACTO</NavLink>
    <NavLink to="/Inicio">PREGUNTAS FRECUENTES</NavLink>
    <NavLink to="/Productos">PRODUCTOS</NavLink>
  </nav>
);

export default Navbar;
