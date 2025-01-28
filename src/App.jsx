import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./componentes/Header";
import Navbar from "./componentes/Navbar";
import ProductTable from "./componentes/ProductTable";
import Modal from "./componentes/Modal";
import LoginForm from "./componentes/LoginForm";
import Stock from './componentes/Stock';
import Inicio from './componentes/Inicio';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  render() {
    return (
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          
          {window.location.pathname !== '/LoginForm' ? <><Header/> <Navbar/></> : null}
      
          <main className="flex-grow-1 container my-4">
            <Routes>
              <Route path="/" element={<Navigate to="/LoginForm"/>} /> 
              <Route path="/LoginForm" element={<LoginForm />} />
              <Route path="/Productos" element={<Stock />} />
              <Route path="/Header" element={<Header />} /> 
              <Route path="/Inicio" element={<Inicio searchTerm={this.state.searchTerm} />} /> 
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
