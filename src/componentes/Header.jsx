import { Component } from "react";
import "./Stock.css";

class Header extends Component{
  render(){
    return (
      <header className="header">
        <div className="logo">MVDS</div>
        <a className="admin-link" href="#">
          ADMINISTRADOR
        </a>
      </header>
    );
  }
}
  


export default Header;
