import React, { Component } from 'react';
import axios from 'axios';
import './LoginForm.css';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom_admin: '',
      contraseña: '',
      error: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: '' });

    console.log('Datos del formulario:', {
      nom_admin: this.state.nom_admin,
      contraseña: this.state.contraseña,
    });

    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', {
        nom_admin: this.state.nom_admin,
        contraseña: this.state.contraseña,
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.data.status === 'ok') {
        const { token } = response.data;
        localStorage.setItem('token', token);
        alert('Inicio de sesión exitoso');
        this.props.navigate('/dashboard'); // Usar navigate para redirigir a /dashboard
      }
    } catch (err) {
      console.error('Error en la solicitud:', err);
      this.setState({ error: 'Nombre de usuario o contraseña incorrectos.' });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h2>Inicio de Sesión</h2>
          {this.state.error && <p className="error-message">{this.state.error}</p>}
          <div className="form-group">
            <label htmlFor="nom_admin">Nombre de Usuario</label>
            <input
              type="text"
              id="nom_admin"
              value={this.state.nom_admin}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              value={this.state.contraseña}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    );
  }
}


export default LoginForm
