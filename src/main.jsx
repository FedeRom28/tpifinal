<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles.css';
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
>>>>>>> develop_rodriguez

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
<<<<<<< HEAD
  </BrowserRouter>
);
=======
  </StrictMode>,
)
>>>>>>> develop_rodriguez
