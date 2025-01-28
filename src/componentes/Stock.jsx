// Stock.jsx

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
    console.log("Fetching products...");
    
    axios
      .get("http://localhost:3000/api/productos")
      .then((response) => this.setState({ products: response.data.productos }))
      .catch((error) => console.error("Error fetching products:", error));
  };

  fetchCategories = () => {
    console.log("Fetching categories...");
    
    axios
      .get("http://localhost:3000/api/categorias")
      .then((response) => {
        console.log(response.data);
        this.setState({ categories: response.data.categorias })
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  abrirModal=()=>{
    this.setState({ isModalOpen: true });
  }

  cerrarModal=()=>{
    this.setState({ isModalOpen: false, isEditMode: false });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    
    this.setState((prevState) => ({
      newProduct: { ...prevState.newProduct, [name]: value },
    }));
  };


  addProductToStock = () => {
    const product = this.state.newProduct;
    console.log(product);
    if(product.id_categorias=="" || product.nom_producto=="" || product.precio=="" || product.descripcion==""){
      return alert("Por favor complete todos los campos.");
    }
    else{
      const data={
        nom_producto: product.nom_producto,
        id_categorias: parseInt(product.id_categorias),
        precio: product.precio,
        descripcion: product.descripcion,
      }
      const config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
      axios
      .post("http://localhost:3000/api/productos", data, config)
      .then((response) => {
        this.setState({
          isModalOpen: false,
        })
        this.fetchProducts()
      })
      .catch((error) => console.error("Error adding product:", error));
    };
  }
    

  updateProduct = (id) => {
    const product = this.state.newProduct;
    console.log(product);
    if(product.id_categorias=="" || product.nom_producto=="" || product.precio=="" || product.descripcion==""){
      return alert("Por favor complete todos los campos.");
    }
    else{
      const config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
      const data={
        nom_producto: product.nom_producto,
        id_categorias: parseInt(product.id_categorias),
        precio: product.precio,
        descripcion: product.descripcion,
      }
      axios
      .put(`http://localhost:3000/api/productos/${id}`, data, config)
      .then((response) => {
        this.setState({
          isModalOpen: false,
        })
        this.fetchProducts()
      })
      .catch((error) => console.error("Error updating product:", error));
    }
  };

  deleteProduct = (id) => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    }
    console.log(id);
    
    axios
      .delete(`http://localhost:3000/api/productos/${id}`, config)
      .then(() => {
        this.fetchProducts()
      })
      .catch((error) => console.error("Error eliminando producto:", error));
  }

  modalEdit = (product) => {
    this.setState({ isModalOpen:true , isEditMode: true, newProduct: product }); 
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
            onEdit={(product) =>this.modalEdit(product)}
            onDelete={(id)=>this.deleteProduct(id)}
          />
        </main>
        {isModalOpen==true && 
          <Modal
            product={newProduct}
            categories={categories}
            handleChange={(e)=>this.handleInputChange(e)}
            onSubmit={
              isEditMode
                ? (id) => this.updateProduct(id)
                : this.addProductToStock
            }
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
