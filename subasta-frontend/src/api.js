// src/api.js
import axios from 'axios';

// Creamos una instancia de Axios con la URL base de tu API
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // La URL de tu API de Laravel
  withCredentials: true, // Importante si usaras cookies/sesiones
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default apiClient;
