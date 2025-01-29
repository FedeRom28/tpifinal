import React, { Component } from 'react';
import './Inicio.css';
import axios from 'axios';
class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
    };
  }

  getProductos(){
    axios.get('http://localhost:3000/api/productos')
    .then(res=>{
      this.setState({productos: res.data.productos});
      console.log(res.data.productos);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  componentDidMount() {
    this.getProductos()
  }

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
              <img src={producto.imagen} alt={producto.nom_producto} />
              <h4>{producto.nom_producto}</h4>
              <p>$ {producto.precio}</p>
              {!producto.stock && <span className="sin-stock">SIN STOCK</span>}
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default Inicio;
