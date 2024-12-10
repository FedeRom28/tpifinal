import React, { Component } from "react";
import axios from "axios";
import Modal from "./Modal";


import "./App.css";

class App extends Component {
  state = {
    products: [],
    categories: [],
    isModalOpen: false,
    isEditMode: false,
    newProduct: {
      nom_producto: "",
      descripcion: "",
      precio: "",
      id_categorias: "",
    },
  };

  componentDidMount() {
    // Verifica si hay un token antes de continuar
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/'); // Redirige a login si no hay token
    }
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts = () => {
    axios
      .get("http://localhost:3000/api/productos")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  fetchCategories = () => {
    axios
      .get("http://localhost:3000/api/categorias")
      .then((response) => {
        this.setState({ categories: response.data });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newProduct: {
        ...prevState.newProduct,
        [name]: value,
      },
    }));
  };

  addProductToStock = () => {
    axios
      .post("http://localhost:3000/api/productos", this.state.newProduct)
      .then((response) => {
        this.setState((prevState) => ({
          products: [...prevState.products, response.data],
          isModalOpen: false,
        }));
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  updateProduct = (id) => {
    axios
      .put(`http://localhost:3000/api/productos/${id}`, this.state.newProduct)
      .then((response) => {
        this.setState((prevState) => ({
          products: prevState.products.map((product) =>
            product.id_producto === id ? response.data : product
          ),
          isModalOpen: false,
        }));
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/api/productos/${id}`)
      .then(() => {
        this.setState((prevState) => ({
          products: prevState.products.filter((product) => product.id_producto !== id),
        }));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  render() {
    const { products, categories, isModalOpen, isEditMode, newProduct } = this.state;

    return (
      <div className="app-container">
        <header className="header">
          <div className="logo">MVDS</div>
          <a className="admin-link" href="#">
            ADMINISTRADOR
          </a>
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
            <button className="add-stock-button" onClick={this.openModal}>
              Agregar stock
            </button>
          </div>

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
                    <button
                      onClick={() => {
                        this.setState({ isEditMode: true, newProduct: product });
                        this.openModal();
                      }}
                    >
                      Editar
                    </button>
                    <button onClick={() => this.deleteProduct(product.id_producto)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {isModalOpen && (
          <Modal
            product={newProduct}
            categories={categories}
            onChange={this.handleInputChange}
            onSubmit={isEditMode ? () => this.updateProduct(newProduct.id_producto) : this.addProductToStock}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default Stock;
