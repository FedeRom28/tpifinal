import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./componentes/Header";
import Navbar from "./componentes/Navbar";
import ProductTable from "./componentes/ProductTable";
import Modal from "./componentes/Modal";
import LoginForm from "./componentes/LoginForm";
import Stock from './componentes/Stock';



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
              <Header onSearch={this.handleSearch} />
              <Navbar />
              
              <main className="flex-grow-1 container my-4">
                <Routes>
                  <Route path="/" element={<Inicio searchTerm={this.state.searchTerm} />} />
                  <Route path="/LoginForm" element={<LoginForm/>} />
                  <Route path="/Modal" element={<Modal/>} />
                  <Route path="/Stock" element={<Stock />} />
                  <Route path="/Navbar" element={<Navbar/>} />
                  <Route path="/ProductTable" element={<ProductTable />} />
                  <Route path="/Header" element={<Header/>} /> 
                 
                </Routes>
              </main>
            </div>
        </Router>
            );
    }
}



export default App;