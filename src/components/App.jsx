import React, { Component } from "react";
import Modal from "./Modal";
import "../styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], // Estado para almacenar productos
      categories: ["zapatillas", "remeras", "buzos", "pantalones"], // Categorías predefinidas
      isModalOpen: false,
      isEditMode: false, // Modo para diferenciar entre agregar y editar
      selectedProductIndex: null, // Índice del producto en edición
      newProduct: {
        name: "",
        size: "",
        color: "",
        code: "",
        quantity: "",
        category: "",
        description: ""
      }
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      isEditMode: false,
      selectedProductIndex: null,
      newProduct: {
        name: "",
        size: "",
        color: "",
        code: "",
        quantity: "",
        category: "",
        description: ""
      }
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newProduct: {
        ...prevState.newProduct,
        [name]: value
      }
    }));
  };

  addProductToStock = () => {
    if (this.state.isEditMode) {
      // Actualizar producto en modo de edición
      this.setState((prevState) => {
        const products = [...prevState.products];
        products[prevState.selectedProductIndex] = prevState.newProduct;
        return {
          products,
          isModalOpen: false,
          isEditMode: false,
          selectedProductIndex: null,
          newProduct: {
            name: "",
            size: "",
            color: "",
            code: "",
            quantity: "",
            category: "",
            description: ""
          }
        };
      });
    } else {
      // Agregar nuevo producto en modo de agregar
      this.setState((prevState) => ({
        products: [...prevState.products, prevState.newProduct],
        isModalOpen: false,
        newProduct: {
          name: "",
          size: "",
          color: "",
          code: "",
          quantity: "",
          category: "",
          description: ""
        }
      }));
    }
  };

  editProduct = (index) => {
    this.setState((prevState) => ({
      newProduct: { ...prevState.products[index] },
      isModalOpen: true,
      isEditMode: true,
      selectedProductIndex: index
    }));
  };

  deleteProduct = (index) => {
    this.setState((prevState) => ({
      products: prevState.products.filter((_, i) => i !== index)
    }));
  };

  addNewCategory = (newCategory) => {
    this.setState((prevState) => ({
      categories: [...prevState.categories, newCategory]
    }));
  };

  render() {
    return (
      <div className="app-container">
        <header className="header">
          <div className="logo">MVDS</div>
          <a className="admin-link" href="#">ADMINISTRADOR</a>
        </header>

        <nav className="navbar">
          <a href="#">INICIO</a>
          <a href="#">PRODUCTOS</a>
          <a href="#">CONTACTO</a>
          <a href="#">PREGUNTAS FRECUENTES</a>
          <a href="#">STOCK</a>
        </nav>

        <main className="main-content">
          <div className="stock-controls">
            <button className="add-stock-button" onClick={this.openModal}>Agregar stock</button>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Talle</th>
                <th>Color</th>
                <th>Código</th>
                <th>Cantidad</th>
                <th>Categoría</th>
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
                    <button onClick={() => this.editProduct(index)}>Editar</button>
                    <button onClick={() => this.deleteProduct(index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {this.state.isModalOpen && (
          <Modal
            product={this.state.newProduct}
            categories={this.state.categories}
            onChange={this.handleInputChange}
            onSubmit={this.addProductToStock}
            onAddCategory={this.addNewCategory}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
