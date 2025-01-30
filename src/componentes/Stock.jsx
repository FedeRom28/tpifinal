import React, { Component } from "react";
import ProductTable from "./ProductTable";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Stock.css";

class ComponenteStock extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      categories: [],
      isModalOpen: false,
      isEditMode: false,
      newProduct: {
        nom_producto: "",
        id_categorias: 0 || "",
        precio: "",
        descripcion: "",
        imagen: null,
      },
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem("token")) {
      this.fetchProducts();
      this.fetchCategories();
    }
  }

  fetchProducts = () => {
    axios
      .get("http://localhost:3000/api/productos")
      .then((response) => this.setState({ products: response.data.productos }))
      .catch((error) => console.error("Error fetching products:", error));
  };

  fetchCategories = () => {
    axios
      .get("http://localhost:3000/api/categorias")
      .then((response) => this.setState({ categories: response.data.categorias }))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  abrirModal = () => {
    this.setState({ isModalOpen: true });
  }

  cerrarModal = () => {
    this.setState({ isModalOpen: false, isEditMode: false });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newProduct: { ...prevState.newProduct, [name]: value },
    }));
  };

  handleFileChange = (e) => {
    const { name, files } = e.target;
    this.setState((prevState) => ({
      newProduct: { ...prevState.newProduct, [name]: files[0] },
    }));
  };

  addProductToStock = () => {
    const product = this.state.newProduct;
    if (product.id_categorias === "" || product.nom_producto === "" || product.precio === "" || product.descripcion === "") {
      return alert("Por favor complete todos los campos.");
    } else {
      const formData = new FormData();
      formData.append("nom_producto", product.nom_producto);
      formData.append("id_categorias", parseInt(product.id_categorias));
      formData.append("precio", product.precio);
      formData.append("descripcion", product.descripcion);
      if (product.imagen) {
        formData.append("imagen", product.imagen);
      }

      const config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          'Content-Type': 'multipart/form-data',
        },
      };

      axios.post("http://localhost:3000/api/productos", formData, config)
        .then((response) => {
          this.setState({ isModalOpen: false });
          this.fetchProducts();
        })
        .catch((error) => console.error("Error adding product:", error));
    }
  };

  updateProduct = (id) => {
    const product = this.state.newProduct;
    if (product.id_categorias === "" || product.nom_producto === "" || product.precio === "" || product.descripcion === "") {
      return alert("Por favor complete todos los campos.");
    } else {
      const formData = new FormData();
      formData.append("nom_producto", product.nom_producto);
      formData.append("id_categorias", parseInt(product.id_categorias));
      formData.append("precio", product.precio);
      formData.append("descripcion", product.descripcion);
      if (product.imagen) {
        formData.append("imagen", product.imagen);
      }

      const config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          'Content-Type': 'multipart/form-data',
        },
      };

      axios.put(`http://localhost:3000/api/productos/${id}`, formData, config)
        .then((response) => {
          this.setState({ isModalOpen: false });
          this.fetchProducts();
        })
        .catch((error) => console.error("Error updating product:", error));
    }
  };

  deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/api/productos/${id}`)
      .then(() => {
        this.fetchProducts();
      })
      .catch((error) => console.error("Error deleting product:", error));
  }

  modalEdit = (product) => {
    this.setState({ isModalOpen: true, isEditMode: true, newProduct: product });
  }

  render() {
    const { products, categories, isModalOpen, isEditMode, newProduct } = this.state;
    return (
      <div className="stock-container">
        <main className="main-content">

          <button className="add-stock-button" onClick={this.abrirModal}>
            Agregar Producto
          </button>
          <ProductTable
            products={products}
            categorias={categories}
            onEdit={(product) => this.modalEdit(product)}
            onDelete={(id) => this.deleteProduct(id)}
          />
        </main>
        {isModalOpen && 
          <Modal
            product={newProduct}
            categories={categories}
            handleChange={(e) => this.handleInputChange(e)}
            handleFileChange={(e) => this.handleFileChange(e)}
            onSubmit={isEditMode ? (id) => this.updateProduct(id) : this.addProductToStock}
            onClose={this.cerrarModal}
          />
        }
      </div>
    );
  }
}

// Función envolvente para pasar navigate a un componente de clase
const Stock = (props) => {
  const navigate = useNavigate();
  return <ComponenteStock {...props} navigate={navigate} />;
}

export default Stock;
