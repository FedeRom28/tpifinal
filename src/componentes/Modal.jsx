import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { product, categories, onChange, onSubmit, onClose } = this.props;
   
    return(
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
                onChange={(e)=>onChange(e)}
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                  <option
                    key={category.id_categorias} 
                    value={category.id_categorias}
                    defaultValue={product.id_producto? category.id_categorias === product.id_categorias : false}
                  >
                    {category.nom_categoria}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={()=>onSubmit(product.id_productos)}>
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
