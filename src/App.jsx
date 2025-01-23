// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./componentes/Header";
import Navbar from "./componentes/Navbar";
import ProductTable from "./componentes/ProductTable";
import Modal from "./componentes/Modal";
import LoginForm from "./componentes/LoginForm";
import Stock from './componentes/Stock';
import Inicio from './componentes/Inicio';

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const manejarBusqueda = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <Header onSearch={manejarBusqueda} />
        <Navbar /> {/* Navbar se carga solo aquí */}
        
        <main className="flex-grow-1 container my-4">
          <Routes>
            <Route path="/" element={<Inicio searchTerm={searchTerm} />} /> 
            <Route path="/login" element={<LoginForm />} />
            <Route path="/modal" element={<Modal />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/productos" element={<ProductTable />} />
            <Route path="/contacto" element={<Modal />} /> 
            <Route path="/preguntas-frecuentes" element={<Header />} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
