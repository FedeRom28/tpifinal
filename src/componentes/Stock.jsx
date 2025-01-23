// Stock.jsx

import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductTable from "./ProductTable";
import Modal from "./Modal";
import "./Stock.css";

class ComponenteStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      categorias: [],
      isModalOpen: false,
      isEditMode: false,
      nuevoProducto: {
        nom_producto: "",
        descripcion: "",
        precio: "",
        id_categorias: "",
      },
    };

    this.navigate = this.props.navigate;
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.navigate("/Stock");
      return;
    }
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos() {
    axios.get("http://localhost:3000/api/productos")
      .then((response) => this.setState({ productos: response.data }))
      .catch((error) => console.error("Error obteniendo productos:", error));
  }

  obtenerCategorias() {
    axios.get("http://localhost:3000/api/categorias")
      .then((response) => this.setState({ categorias: response.data }))
      .catch((error) => console.error("Error obteniendo categorías:", error));
  }

  abrirModal = () => this.setState({ isModalOpen: true });

  cerrarModal = () => this.setState({ isModalOpen: false, isEditMode: false });

  manejarCambioEntrada = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      nuevoProducto: { ...prevState.nuevoProducto, [name]: value },
    }));
  };

  agregarProductoAlStock = () => {
    axios.post("http://localhost:3000/api/productos", this.state.nuevoProducto)
      .then((response) => {
        this.setState((prevState) => ({
          productos: [...prevState.productos, response.data],
          isModalOpen: false,
        }));
      })
      .catch((error) => console.error("Error agregando producto:", error));
  }

  actualizarProducto = (id) => {
    axios.put(`http://localhost:3000/api/productos/${id}`, this.state.nuevoProducto)
      .then((response) => {
        this.setState((prevState) => ({
          productos: prevState.productos.map((producto) =>
            producto.id_producto === id ? response.data : producto
          ),
          isModalOpen: false,
        }));
      })
      .catch((error) => console.error("Error actualizando producto:", error));
  }

  eliminarProducto = (id) => {
    axios.delete(`http://localhost:3000/api/productos/${id}`)
      .then(() => {
        this.setState((prevState) => ({
          productos: prevState.productos.filter(
            (producto) => producto.id_producto !== id
          ),
        }));
      })
      .catch((error) => console.error("Error eliminando producto:", error));
  }

  render() {
    const { productos, categorias, isModalOpen, isEditMode, nuevoProducto } = this.state;
    return (
      <div className="stock-container">
        <main className="main-content">
          <button className="add-stock-button" onClick={this.abrirModal}>
            Agregar stock
          </button>
          <ProductTable
            products={productos}
            onEdit={(producto) => {
              this.setState({ isEditMode: true, nuevoProducto: producto });
              this.abrirModal();
            }}
            onDelete={(id) => this.eliminarProducto(id)}
          />
        </main>
        {isModalOpen && (
          <Modal
            product={nuevoProducto}
            categories={categorias}
            onChange={this.manejarCambioEntrada}
            onSubmit={isEditMode ? () => this.actualizarProducto(nuevoProducto.id_producto) : this.agregarProductoAlStock}
            onClose={this.cerrarModal}
          />
        )}
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
