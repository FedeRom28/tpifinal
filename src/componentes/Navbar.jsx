import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el estado de autenticación
    sessionStorage.removeItem('token');
    navigate('/'); // Redirigir a la página de login
  };

  return (
    <nav className="navbar">
      <Link to="/inicio">INICIO</Link>
      <Link to="/productos">PRODUCTOS</Link>
      <Link to="/contactos">CONTACTOS</Link>
      <Link to="/preguntas-frecuentes">PREGUNTAS FRECUENTES</Link>
      <Link to="/stock">STOCK</Link>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
    </nav>
  );
}

export default Navbar;
