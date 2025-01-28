import React, { Component } from "react";
import "./Stock.css";

class ProductTable extends Component{

  constructor(props){
    super(props);
  }

  getCategoriaNombre = (id_cat) => {
    const categoria = this.props.categorias.find(cat => cat.id_categorias === id_cat);
    return categoria ? categoria.nom_categoria : 'Desconocido';
  }

  render(){
    return(
      <table className="product-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.props.products.map((product) => 
          <tr key={product.id_productos}>
            <td>{product.nom_producto}</td>
            <td>{product.descripcion}</td>
            <td>{product.precio}</td>
            <td>{this.getCategoriaNombre(product.id_categorias)}</td>
            <td>
              {console.log({product})}
              <button onClick={() => this.props.onEdit(product)}>Editar</button>
              <button onClick={() => this.props.onDelete(product.id_productos)}>Eliminar</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    )
  }
}

export default ProductTable;