// Contactos.jsx

import React, { useState } from "react";
import { Mail, Instagram, Phone } from "lucide-react";
import './Contactos.css';

export function Contactos() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contenedor">
      {/* Información de contacto */}
      <div className="w-full md:w-1/3 espacio-y-6">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5" />
          <a href="mailto:Mvdsclothes@gmail.com" className="hover:underline">
            Mvdsclothes@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Instagram className="h-5 w-5" />
          <span>Seguinos en Instagram</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5" />
          <a href="tel:2901581602" className="hover:underline">
            2901581602
          </a>
        </div>
      </div>

      {/* Formulario de contacto */}
      <div className="w-full md:w-2/3">
        <form onSubmit={handleSubmit} className="espacio-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
              className="bg-gris-100 borde-0"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-gris-100 borde-0"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              required
              className="bg-gris-100 borde-0"
            /> 
          </div>
          <button type="submit" className="w-full">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
Contactos.jsx