import { useState } from 'react'
import './LoginForm.css'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Iniciando sesión con:', username, password)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <div className="logo-container">
            <span className="logo-text">MVDS</span>
          </div>
          <button className="button secondary">Iniciar como usuario</button>
        </div>

        <div className="login-right">
          <h2 className="login-title">Inicio de sesión de admin</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button type="submit" className="button primary">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  )
}
