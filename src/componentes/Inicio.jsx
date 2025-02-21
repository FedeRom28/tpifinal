import React, { Component } from 'react';
import './Inicio.css';
import axios from 'axios';

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      categorias: [],
      categoriaSeleccionada: 'all',
    };
  }

  componentDidMount() {
    this.getProductos();
    this.getCategorias();
  }

  getProductos() {
    axios.get('http://localhost:3000/api/productos')
      .then(res => {
        this.setState({ productos: res.data.productos });
        console.log(res.data.productos);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCategorias() {
    axios.get('http://localhost:3000/api/categorias')
      .then(res => {
        this.setState({ categorias: res.data.categorias });
        console.log(res.data.categorias);
      })
      .catch(err => {
        console.log(err);
      });
  }

  setCategoriaSeleccionada = (categoria) => {
    this.setState({ categoriaSeleccionada: categoria });
  }

  render() {
    const { productos, categorias, categoriaSeleccionada } = this.state;

    // Filtrar los productos según la categoría seleccionada
    const productosFiltrados = categoriaSeleccionada === 'all'
      ? productos
      : productos.filter(producto => producto.id_categorias === categoriaSeleccionada);

    return (
      <div className="inicio-container">
        <aside className="categorias">
          <h3>Categorías principales</h3>
          <ul>
            <li>
              <button onClick={() => this.setCategoriaSeleccionada('all')}>Todos</button>
            </li>
            {categorias.map((categoria) => (
              <li key={categoria.id_categorias}>
                <button onClick={() => this.setCategoriaSeleccionada(categoria.id_categorias)}>
                  {categoria.nom_categoria}
                </button>
              </li>
            ))}
          </ul>
          <div className="contacto">
            <i className="fas fa-phone-alt"></i>
          </div>
        </aside>

        <main className="productos">
          {productosFiltrados.map((producto) => (
            <div key={producto.id_productos} className="producto-card">
              {producto.imagen && <img src={`http://localhost:3000/uploads/${producto.imagen}`} alt={producto.nom_producto} />}
              <h4>{producto.nom_producto}</h4>
              <p>$ {producto.precio}</p>
              {producto.cantidad > 0 ? (
                <span className="disponible">DISPONIBLE</span>
              ) : (
                <span className="sin-stock">SIN STOCK</span>
              )}
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default Inicio;
