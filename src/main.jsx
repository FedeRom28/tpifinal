import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginForm from './componentes/LoginForm.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginForm />
  </StrictMode>,
)
