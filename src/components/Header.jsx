import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container flex justify-between items-center">
          <div className="logo">MVDS</div>
          <Link className="nav-link" to="#">
            ADMINISTRADOR
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;