import React from "react";
import "./Modal.css";

const Modal = ({ product, categories, onChange, onSubmit, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product.id_producto ? "Editar Producto" : "Agregar Producto"}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <label>
            Nombre:
            <input
              type="text"
              name="nom_producto"
              value={product.nom_producto}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              name="descripcion"
              value={product.descripcion}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              value={product.precio}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Categoría:
            <select
              name="id_categorias"
              value={product.id_categorias}
              onChange={onChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id_categoria} value={category.id_categoria}>
                  {category.nombre_categoria}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">{product.id_producto ? "Actualizar" : "Agregar"}</button>
          <button type="button" onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;