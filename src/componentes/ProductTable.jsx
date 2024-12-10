import React from "react";
import "./Stock.css";

const ProductTable = ({ products, onEdit, onDelete }) => (
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
      {products.map((product) => (
        <tr key={product.id_producto}>
          <td>{product.nom_producto}</td>
          <td>{product.descripcion}</td>
          <td>{product.precio}</td>
          <td>{product.id_categorias}</td>
          <td>
            <button onClick={() => onEdit(product)}>Editar</button>
            <button onClick={() => onDelete(product.id_producto)}>Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;
