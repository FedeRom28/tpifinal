import React, { Component } from "react";
import ProductTable from "./ProductTable";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Stock.css";

class ComponenteStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      sizes: [], // Para almacenar los talles
      stock: [], // Para almacenar el stock
      isModalOpen: false,
      isEditMode: false,
      newProduct: {
        id_productos: 0 || "", // Agregar el campo de id_productos
        nom_producto: "",
        id_categorias: 0 || "",
        precio: "",
        descripcion: "",
        imagen: null,
        id_talles: 0 || "", // Agregar el campo de id_talles
        cantidad: 0 || "", // Agregar el campo de cantidad
      },
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("token")) {
      this.fetchProducts();
      this.fetchCategories();
      this.fetchSizes(); // Llamar a la función para obtener los talles
      this.fetchStock(); // Llamar a la función para obtener el stock
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

  fetchSizes = () => {
    axios
      .get("http://localhost:3000/api/talles")
      .then((response) => this.setState({ sizes: response.data.talles }))
      .catch((error) => console.error("Error fetching sizes:", error));
  };

  fetchStock = () => {
    axios
      .get("http://localhost:3000/api/stock")
      .then((response) => this.setState({ stock: response.data.stock }))
      .catch((error) => console.error("Error fetching stock:", error));
  };

  abrirModal = () => {
    this.setState({ isModalOpen: true });
  };

  cerrarModal = () => {
    this.setState({ isModalOpen: false, isEditMode: false });
  };

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
    if (
      product.id_categorias === "" ||
      product.nom_producto === "" ||
      product.precio === "" ||
      product.descripcion === "" ||
      product.id_talles === "" ||
      product.cantidad === ""
    ) {
      return alert("Por favor complete todos los campos.");
    } else {
      const formData = new FormData();
      formData.append("nom_producto", product.nom_producto);
      formData.append("id_categorias", parseInt(product.id_categorias));
      formData.append("precio", product.precio);
      formData.append("descripcion", product.descripcion);
      formData.append("id_talles", parseInt(product.id_talles)); // Agregar id_talles
      formData.append("cantidad", parseInt(product.cantidad)); // Agregar cantidad
      if (product.imagen) {
        formData.append("imagen", product.imagen);
      }

      const config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          'Content-Type': 'multipart/form-data',
        },
      };

      axios
        .post("http://localhost:3000/api/productos", formData, config)
        .then((response) => {
          // Insertar stock después de agregar el producto
          const id_productos = response.data.id_productos; // Suponiendo que el ID del producto agregado se devuelve en la respuesta
          const stockData = {
            id_productos,
            cantidad: product.cantidad,
            id_talles: product.id_talles,
          };
          axios
            .post("http://localhost:3000/api/stock", stockData, config)
            .then(() => {
              this.setState({ isModalOpen: false });
              this.fetchProducts();
              this.fetchStock();
            })
            .catch((error) =>
              console.error("Error adding stock:", error)
            );
        })
        .catch((error) => console.error("Error adding product:", error));
    }
  };

  updateProduct = () => {
    const product = this.state.newProduct;
    if (
      product.id_categorias === "" ||
      product.nom_producto === "" ||
      product.precio === "" ||
      product.descripcion === "" ||
      product.id_talles === "" ||
      product.cantidad === ""
    ) {
      return alert("Por favor complete todos los campos.");
    } else {
      const formData = new FormData();
      formData.append("nom_producto", product.nom_producto);
      formData.append("id_categorias", parseInt(product.id_categorias));
      formData.append("precio", product.precio);
      formData.append("descripcion", product.descripcion);
      formData.append("id_talles", parseInt(product.id_talles)); // Agregar id_talles
      formData.append("cantidad", parseInt(product.cantidad)); // Agregar cantidad
      if (product.imagen) {
        formData.append("imagen", product.imagen);
      }

      const config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          'Content-Type': 'multipart/form-data',
        },
      };

      axios
        .put(
          `http://localhost:3000/api/productos/${product.id_productos}`,
          formData,
          config
        )
        .then((response) => {
          // Actualizar stock después de actualizar el producto
          const stockData = {
            id_productos: product.id_productos,
            cantidad: product.cantidad,
            id_talles: product.id_talles,
          };
          axios
            .put(`http://localhost:3000/api/stock/${product.id_stock}`, stockData, config)
            .then(() => {
              this.setState({ isModalOpen: false });
              this.fetchProducts();
              this.fetchStock();
            })
            .catch((error) =>
              console.error("Error updating stock:", error)
            );
        })
        .catch((error) => console.error("Error updating product:", error));
    }
  };

  deleteProduct = (id_productos, id_stock) => {
    axios
      .delete(`http://localhost:3000/api/productos/${id_productos}`)
      .then(() => {
        // Eliminar stock después de eliminar el producto
        axios
          .delete(`http://localhost:3000/api/stock/${id_stock}`)
          .then(() => {
            this.fetchProducts();
            this.fetchStock();
          })
          .catch((error) =>
            console.error("Error deleting stock:", error)
          );
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  modalEdit = (product) => {
    this.setState({
      isModalOpen: true,
      isEditMode: true,
      newProduct: {
        ...product,
        id_stock: product.id_stock || "", // Asegurarse de que `id_stock` esté incluido
        cantidad: product.cantidad || "", // Asegurarse de que `cantidad` esté incluido
      },
    });
  };

  render() {
    const { products, categories, sizes, stock, isModalOpen, isEditMode, newProduct } = this.state;
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
            onDelete={(id_productos, id_stock) => this.deleteProduct(id_productos, id_stock)}
          />
        </main>
        {isModalOpen && (
          <Modal
            product={newProduct}
            categories={categories}
            sizes={sizes}
            handleChange={(e) => this.handleInputChange(e)}
            handleFileChange={(e) => this.handleFileChange(e)}
            onSubmit={isEditMode ? this.updateProduct : this.addProductToStock} // Pasar directamente la función
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
};

export default Stock;