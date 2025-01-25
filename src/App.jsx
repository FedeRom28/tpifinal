import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./componentes/Header";
import Navbar from "./componentes/Navbar";
import ProductTable from "./componentes/ProductTable";
import Modal from "./componentes/Modal";
import Stock from './componentes/Stock';
import Inicio from './componentes/Inicio';
import Contactos from './componentes/Contactos'; // Importa el componente Contactos
import Preguntas from './componentes/Preguntas'; // Importa el componente Preguntas
import LoginForm from './componentes/LoginForm';

const App = () => {
  const location = useLocation();

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Renderizar Header y Navbar solo si no estamos en la ruta de login */}
      {location.pathname !== '/login' && <Header />}
      {location.pathname !== '/login' && <Navbar />}
      
      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Modal" element={<Modal />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/ProductTable" element={<ProductTable />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/contactos" element={<Contactos />} /> 
          <Route path="/preguntas-frecuentes" element={<Preguntas />} />
        </Routes>
      </main>
    </div>
  );
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
