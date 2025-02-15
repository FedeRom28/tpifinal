import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  handleQuantityChange = (e) => {
    const { name, value } = e.target;
    const { product, handleChange } = this.props;

    // Lógica para seleccionar automáticamente un talle al ingresar una cantidad
    if (name === "cantidad" && value > 0 && product.id_talles === "") {
      // Suponiendo que el primer talle en la lista sea el predeterminado
      const defaultTalle = this.props.sizes[0]?.id_talles || "";
      handleChange({ target: { name: "id_talles", value: defaultTalle } });
    }

    handleChange(e);
  }

  render() {
    const { product, categories, sizes, handleChange, handleFileChange, onSubmit, onClose } = this.props;

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{product.id_productos ? "Editar Producto" : "Agregar Producto"}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(product.id_productos); // Asegurarse de pasar el id_productos al método onSubmit
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
                    defaultValue={product.id_productos ? category.id_categorias === product.id_categorias : false}
                  >
                    {category.nom_categoria}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Talle:
              <select
                name="id_talles"
                value={product.id_talles || ""}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Seleccione un talle</option>
                {sizes.map((size) => (
                  <option
                    key={size.id_talles}
                    value={size.id_talles}
                    defaultValue={product.id_productos ? size.id_talles === product.id_talles : false}
                  >
                    {size.nom_talles}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                name="cantidad"
                value={product.cantidad}
                onChange={(e) => this.handleQuantityChange(e)}
              />
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
    );
  }
}

export default Modal;
