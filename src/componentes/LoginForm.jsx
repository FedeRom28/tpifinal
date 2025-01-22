import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom_admin: '',
      contraseña: '',
      error: '',
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    // Verifica si el usuario ya está logueado en sessionStorage
    if (sessionStorage.getItem('token')) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  iniciarSesion = (event) => {
    event.preventDefault();
    const { nom_admin, contraseña } = this.state;
    const datos = { nom_admin, contraseña };
    const url = "http://localhost:3000/api/admin/login";

    axios.post(url, datos)
      .then((response) => {
        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          this.setState({ isLoggedIn: true, error: '' });
        } else {
          this.setState({ error: 'Nombre de usuario o contraseña incorrectos' });
        }
      })
      .catch(() => {
        this.setState({ error: 'Nombre de usuario o contraseña incorrectos' });
      });
  };

  render() {
    const { nom_admin, contraseña, error, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Navigate to="/Inicio" />; // Redirige a la página de inicio
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.iniciarSesion}>
          <h2>Inicio de Sesión</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="nom_admin">Nombre de Usuario</label>
            <input
              type="text"
              id="nom_admin"
              name="nom_admin"
              value={nom_admin}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={contraseña}
              onChange={this.handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="login-button"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
