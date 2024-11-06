import React from "react";
import Modal from "./Modal";

class Inventory extends React.Component {
  state = {
    products: [],
    currentProduct: { name: "", size: "", color: "", code: "", quantity: "", category: "", image: "" },
    categories: ["zapatillas", "remeras", "buzos", "pantalones"],
    isModalOpen: false,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      currentProduct: { ...prevState.currentProduct, [name]: value },
    }));
  };

  handleImageChange = (imageUrl) => {
    this.setState((prevState) => ({
      currentProduct: { ...prevState.currentProduct, image: imageUrl },
    }));
  };

  addOrEditProduct = () => {
    this.setState((prevState) => {
      const products = [...prevState.products];
      const index = products.findIndex((p) => p.code === prevState.currentProduct.code);
      if (index > -1) {
        products[index] = prevState.currentProduct;
      } else {
        products.push(prevState.currentProduct);
      }
      return {
        products,
        currentProduct: { name: "", size: "", color: "", code: "", quantity: "", category: "", image: "" },
        isModalOpen: false,
      };
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Agregar Producto</button>

        {this.state.isModalOpen && (
          <Modal
            product={this.state.currentProduct}
            categories={this.state.categories}
            onChange={this.handleInputChange}
            onImageChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                this.handleImageChange(imageUrl);
              }
            }}
            onSubmit={this.addOrEditProduct}
            onClose={this.closeModal}
          />
        )}

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Talle</th>
              <th>Color</th>
              <th>Código</th>
              <th>Cantidad</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.size}</td>
                <td>{product.color}</td>
                <td>{product.code}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  {product.image && <img src={product.image} alt={product.name} width="50" height="50" />}
                </td>
                <td>
                  {/* Buttons for editing and deleting would go here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Inventory;
