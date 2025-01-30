import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { product, categories, handleChange, handleFileChange, onSubmit, onClose } = this.props;
   
    return(
      <div className="modal">
        <div className="modal-content">
          <h2>{product.id_producto ? "Editar Producto" : "Agregar Producto"}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(product.id_producto);
          }}>
            <label>
              Nombre:
              <input
                type="text"
                name="nom_producto"
                value={product.nom_producto}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label>
              Descripción:
              <input
                type="text"
                name="descripcion"
                value={product.descripcion}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label>
              Precio:
              <input
                type="text"
                name="precio"
                value={product.precio}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label>
              Categoría:
              <select
                name="id_categorias"
                value={product.id_categorias || ""}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                  <option
                    key={category.id_categorias}
                    value={category.id_categorias}
                    defaultValue={product.id_producto ? category.id_categorias === product.id_categorias : false}
                  >
                    {category.nom_categoria}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Imagen:
              <input
                type="file"
                name="imagen"
                onChange={(e) => handleFileChange(e)}
              />
            </label>
            <button type="submit">
              Guardar
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Modal;
