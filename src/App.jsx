<<<<<<< HEAD
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./componentes/Header";
import Navbar from "./componentes/Navbar";
import Stock from './componentes/Stock';
import Inicio from './componentes/Inicio';
import Contactos from './componentes/Contactos';
import Preguntas from './componentes/Preguntas'; 
import LoginForm from './componentes/LoginForm';

const App = () => {
  const location = useLocation();
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Renderizar Header y Navbar solo si no estamos en la ruta de login */}
      {location.pathname !== '/' && <Header />}
      {location.pathname !== '/' && <Navbar />}
      
      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/header" element={<Header />} /> 
          <Route path="/inicio" element={<Inicio/>} /> 
          <Route path="/contactos" element={<Contactos />} /> 
          <Route path="/preguntas-frecuentes" element={<Preguntas />} />
        </Routes>
      </main>
      
    </div>
  )
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
>>>>>>> 99fd0a15a98e17c41e9583bb11abb93536752ebf
