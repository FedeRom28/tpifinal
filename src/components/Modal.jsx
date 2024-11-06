import React from "react";
import "../Modal.css";

class Modal extends React.Component {
  handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.props.onImageChange(imageUrl); // Llama a la función de cambio de imagen
    }
  };

  render() {
    const { product, categories, onChange, onSubmit, onClose } = this.props;

    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>{product.name ? "Editar Producto" : "Agregar Producto"}</h2>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            placeholder="Nombre del producto"
          />
          <select name="size" value={product.size} onChange={onChange}>
            <option value="">Seleccione Talle</option>
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={onChange}
            placeholder="Color"
          />
          <input
            type="text"
            name="code"
            value={product.code}
            onChange={onChange}
            placeholder="Código de producto"
          />
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={onChange}
            placeholder="Cantidad"
          />
          <select name="category" value={product.category} onChange={onChange}>
            <option value="">Seleccione Categoría</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
            placeholder="Descripción"
          />
          <input
            type="file"
            accept="image/*"
            onChange={this.handleImageChange}
          />
          <button onClick={onSubmit}>Guardar Producto</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    );
  }
}

export default Modal;
