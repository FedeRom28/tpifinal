import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de cierre de sesión, como limpiar el estado de autenticación
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/">INICIO</Link>
      <Link to="/productos">PRODUCTOS</Link>
      <Link to="/contactos">CONTACTOS</Link>
      <Link to="/preguntas-frecuentes">PREGUNTAS FRECUENTES</Link>
      <Link to="/stock">STOCK</Link>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
    </nav>
  );
}

export default Navbar;
