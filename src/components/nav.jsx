import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container flex space-x-4">
          <Link className="nav-link" to="#">INICIO</Link>
          <Link className="nav-link" to="#">PRODUCTOS</Link>
          <Link className="nav-link" to="#">CONTACTO</Link>
          <Link className="nav-link" to="#">PREGUNTAS FRECUENTES</Link>
          <Link className="nav-link" to="#">STOCK</Link>
        </div>
      </nav>
    );
  }
}

export default Nav;
