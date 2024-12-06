import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const [nom_admin, setNomAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNomAdminChange = (e) => {
    setNomAdmin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    axios
      .post('http://localhost:3000/api/admin', { nom_admin, password })
      .then((response) => {
        console.log('Inicio de sesión exitoso:', response.data);
        // Manejar lógica adicional, como redirección o cambio de estado global.
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Error al iniciar sesión');
        } else {
          setError('Ocurrió un error inesperado');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-form-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <p className="login-description">Ingresa tus credenciales de administrador</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom_admin" className="form-label">
              Nombre de Administrador
            </label>
            <input
              id="nom_admin"
              className="form-input"
              placeholder="Ingresa tu nombre de administrador"
              value={nom_admin}
              onChange={handleNomAdminChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
