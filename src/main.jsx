import React from 'react';
import Stock from './Stock'; // Tu componente principal
import LoginForm from './componentes/LoginForm'; // El LoginForm con el HOC de navegación

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginForm />
  </StrictMode>,
   <StrictMode>
   <Stock />
 </StrictMode>,
)

export default Main;
