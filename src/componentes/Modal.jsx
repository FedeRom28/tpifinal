import React from "react";
import "./Modal.css";

const Modal = ({ product, categories, onChange, onSubmit, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>{product.id_producto ? "Editar Producto" : "Agregar Producto"}</h2>
      <form>
        <label>
          Nombre:
          <input
            type="text"
            name="nom_producto"
            value={product.nom_producto}
            onChange={onChange}
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            name="descripcion"
            value={product.descripcion}
            onChange={onChange}
          />
        </label>
        <label>
          Precio:
          <input
            type="text"
            name="precio"
            value={product.precio}
            onChange={onChange}
          />
        </label>
        <label>
          Categoría:
          <select
            name="id_categorias"
            value={product.id_categorias}
            onChange={onChange}
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.id_categorias} value={category.id_categorias}>
                {category.nombre}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={onSubmit}>
          Guardar
        </button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  </div>
);

export default Modal;
