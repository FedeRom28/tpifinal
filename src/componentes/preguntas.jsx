// Preguntas.jsx

import React, { useState } from 'react';
import './Preguntas.css';

function Preguntas() {
  const [indiceActivo, setIndiceActivo] = useState(null);

  const toggleOcultarMostrar = (indice) => {
    setIndiceActivo(indiceActivo === indice ? null : indice);
  };

  return (
    <div className="preguntas-contenedor">
      <h1 className="preguntas-titulo">Preguntas Frecuentes</h1>
      <div className="ocultar-mostrar">
        <div className={`ocultar-mostrar-item ${indiceActivo === 0 ? 'activo' : ''}`} onClick={() => toggleOcultarMostrar(0)}>
          <div className="ocultar-mostrar-trigger">¿Cuál es el tiempo de entrega?</div>
          <div className="ocultar-mostrar-contenido">
            El tiempo de entrega estándar es de 3 a 5 días hábiles. Para zonas remotas, puede tomar hasta 7 días hábiles.
          </div>
        </div>
        <div className={`ocultar-mostrar-item ${indiceActivo === 1 ? 'activo' : ''}`} onClick={() => toggleOcultarMostrar(1)}>
          <div className="ocultar-mostrar-trigger">¿Cómo puedo realizar un cambio o devolución?</div>
          <div className="ocultar-mostrar-contenido">
            Puedes solicitar un cambio o devolución dentro de los 30 días posteriores a la compra. El producto debe estar sin usar y en su empaque original.
          </div>
        </div>
        <div className={`ocultar-mostrar-item ${indiceActivo === 2 ? 'activo' : ''}`} onClick={() => toggleOcultarMostrar(2)}>
          <div className="ocultar-mostrar-trigger">¿Ofrecen envío gratuito?</div>
          <div className="ocultar-mostrar-contenido">
            Sí, ofrecemos envío gratuito en compras superiores a $50.000.
          </div>
        </div>
        <div className={`ocultar-mostrar-item ${indiceActivo === 3 ? 'activo' : ''}`} onClick={() => toggleOcultarMostrar(3)}>
          <div className="ocultar-mostrar-trigger">¿Cuáles son las formas de pago aceptadas?</div>
          <div className="ocultar-mostrar-contenido">
            Aceptamos tarjetas de crédito, débito, transferencias bancarias y PayPal.
          </div>
        </div>
        <div className={`ocultar-mostrar-item ${indiceActivo === 4 ? 'activo' : ''}`} onClick={() => toggleOcultarMostrar(4)}>
          <div className="ocultar-mostrar-trigger">¿Tienen tiendas físicas?</div>
          <div className="ocultar-mostrar-contenido">
            Sí, contamos con tiendas físicas en las principales ciudades. Puedes encontrar la ubicación más cercana en nuestra sección de 'Tiendas'.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preguntas;
