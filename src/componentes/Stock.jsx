import React, { Component } from "react";
import axios from "axios";
import "./Stock.css";

class Stock extends Component {
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
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/");
    }
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts = () => {
    axios
      .get("http://localhost:3000/api/productos")
      .then((response) => this.setState({ products: response.data }))
      .catch((error) => console.error("Error fetching products:", error));
  };

  fetchCategories = () => {
    axios
      .get("http://localhost:3000/api/categorias")
      .then((response) => this.setState({ categories: response.data }))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false, isEditMode: false });

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newProduct: { ...prevState.newProduct, [name]: value },
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
      .catch((error) => console.error("Error adding product:", error));
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
      .catch((error) => console.error("Error updating product:", error));
  };

  deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/api/productos/${id}`)
      .then(() => {
        this.setState((prevState) => ({
          products: prevState.products.filter(
            (product) => product.id_producto !== id
          ),
        }));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  render() {
    const { products, categories, isModalOpen, isEditMode, newProduct } = this.state;

    return (
      <div className="stock-container">
        <Header />
        <Navbar />
        <main className="main-content">
          <button className="add-stock-button" onClick={this.openModal}>
            Agregar stock
          </button>
          <ProductTable
            products={products}
            onEdit={(product) =>
              this.setState({ isEditMode: true, newProduct: product }, this.openModal)
            }
            onDelete={this.deleteProduct}
          />
        </main>
        {isModalOpen && (
          <Modal
            product={newProduct}
            categories={categories}
            onChange={this.handleInputChange}
            onSubmit={
              isEditMode
                ? () => this.updateProduct(newProduct.id_producto)
                : this.addProductToStock
            }
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default Stock;
