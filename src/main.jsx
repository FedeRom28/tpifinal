import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Stock from './componentes/Stock'; 
import LoginForm from './componentes/LoginForm'; 

createRoot(document.getElementById('root')).render(

   <StrictMode>
   <Stock />
 </StrictMode>,
)

