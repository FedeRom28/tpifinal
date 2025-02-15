import React, { Component } from "react";
import "./Stock.css";

class ProductTable extends Component {
  constructor(props) {
    super(props);
  }

  getCategoriaNombre = (id_cat) => {
    const categoria = this.props.categorias.find((cat) => cat.id_categorias === id_cat);
    return categoria ? categoria.nom_categoria : "Desconocido";
  };

  getTalleNombre = (id) => {
    const talle = this.props.sizes.find((talle) => talle.id_talles === id);
    console.log(talle);
    return talle ? talle.nom_talles : "Desconocido";
  };

  render() {
    return (
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Talle</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product) => {
            const estado = product.cantidad > 0 ? "En stock" : "Sin stock";
            return (
              <tr key={product.id_productos}>
                <td>{product.nom_producto}</td>
                <td>{product.descripcion}</td>
                <td>{product.precio}</td>
                <td>{this.getCategoriaNombre(product.id_categorias)}</td>
                <td>{this.getTalleNombre(product.id_talles)}</td>
                <td>{product.cantidad}</td>
                <td>{estado}</td>
                <td>
                  <button onClick={() => this.props.onEdit(product)}>Editar</button>
                  <button onClick={() => this.props.onDelete(product.id_productos)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ProductTable;
