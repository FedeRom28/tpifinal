import React, { Component } from 'react';
import './Inicio.css';
class Inicio extends Component {
  state = {
    productos: [
      {
        id: 1,
        nombre: "REMERA OVER ESSENTIALS",
        precio: "$16.000",
        imagen: "ruta_a_la_imagen_1",
        stock: true,
      },
      {
        id: 2,
        nombre: "BUZO ESSENTIALS",
        precio: "$16.000",
        imagen: "ruta_a_la_imagen_2",
        stock: false,
      },
      {
        id: 3,
        nombre: "REMERA OVER DESGASTADA",
        precio: "$16.000",
        imagen: "ruta_a_la_imagen_3",
        stock: true,
      },
      {
        id: 4,
        nombre: "ZAPATILLAS PUMAS SUEDE XL",
        precio: "$65.000",
        imagen: "ruta_a_la_imagen_4",
        stock: true,
      },
    ],
  };

  render() {
    const { productos } = this.state;

    return (
      <div className="inicio-container">
        <aside className="categorias">
          <h3>Categorías principales</h3>
          <ul>
            <li>buzos</li>
            <li>remeras</li>
            <li>pantalones</li>
            <li>zapatillas</li>
          </ul>
          <div className="contacto">
            <i className="fas fa-phone-alt"></i>
          </div>
        </aside>

        <main className="productos">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img src={producto.imagen} alt={producto.nombre} />
              <h4>{producto.nombre}</h4>
              <p>{producto.precio}</p>
              {!producto.stock && <span className="sin-stock">SIN STOCK</span>}
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default Inicio;
