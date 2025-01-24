// Contactos.jsx

import React from "react";
import { Mail, Instagram, Phone } from "lucide-react";
import './Contactos.css';

function Contactos() {
  return (
    <div className="contenedor">
      {/* Información de contacto */}
      <div className="w-full md-w-1-3 espacio-y-6">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5" />
          <a href="mailto:Mvdsclothes@gmail.com" className="hover-underline">
            Mvdsclothes@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Instagram className="h-5 w-5" />
          <span>Seguinos en Instagram</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5" />
          <a href="tel:2901581602" className="hover-underline">
            2901581602
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contactos; 
